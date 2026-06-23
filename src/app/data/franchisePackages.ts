export type FranchisePackageCode = 'STARTER' | 'PRO' | 'ELITE';

export type FranchisePackage = {
  code: FranchisePackageCode;
  slug: string;
  name: string;
  shortName: string;
  price: string;
  description: string;
  bestFor: string;
  setup: string;
  training: string;
  support: string;
  recommended?: boolean;
  highlights: string[];
  features: string[];
};

export const franchisePackages: FranchisePackage[] = [
  {
    code: 'STARTER',
    slug: 'starter',
    name: 'Starter Package',
    shortName: 'Starter',
    price: '₱199,000',
    description: 'Ideal for aspiring entrepreneurs entering the food business.',
    bestFor: 'First-time franchise owners, OFWs, teachers, and small business starters.',
    setup: 'Kiosk design and professional setup',
    training: '5-day training program',
    support: '1 month marketing support and 3 months business mentorship',
    highlights: ['Lowest entry package', 'Kiosk-ready setup', 'Guided first launch'],
    features: [
      'Kiosk design & professional setup',
      'Complete equipment package',
      'Initial product inventory',
      'Branding & signage',
      'Training program (5 days)',
      'Marketing support (1 month)',
      'Business mentorship (3 months)',
      'Franchise fee (brand + system)',
    ],
  },
  {
    code: 'PRO',
    slug: 'growth',
    name: 'Growth Package',
    shortName: 'Growth',
    price: '₱399,000',
    recommended: true,
    description: 'Designed for entrepreneurs seeking larger market opportunities and business growth.',
    bestFor: 'Operators who want a full store presence and stronger local market coverage.',
    setup: 'Full store setup and layout design',
    training: '7-day comprehensive training program',
    support: 'Grand opening support, 6 months mentorship, and a dedicated coordinator',
    highlights: ['Full store format', 'Municipality territory rights', 'Grand opening support'],
    features: [
      'Full store setup & layout design',
      'Complete equipment package',
      'Initial product inventory',
      'Full branding & signage',
      'Comprehensive training program (7 days)',
      'Grand opening marketing support',
      '6 months business mentorship',
      'Dedicated franchise coordinator',
      'Exclusive territory rights (per municipality)',
      'Franchise fee (brand + system)',
    ],
  },
  {
    code: 'ELITE',
    slug: 'enterprise',
    name: 'Enterprise Package',
    shortName: 'Enterprise',
    price: '₱1,000,000',
    description: 'Ideal for prime locations and multi-unit expansion.',
    bestFor: 'Investors planning prime-location stores, multi-unit operations, or regional growth.',
    setup: 'Prime location and multi-unit expansion support',
    training: 'Full Titser Art entrepreneur program',
    support: 'Dedicated franchise manager and regional expansion guidance',
    highlights: ['Multi-unit expansion rights', 'Prime location support', 'Regional growth path'],
    features: [
      'Everything in Growth',
      'Multi-unit expansion rights',
      'Prime location support',
      'Dedicated franchise manager',
      'Full Titser Art entrepreneur program',
      'Regional expansion opportunities',
    ],
  },
];

export const getPackageByCode = (code: string | null | undefined) =>
  franchisePackages.find((pkg) => pkg.code === code?.toUpperCase());

export const getPackageBySlug = (slug: string | null | undefined) =>
  franchisePackages.find((pkg) => pkg.slug === slug?.toLowerCase());
