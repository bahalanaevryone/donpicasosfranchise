import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, CheckCircle, Loader } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Badge } from '../components/ui/badge';
import { supabase } from '../../supabaseClient';

interface Branch {
  branch_code: string;
  name: string;
  address: string;
  city: string;
  province: string | null;
  region: string | null;
  phone: string | null;
  hours: string | null;
  status: 'operating' | 'upcoming' | 'closed' | 'paused';
  image: string | null;
  franchiseOwner: string;
  openedDate: string;
}

interface BranchesPayload {
  branches: Branch[];
  stats: {
    total: number;
    operating: number;
    upcoming: number;
    cities: number;
  };
  regionStats: Array<{ region: string; total: string }>;
}

const fallbackBranches: BranchesPayload = {
  branches: [],
  stats: { total: 0, operating: 0, upcoming: 0, cities: 0 },
  regionStats: [],
};

function formatOpenedDate(openedOn?: string | null, targetOpeningOn?: string | null) {
  const sourceDate = openedOn ?? targetOpeningOn;
  if (!sourceDate) return 'TBA';

  const formatted = new Date(sourceDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return openedOn ? formatted : `Opening ${formatted}`;
}

function mapBranch(row: any): Branch {
  const address = row.address
    ?? [row.address_line, row.city, row.province].filter(Boolean).join(', ')
    ?? row.name;

  return {
    branch_code: row.branch_code ?? row.id?.toString() ?? row.name,
    name: row.name ?? 'Unnamed Branch',
    address,
    city: row.city ?? 'TBA',
    province: row.province ?? null,
    region: row.region ?? null,
    phone: row.phone ?? null,
    hours: row.hours ?? row.business_hours ?? null,
    status: row.status ?? 'upcoming',
    image: row.image ?? row.image_url ?? null,
    franchiseOwner: row.franchiseOwner ?? row.franchise_owner_name ?? 'TBA',
    openedDate: row.openedDate ?? formatOpenedDate(row.opened_on, row.target_opening_on),
  };
}

function buildBranchesPayload(branches: Branch[]): BranchesPayload {
  const regionCounts = branches.reduce<Record<string, number>>((counts, branch) => {
    const region = branch.region ?? 'Unlisted';
    counts[region] = (counts[region] ?? 0) + 1;
    return counts;
  }, {});

  return {
    branches,
    stats: {
      total: branches.length,
      operating: branches.filter((branch) => branch.status === 'operating').length,
      upcoming: branches.filter((branch) => branch.status === 'upcoming').length,
      cities: new Set(branches.map((branch) => branch.city).filter(Boolean)).size,
    },
    regionStats: Object.entries(regionCounts)
      .map(([region, total]) => ({ region, total: total.toString() }))
      .sort((a, b) => Number(b.total) - Number(a.total) || a.region.localeCompare(b.region)),
  };
}

export default function BranchesPage() {
  const [payload, setPayload] = useState<BranchesPayload>(fallbackBranches);

  useEffect(() => {
    async function loadBranches() {
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Failed to load branches from Supabase:', error);
        setPayload(fallbackBranches);
        return;
      }

      setPayload(buildBranchesPayload((data ?? []).map(mapBranch)));
    }

    loadBranches();
  }, []);

  const operatingBranches = payload.branches.filter((branch) => branch.status === 'operating');
  const upcomingBranches = payload.branches.filter((branch) => branch.status === 'upcoming');

  const stats = [
    { label: 'Listed Locations', value: payload.stats.total.toString() },
    { label: 'Confirmed', value: payload.stats.operating.toString() },
    { label: 'To Verify', value: payload.stats.upcoming.toString() },
    { label: 'Areas Listed', value: `${payload.stats.cities}+` },
  ];

  const renderBranchCard = (branch: Branch, index: number, isUpcoming = false) => (
    <motion.div
      key={branch.branch_code}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard className="overflow-hidden p-0 h-full flex flex-col">
        <div className="relative">
          <img
            src={branch.image ?? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'}
            alt={branch.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-48 object-cover ${isUpcoming ? 'opacity-60' : ''}`}
          />
          <div className="absolute top-4 right-4">
            {isUpcoming ? (
              <Badge className="bg-[#B30000] text-white border-0 flex items-center space-x-1">
                <Loader className="w-3 h-3 animate-spin" />
                <span>To Verify</span>
              </Badge>
            ) : (
              <Badge className="bg-green-500 text-white border-0 flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Confirmed</span>
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-3">{branch.name}</h3>
          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{branch.address}</span>
            </div>
            {!isUpcoming && branch.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                <span className="text-gray-300 text-sm">{branch.phone}</span>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
              <span className="text-gray-300 text-sm">{branch.hours ?? 'Hours TBA'}</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            {isUpcoming ? (
              <div className="text-[#B30000] font-semibold text-lg">{branch.openedDate}</div>
            ) : (
              <>
                <div className="text-gray-400 text-xs mb-1">Contact / Owner</div>
                <div className="text-white font-semibold">{branch.franchiseOwner}</div>
                <div className="text-gray-400 text-xs mt-1">{branch.openedDate}</div>
              </>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#B30000]/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our{' '}
              <span className="brand-gradient-text">
                Locations
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Reference locations from available Don Picaso business materials.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <GlassCard className="text-center">
                  <div className="text-4xl md:text-5xl font-bold brand-gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Confirmed{' '}
              <span className="brand-gradient-text">
                Location
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The PPT identifies the main office in Mamburao, Occidental Mindoro.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {operatingBranches.map((branch, index) => renderBranchCard(branch, index))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              To{' '}
              <span className="brand-gradient-text">
                Verify
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              These location references need confirmation before public launch.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingBranches.map((branch, index) => renderBranchCard(branch, index, true))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Business{' '}
              <span className="brand-gradient-text">
                Reach
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Don Picaso reaches customers through direct sales, online platforms, social media, events, and referrals.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GlassCard className="bg-gradient-to-br from-[#FFD700]/10 to-[#B30000]/10 border-[#FFD700]/30">
              <div className="flex flex-col items-center justify-center py-16">
                <MapPin className="w-20 h-20 text-[#FFD700] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Channels and Service Areas</h3>
                <p className="text-gray-300 text-center max-w-2xl mb-8">
                  The business model is designed to support restaurants, food operators, caterers,
                  online food businesses, home cooks, and aspiring entrepreneurs.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {payload.regionStats.slice(0, 4).map((region) => (
                    <div key={region.region}>
                      <div className="text-2xl font-bold text-[#FFD700] mb-1">{region.region}</div>
                      <div className="text-gray-400 text-sm">{region.total} Listed</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
