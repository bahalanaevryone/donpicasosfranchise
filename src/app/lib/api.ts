/**
 * API layer — now backed by Supabase instead of PHP/MySQL.
 *
 * All functions that previously called /don-picasos-api/*.php now use
 * the Supabase JS client directly.
 */

import { supabase } from './supabase';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function authRegister(payload: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  // 1. Create Supabase auth user
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName,
        phone: payload.phone,
      },
    },
  });

  if (signUpError) throw new Error(signUpError.message);
  if (!authData.user) throw new Error('Registration failed — no user returned.');

  // 2. Upsert into applicant_users so dashboard queries still work
  const { error: profileError } = await supabase.from('applicant_users').upsert({
    id: authData.user.id,
    full_name: payload.fullName,
    email: payload.email.toLowerCase().trim(),
    phone: payload.phone,
    status: 'active',
  });

  if (profileError) {
    // Non-fatal — auth succeeded, profile insert failed. Log and continue.
    console.warn('applicant_users upsert failed:', profileError.message);
  }

  return {
    ok: true,
    applicant: {
      id: authData.user.id,
      fullName: payload.fullName,
      email: payload.email,
    },
  };
}

export async function authLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);
  if (!data.session) throw new Error('Login failed — no session returned.');

  const fullName =
    data.user?.user_metadata?.full_name ??
    data.user?.email ??
    'Member';

  return {
    ok: true,
    token: data.session.access_token,
    applicant: {
      id: data.user.id,
      fullName,
      email: data.user.email ?? email,
    },
    expiresAt: new Date(data.session.expires_at! * 1000).toISOString(),
  };
}

export async function authLogout() {
  await supabase.auth.signOut();
}

export async function authGetSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export async function submitContactForm(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  investmentBudget: string;
  preferredLocation: string;
  message: string;
}) {
  const leadNumber =
    'L-' +
    new Date().getFullYear() +
    '-' +
    String(Math.floor(Math.random() * 99999)).padStart(5, '0');

  // Insert into franchise_leads using the flat schema the dashboard reads
  const { data: lead, error: leadError } = await supabase
    .from('franchise_leads')
    .insert({
      lead_number: leadNumber,
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      inquiry_type: payload.inquiryType,
      package_name: null,
      budget: payload.investmentBudget || null,
      preferred_location: payload.preferredLocation || null,
      message: payload.message,
      status: 'new',
      priority: 'normal',
    })
    .select('id')
    .single();

  if (leadError) throw new Error(leadError.message);

  // Also save to contact_messages for the full message record
  const { error: msgError } = await supabase.from('contact_messages').insert({
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    inquiry_type: payload.inquiryType,
    investment_budget: payload.investmentBudget || null,
    preferred_location: payload.preferredLocation || null,
    message: payload.message,
    status: 'unread',
  });

  // Non-fatal if contact_messages insert fails
  if (msgError) console.warn('contact_messages insert failed:', msgError.message);

  return { ok: true, leadNumber };
}

// ─── Branches ─────────────────────────────────────────────────────────────────

export async function getBranches() {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .order('status', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw new Error(error.message);

  const branches = (data ?? []).map((b) => ({
    branch_code: b.branch_code,
    name: b.name,
    address: [b.address_line, b.city, b.province].filter(Boolean).join(', '),
    city: b.city,
    province: b.province,
    region: b.region,
    phone: b.phone,
    hours: b.business_hours,
    status: b.status,
    image: b.image_url,
    franchiseOwner: b.franchise_owner_name ?? 'TBA',
    openedDate: b.opened_on
      ? new Date(b.opened_on).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })
      : b.target_opening_on
        ? 'Opening ' +
          new Date(b.target_opening_on).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })
        : 'TBA',
  }));

  const regionMap = new Map<string, number>();
  branches.forEach((b) => {
    if (b.region) regionMap.set(b.region, (regionMap.get(b.region) ?? 0) + 1);
  });

  return {
    branches,
    stats: {
      total: branches.length,
      operating: branches.filter((b) => b.status === 'operating').length,
      upcoming: branches.filter((b) => b.status === 'upcoming').length,
      cities: new Set(branches.map((b) => b.city)).size,
    },
    regionStats: Array.from(regionMap.entries()).map(([region, total]) => ({
      region,
      total: String(total),
    })),
  };
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboard() {
  const [leadsRes, branchesRes, contactsRes, metricsRes] = await Promise.all([
    supabase
      .from('franchise_leads')
      .select('id, lead_number, first_name, last_name, email, phone, inquiry_type, preferred_location, status, submitted_at, budget_min, budget_max, franchise_packages(name)')
      .order('submitted_at', { ascending: false })
      .limit(12),
    supabase.from('branches').select('status'),
    supabase.from('contact_messages').select('id'),
    supabase.from('monthly_metrics').select('*').order('metric_month', { ascending: true }),
  ]);

  const leads = leadsRes.data ?? [];
  const branches = branchesRes.data ?? [];
  const metrics = metricsRes.data ?? [];

  const statusCounts = leads.reduce(
    (acc: Record<string, number>, l) => {
      acc[l.status] = (acc[l.status] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const totalRevenue = metrics.reduce((sum, m) => sum + Number(m.total_revenue ?? 0), 0);
  const totalConversions = metrics.reduce((sum, m) => sum + Number(m.conversions ?? 0), 0);
  const totalLeadsInMetrics = metrics.reduce((sum, m) => sum + Number(m.total_leads ?? 0), 0);
  const conversionRate = totalLeadsInMetrics > 0
    ? ((totalConversions / totalLeadsInMetrics) * 100).toFixed(2)
    : '0';

  const recentLeads = leads.map((l) => ({
    id: l.lead_number,
    name: `${l.first_name} ${l.last_name}`.trim(),
    email: l.email,
    phone: l.phone,
    package_name: (l.franchise_packages as any)?.name?.replace(' Package', '') ?? null,
    budget: l.budget_max ?? l.budget_min
      ? `PHP ${Number(l.budget_max ?? l.budget_min).toLocaleString()}`
      : 'N/A',
    location: l.preferred_location ?? null,
    submitted_date: new Date(l.submitted_at).toLocaleDateString('en-PH'),
    status: l.status,
  }));

  const monthlyData = metrics.map((m) => ({
    month: new Date(m.metric_month).getFullYear().toString(),
    leads: m.total_leads,
    conversions: m.conversions,
  }));

  return {
    summary: {
      total_leads: String(leads.length),
      active_franchises: String(branches.filter((b) => b.status === 'operating').length),
      total_revenue: String(totalRevenue),
      conversion_rate: conversionRate,
      new_leads: String(statusCounts['new'] ?? 0),
      in_progress_leads: String((statusCounts['contacted'] ?? 0) + (statusCounts['meeting'] ?? 0)),
      qualified_leads: String(statusCounts['qualified'] ?? 0),
      converted_leads: String(statusCounts['converted'] ?? 0),
    },
    recentLeads,
    leadsBySource: [],
    monthlyData,
    lastUpdated: new Date().toLocaleString('en-PH', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }),
  };
}

// ─── Legacy PHP shims (kept so existing page components don't break) ──────────
// These match the old apiGet / apiPost / apiPostAuth signatures.
// Pages that haven't been migrated yet will still import these.

export async function apiGet<T>(path: string): Promise<T> {
  if (path === 'branches.php') return getBranches() as unknown as T;
  if (path === 'dashboard.php') return getDashboard() as unknown as T;
  throw new Error(`apiGet: unmapped path "${path}"`);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const b = body as Record<string, any>;

  if (path === 'auth_register.php') {
    return authRegister(b as any) as unknown as T;
  }
  if (path === 'auth_login.php') {
    return authLogin(b.email, b.password) as unknown as T;
  }
  if (path === 'contact.php') {
    return submitContactForm(b as any) as unknown as T;
  }

  throw new Error(`apiPost: unmapped path "${path}"`);
}

// opportunity_apply.php is now handled directly in OpportunityApplicationPage
// via submitContactForm since auth is no longer required for inquiries.
export async function apiPostAuth<T>(
  _path: string,
  body: unknown,
  _token: string,
): Promise<T> {
  const b = body as Record<string, any>;
  return submitContactForm({
    firstName: b.preferredLocation ?? '',
    lastName: '',
    email: localStorage.getItem('dp_applicant_email') ?? '',
    phone: '',
    inquiryType: b.inquiryType ?? 'franchise',
    investmentBudget: b.investmentBudget ?? '',
    preferredLocation: b.preferredLocation ?? '',
    message: b.message ?? '',
  }) as unknown as T;
}
