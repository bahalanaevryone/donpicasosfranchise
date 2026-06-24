import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import {
  Users,
  Building2,
  DollarSign,
  BarChart3,
  PieChart,
  Eye,
  Lock,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  X,
  Mail,
  Phone,
  MapPin,
  Package,
  Calendar,
  Hash,
  FileText,
  Banknote,
  Trash2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as REPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import GlassCard from '../components/GlassCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

import { supabase } from '../../supabaseClient';

interface DashboardSummary {
  total_leads: string;
  total_messages: string;
  active_franchises: string;
  total_revenue: string;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  package_name: string | null;
  budget: string;
  location: string | null;
  message: string | null;
  submitted_date: string;
  status: string;
}

interface StatusSummary {
  name: string;
  value: number;
}

interface MonthlyPerformance {
  month: string;
  franchises: number;
  messages: number;
}

interface DashboardPayload {
  summary: DashboardSummary;
  recentLeads: RecentLead[];
  leadsByStatus: StatusSummary[];
  monthlyData: MonthlyPerformance[];
  lastUpdated: string;
}

const ADMIN_EMAIL = 'don_picaso@gmail.com';
const COLORS = ['#FFD700', '#B30000', '#3b82f6', '#10b981', '#6366f1'];

const fallbackDashboard: DashboardPayload = {
  summary: {
    total_leads: '0',
    total_messages: '0',
    active_franchises: '2',
    total_revenue: '1800000.00',
  },
  recentLeads: [],
  leadsByStatus: [
    { name: 'New', value: 0 },
    { name: 'Contacted', value: 0 }
  ],
  monthlyData: [
    { month: 'Jan', franchises: 2, messages: 5 },
    { month: 'Feb', franchises: 4, messages: 8 },
    { month: 'Mar', franchises: 7, messages: 12 },
    { month: 'Apr', franchises: 5, messages: 9 },
    { month: 'May', franchises: 9, messages: 15 },
    { month: 'June', franchises: 0, messages: 0 }
  ],
  lastUpdated: 'No live stream data',
};

const formatNumber = (value: string | number) => Number(value).toLocaleString('en-US');

const formatRevenue = (value: string | number) => {
  const amount = Number(value);
  if (amount >= 1000000) {
    return `PHP ${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  }
  return `PHP ${formatNumber(amount)}`;
};

// ─── Detail row helper ────────────────────────────────────────────────────────

function DetailRow({
  icon,
  label,
  value,
  mono = false,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.02] transition-colors">
      <span className="text-amber-400 mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{label}</p>
        <p className={`text-sm mt-0.5 break-all ${mono ? 'font-mono' : 'font-medium'} ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardPayload>(fallbackDashboard);
  const [isFromDatabase, setIsFromDatabase] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'franchise' | 'messages'>('all');
  const [selectedLead, setSelectedLead] = useState<RecentLead | null>(null);
  const [editFields, setEditFields] = useState<{
    status: string; package_name: string; budget: string; location: string;
  } | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [replyErrorMsg, setReplyErrorMsg] = useState('');
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'confirm' | 'deleting' | 'error'>('idle');
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');

  const handleSendEmail = async () => {
    if (!selectedLead || !replySubject.trim() || !replyMessage.trim()) return;
    setReplyStatus('sending');
    setReplyErrorMsg('');
    try {
      const { data, error } = await supabase.functions.invoke('send-franchise-email', {
        body: {
          mode: 'manual',
          to_email: selectedLead.email,
          to_name: selectedLead.name,
          subject: replySubject.trim(),
          html_body: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #7A0000; border-radius: 8px;">
              <h2 style="color: #7A0000;">Don Picaso's House of Franchise</h2>
              <p>Dear ${selectedLead.name},</p>
              ${replyMessage.trim().split('\n').map(line => `<p>${line}</p>`).join('')}
              <hr />
              <p style="font-size: 12px; color: #666;">Don Picaso's House of Franchise<br/>Mamburao, Occidental Mindoro</p>
            </div>
          `,
        },
      })
      if (error) { console.error('Invoke error:', error); setReplyErrorMsg(error.message || JSON.stringify(error)); throw error }
      if (!data?.success) {
        const brevoErr = data?.data?.message || data?.error || JSON.stringify(data)
        console.error('Brevo error:', brevoErr)
        setReplyErrorMsg(brevoErr)
        setReplyStatus('error')
        setTimeout(() => setReplyStatus('idle'), 5000)
        return
      }
      setReplyStatus('sent')
      setTimeout(() => { setReplyStatus('idle'); setReplySubject(''); setReplyMessage('') }, 3000)
    } catch (err) {
      console.error('Send email failed:', err)
      setReplyStatus('error')
      setTimeout(() => setReplyStatus('idle'), 5000)
    }
  }

  const handleDelete = async () => {
    if (!selectedLead || deleteStatus !== 'confirm') return;
    setDeleteStatus('deleting');
    setDeleteErrorMsg('');
    try {
      const { data, error } = await supabase.functions.invoke('delete-lead', {
        body: { lead_id: selectedLead.id },
      })

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Delete failed');

      setDashboard((prev) => ({
        ...prev,
        recentLeads: prev.recentLeads.filter((l) => l.id !== selectedLead.id),
      }));
      setSelectedLead(null);
    } catch (err) {
      setDeleteErrorMsg(err.message);
      setDeleteStatus('error');
      setTimeout(() => setDeleteStatus('idle'), 4000);
    }
  };

  const handleExportExcel = () => {
    const rows = dashboard.recentLeads.map((lead) => ({
      ID: lead.id,
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Package: lead.package_name || '—',
      Budget: lead.budget,
      Location: lead.location || '—',
      Message: lead.message || '',
      Date: lead.submitted_date,
      Status: lead.status,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
      { wch: 6 }, { wch: 20 }, { wch: 30 },
      { wch: 16 }, { wch: 22 }, { wch: 16 },
      { wch: 16 }, { wch: 40 }, { wch: 14 }, { wch: 12 },
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, `DonPicaso_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Sync edit fields whenever a lead is opened
  const openLead = (lead: RecentLead) => {
    setSelectedLead(lead);
    setEditFields({
      status: lead.status,
      package_name: lead.package_name ?? '',
      budget: lead.budget === '—' ? '' : lead.budget,
      location: lead.location === '—' ? '' : (lead.location ?? ''),
    });
    setSaveStatus('idle');
    setReplySubject(
      lead.package_name
        ? `Re: Your Don Picaso Franchise Inquiry - ${lead.package_name}`
        : 'Re: Your Don Picaso Inquiry'
    );
    setReplyMessage('');
    setReplyStatus('idle');
    setDeleteStatus('idle');
    setDeleteErrorMsg('');
  };

  const handleSaveEdit = async () => {
    if (!selectedLead || !editFields) return;
    setSaveStatus('saving');
    try {
      const { data, error } = await supabase
        .from('franchise_leads')
        .update({
          status: editFields.status,
          package_name: editFields.package_name || null,
          budget: editFields.budget || null,
          location: editFields.location || null,
        })
        .eq('id', selectedLead.id)
        .select();

      if (error) throw error;
      console.log('Update response:', data);

      // Update local state so table reflects changes immediately
      const updated: RecentLead = {
        ...selectedLead,
        status: editFields.status,
        package_name: editFields.package_name || null,
        budget: editFields.budget || '—',
        location: editFields.location || '—',
      };
      setSelectedLead(updated);
      setDashboard((prev) => ({
        ...prev,
        recentLeads: prev.recentLeads.map((l) => l.id === updated.id ? updated : l),
      }));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err) {
      console.error('Update failed:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    async function checkUserSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user.email === ADMIN_EMAIL) {
        setIsAuthenticated(true);
        fetchLiveDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    }

    async function fetchLiveDashboardData() {
      try {
        const { data: leadsData, error: leadsError } = await supabase
          .from('franchise_leads')
          .select('*')
          .order('id', { ascending: false });

        if (leadsError) throw leadsError;

        const rawLeads = leadsData || [];

        // Split data organically based on schema signatures
        const franchiseApplications = rawLeads.filter(l =>
          (l.package_name && l.package_name !== 'Standard Franchise') ||
          (l.budget && l.budget !== 'TBA' && l.budget !== '0')
        );
        const contactOnlyMessages = rawLeads.filter(l => l.message);

        // Map status counts dynamically
        const statusCounts: Record<string, number> = {};
        rawLeads.forEach(lead => {
          const statusName = lead.status ? lead.status.charAt(0).toUpperCase() + lead.status.slice(1) : 'New';
          statusCounts[statusName] = (statusCounts[statusName] || 0) + 1;
        });

        const statusDistribution = Object.keys(statusCounts).map(key => ({
          name: key,
          value: statusCounts[key]
        }));

        const formattedLeads: RecentLead[] = rawLeads.map((lead: any) => ({
          id: lead.id?.toString() || '—',
          name: lead.name || 'Anonymous',
          email: lead.email || '—',
          phone: lead.phone || '—',
          package_name: lead.package_name,
          budget: lead.budget || '—',
          location: lead.location || '—',
          message: lead.message,
          submitted_date: lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : new Date().toLocaleDateString('en-US'),
          status: lead.status || 'new',
        }));

        // Dynamic validation injection into chart node arrays
        const updatedMonthlyData = fallbackDashboard.monthlyData.map(d =>
          d.month === 'June' ? { ...d, franchises: franchiseApplications.length, messages: contactOnlyMessages.length } : d
        );

        setDashboard({
          summary: {
            total_leads: franchiseApplications.length.toString(),
            total_messages: contactOnlyMessages.length.toString(),
            active_franchises: '4',
            total_revenue: (franchiseApplications.length * 450000).toString() || '1800000.00',
          },
          recentLeads: formattedLeads,
          leadsByStatus: statusDistribution.length > 0 ? statusDistribution : [{ name: 'New Logs', value: rawLeads.length }],
          monthlyData: updatedMonthlyData,
          lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        });

        setIsFromDatabase(true);
      } catch (error) {
        console.error('Failed to load dashboard metrics from Supabase:', error);
        setDashboard(fallbackDashboard);
        setIsFromDatabase(false);
      }
    }

    checkUserSession();
  }, [isAuthenticated]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setLoginError('Access Denied: Unauthorized account identity.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password,
    });

    if (error) {
      setLoginError('Invalid credentials.');
    } else if (data.session?.user.email === ADMIN_EMAIL) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const hasRealPackage = (l: RecentLead) => l.package_name && l.package_name !== 'Standard Franchise';
  const hasRealBudget = (l: RecentLead) => l.budget !== '—' && l.budget !== 'TBA' && l.budget !== '0';

  const filteredLeads = useMemo(() => {
    if (activeTab === 'franchise') return dashboard.recentLeads.filter(l => hasRealPackage(l) || hasRealBudget(l));
    if (activeTab === 'messages') return dashboard.recentLeads.filter(l => l.message);
    return dashboard.recentLeads;
  }, [activeTab, dashboard.recentLeads]);

  const stats = useMemo(
    () => [
      {
        icon: Users,
        title: 'Franchise Leads',
        value: formatNumber(dashboard.summary.total_leads),
        meta: 'Form applicants',
        color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      },
      {
        icon: MessageSquare,
        title: 'Contact Messages',
        value: formatNumber(dashboard.summary.total_messages),
        meta: 'General inquiries',
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      },
      {
        icon: Building2,
        title: 'Active Stores',
        value: formatNumber(dashboard.summary.active_franchises),
        meta: 'Operational nodes',
        color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      },
      {
        icon: DollarSign,
        title: 'Projected Value Pool',
        value: formatRevenue(dashboard.summary.total_revenue),
        meta: 'Pipeline estimation',
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      },
    ],
    [dashboard.summary],
  );

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      new: { label: 'New', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      contacted: { label: 'Contacted', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
      meeting: { label: 'Meeting', className: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      qualified: { label: 'Qualified', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      converted: { label: 'Converted', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
      lost: { label: 'Lost', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
      closed: { label: 'Closed', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    };
    const config = statusConfig[status] ?? { label: status || 'New', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
    return <Badge variant="outline" className={`${config.className} font-medium text-xs`}>{config.label}</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[120px]" />
        <main className="w-full max-w-md mx-4 z-10">
          <GlassCard className="border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-red-600 text-white shadow-md">
                <Lock className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Gateway</h1>
              <p className="text-xs text-slate-400 mt-1">Sign in to control business telemetry node</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-400 uppercase">Secure Identification</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 border-white/10 bg-white/5 text-white text-sm rounded-xl" placeholder="admin@email.com" required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-400 uppercase">Access Token</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-10 border-white/10 bg-white/5 text-white text-sm rounded-xl" placeholder="••••••••" required />
              </div>
              {loginError && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-400 font-medium">{loginError}</div>}
              <Button type="submit" className="h-10 w-full bg-gradient-to-r from-amber-500 to-red-600 font-bold text-white rounded-xl shadow-md transition-all">Verify Session</Button>
            </form>
          </GlassCard>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col font-sans">

      {/* Admin header bar with logo + title */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0d0e14]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/don-picasos-logo.jpg"
              alt="Don Picaso's"
              className="h-8 w-24 rounded object-contain object-center brightness-75"
            />
            <div className="hidden sm:block">
              <div className="text-slate-300 font-bold text-sm tracking-wide">DON PICASO'S</div>
              <div className="text-amber-400/70 text-[10px] tracking-wider">HOUSE OF FRANCHISE</div>
            </div>
          </div>
          <div className="hidden md:block h-6 w-px bg-white/10" />
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <LayoutDashboard className="w-3.5 h-3.5" /> Operations Intelligence Control
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold rounded-lg transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Export Excel
          </button>
          <div className="bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs text-slate-400 hidden sm:block">
              <span className="text-white font-mono font-medium">{isFromDatabase ? dashboard.lastUpdated : 'Fallback Cache'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/30 text-xs font-semibold rounded-lg transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* STATS PANELS */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <GlassCard key={stat.title} className="p-5 bg-slate-900/10 border-white/5 rounded-xl flex items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 tracking-wide block">{stat.title}</span>
                <span className="text-xl font-bold tracking-tight text-white block">{stat.value}</span>
                <span className="text-[10px] text-slate-500 block">{stat.meta}</span>
              </div>
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </GlassCard>
          ))}
        </section>

        {/* RECHARTS PLOT SYSTEM */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* MULTI-STREAM VELOCITY AREA GRAPH */}
          <div className="lg:col-span-2">
            <GlassCard className="p-5 bg-slate-900/10 border-white/5 rounded-xl h-[340px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Submission Telemetry</h3>
                  <p className="text-[11px] text-slate-400">Comparing real-time franchise intent vs general contact messages</p>
                </div>
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="flex-grow w-full text-[11px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboard.monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFranchise" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="month" stroke="#475569" tickLine={false} />
                    <YAxis stroke="#475569" tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f111a', borderColor: '#ffffff10', borderRadius: '10px' }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="franchises" name="Franchise Leads" stroke="#FFD700" strokeWidth={1.5} fillOpacity={1} fill="url(#colorFranchise)" />
                    <Area type="monotone" dataKey="messages" name="Contact Form" stroke="#3b82f6" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMessages)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* PIPELINE ALLOCATION PIE */}
          <div>
            <GlassCard className="p-5 bg-slate-900/10 border-white/5 rounded-xl h-[340px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Pipeline Status Split</h3>
                  <p className="text-[11px] text-slate-400">State division of active server entries</p>
                </div>
                <PieChart className="w-3.5 h-3.5 text-red-500" />
              </div>
              <div className="flex-grow w-full flex items-center justify-center text-[11px]">
                <ResponsiveContainer width="100%" height="100%">
                  <REPieChart>
                    <Pie data={dashboard.leadsByStatus} cx="50%" cy="45%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                      {dashboard.leadsByStatus.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f111a', borderColor: '#ffffff10', borderRadius: '8px' }} />
                    <Legend verticalAlign="bottom" height={32} iconType="circle" />
                  </REPieChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* DATA LOG FILTER REGISTRY */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Central Response Log Partition</h2>
              <p className="text-xs text-slate-400">Live operational data view filtered by registration category</p>
            </div>

            {/* SEGMENT CONTROL BUTTONS */}
            <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-xl self-start">
              <button onClick={() => setActiveTab('all')} className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activeTab === 'all' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}>All Records</button>
              <button onClick={() => setActiveTab('franchise')} className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activeTab === 'franchise' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}>Franchise Intent</button>
              <button onClick={() => setActiveTab('messages')} className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activeTab === 'messages' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}>Messages</button>
            </div>
          </div>

          <GlassCard className="overflow-hidden border-white/5 bg-slate-900/[0.05] rounded-xl p-0 shadow-lg">
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader className="bg-white/[0.01] border-b border-white/5">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="text-slate-400 text-xs font-bold py-3 pl-5">Node ID</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold">Profile Identity</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold">Context / Intent Info</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold">Financial Node</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold">Target Zone</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold">Timestamp</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold">State</TableHead>
                    <TableHead className="text-slate-400 text-xs font-bold pr-5 text-center">Inspect</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10 text-slate-500 text-xs font-medium">
                        No telemetry nodes found inside the selected view criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                        <TableCell className="text-slate-500 font-mono text-xs pl-5 py-3">#{lead.id}</TableCell>
                        <TableCell>
                          <div className="font-bold text-white text-xs">{lead.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{lead.email}</div>
                        </TableCell>
                        <TableCell className="max-w-[220px]">
                          {lead.package_name ? (
                            <div className="text-xs text-amber-400 font-medium">{lead.package_name}</div>
                          ) : (
                            <div className="text-xs text-slate-300 truncate font-normal italic">
                              "{lead.message || 'No comment text'}"
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{lead.phone}</div>
                        </TableCell>
                        <TableCell className="text-slate-300 font-mono text-xs">{lead.budget || '—'}</TableCell>
                        <TableCell className="text-slate-300 text-xs font-medium">{lead.location || '—'}</TableCell>
                        <TableCell className="text-slate-400 text-xs font-mono">{lead.submitted_date}</TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell className="pr-5 text-center">
                          <button
                            onClick={() => openLead(lead)}
                            className="w-6 h-6 bg-white/5 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 rounded-md flex items-center justify-center transition-all mx-auto"
                            aria-label="Open context Inspector"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* ── LEAD DETAIL PANEL ───────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setSelectedLead(null)}
            />

            {/* Slide-in panel */}
            <motion.aside
              key="panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0e14] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">
                    <Eye className="w-3 h-3" /> Context Inspector
                  </div>
                  <h2 className="text-lg font-extrabold text-white tracking-tight">
                    Lead Profile
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg flex items-center justify-center transition-all"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                {/* Avatar + name block */}
                <div className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-black font-black text-lg flex-shrink-0">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-tight">{selectedLead.name}</p>
                    <p className="text-slate-400 text-xs font-mono mt-0.5">{selectedLead.email}</p>
                    <div className="mt-1.5">
                      {getStatusBadge(selectedLead.status)}
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Contact Details</p>
                  <DetailRow icon={<Mail className="w-3.5 h-3.5" />} label="Email" value={selectedLead.email} mono />
                  <DetailRow icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={selectedLead.phone} mono />
                  <DetailRow icon={<Calendar className="w-3.5 h-3.5" />} label="Submitted" value={selectedLead.submitted_date} />
                  <DetailRow icon={<Hash className="w-3.5 h-3.5" />} label="Node ID" value={`#${selectedLead.id}`} mono />
                </div>

                <div className="h-px bg-white/[0.06]" />

                {/* Franchise / inquiry info — EDITABLE */}
                {editFields && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Details</p>
                      <span className="text-[10px] text-amber-400 font-semibold">Editable</span>
                    </div>

                    {/* Status */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wide">
                        <Hash className="w-3 h-3 text-amber-400" /> Status
                      </label>
                      <select
                        value={editFields.status}
                        onChange={(e) => setEditFields({ ...editFields, status: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      >
                        <option value="new" className="bg-slate-900">New</option>
                        <option value="contacted" className="bg-slate-900">Contacted</option>
                        <option value="meeting" className="bg-slate-900">Meeting Scheduled</option>
                        <option value="qualified" className="bg-slate-900">Qualified</option>
                        <option value="converted" className="bg-slate-900">Converted</option>
                        <option value="lost" className="bg-slate-900">Lost</option>
                        <option value="closed" className="bg-slate-900">Closed</option>
                      </select>
                    </div>

                    {/* Package */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wide">
                        <Package className="w-3 h-3 text-amber-400" /> Package
                      </label>
                      <input
                        type="text"
                        value={editFields.package_name}
                        onChange={(e) => setEditFields({ ...editFields, package_name: e.target.value })}
                        placeholder="e.g. Starter Package"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      />
                    </div>

                    {/* Budget */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wide">
                        <Banknote className="w-3 h-3 text-amber-400" /> Budget
                      </label>
                      <input
                        type="text"
                        value={editFields.budget}
                        onChange={(e) => setEditFields({ ...editFields, budget: e.target.value })}
                        placeholder="e.g. PHP 299,000"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wide">
                        <MapPin className="w-3 h-3 text-amber-400" /> Preferred Location
                      </label>
                      <input
                        type="text"
                        value={editFields.location}
                        onChange={(e) => setEditFields({ ...editFields, location: e.target.value })}
                        placeholder="e.g. Mamburao, Occidental Mindoro"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      />
                    </div>

                    {/* Save button */}
                    <button
                      onClick={handleSaveEdit}
                      disabled={saveStatus === 'saving'}
                      className={`w-full h-9 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${saveStatus === 'saved'
                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                        : saveStatus === 'error'
                          ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                          : 'bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30'
                        }`}
                    >
                      {saveStatus === 'saving' && <span className="w-3 h-3 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />}
                      {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Changes Saved' : saveStatus === 'error' ? '✗ Save Failed' : 'Save Changes'}
                    </button>
                  </div>
                )}

                {/* Message */}
                {selectedLead.message && (
                  <>
                    <div className="h-px bg-white/[0.06]" />
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        <FileText className="w-3 h-3" /> Message
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {selectedLead.message}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Panel footer — Reply via Email */}
              <div className="px-6 py-4 border-t border-white/10 space-y-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Send Reply via Email</p>
                {replyStatus === 'error' && replyErrorMsg && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300 break-all">
                    {replyErrorMsg}
                  </div>
                )}
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write your reply message here..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                />
                <button
                  onClick={handleSendEmail}
                  disabled={replyStatus === 'sending' || !replySubject.trim() || !replyMessage.trim()}
                  className={`flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-bold transition-all ${
                    replyStatus === 'sent'
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                      : replyStatus === 'error'
                        ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                        : 'bg-gradient-to-r from-amber-500 to-red-600 text-white hover:opacity-90'
                  }`}
                >
                  {replyStatus === 'sending' && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {replyStatus === 'sending' ? 'Sending...' : replyStatus === 'sent' ? 'Sent!' : replyStatus === 'error' ? 'Failed' : 'Send Reply'}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(selectedLead.email)}
                  className="flex items-center justify-center gap-2 w-full h-8 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Copy Email Address
                </button>

                {deleteStatus === 'error' && deleteErrorMsg && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300 break-all">
                    {deleteErrorMsg}
                  </div>
                )}
                <button
                  onClick={() => {
                    if (deleteStatus === 'confirm') {
                      handleDelete();
                    } else {
                      setDeleteStatus('confirm');
                      setTimeout(() => setDeleteStatus('idle'), 5000);
                    }
                  }}
                  disabled={deleteStatus === 'deleting'}
                  className={`flex items-center justify-center gap-2 w-full h-9 rounded-lg text-xs font-bold transition-all ${
                    deleteStatus === 'confirm'
                      ? 'bg-red-500/20 border border-red-500/30 text-red-400 animate-pulse'
                      : 'bg-white/5 border border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/30'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {deleteStatus === 'deleting' ? 'Deleting...' : deleteStatus === 'confirm' ? 'Confirm Delete?' : 'Delete Record'}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
