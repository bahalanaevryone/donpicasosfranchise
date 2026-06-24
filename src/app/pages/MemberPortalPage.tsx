import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Bell, Image, Lock, LogOut, MessageSquare, PlayCircle, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';

type MemberAnnouncement = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

type MemberMedia = {
  id: string;
  title: string;
  type: 'photo' | 'video';
  src: string;
  createdAt: string;
};

const PACKAGE_LABELS: Record<string, string> = {
  STARTER: 'Starter Package',
  PRO: 'Pro Package',
  ELITE: 'Elite Package',
};

const defaultAnnouncements: MemberAnnouncement[] = [
  {
    id: 'welcome',
    title: 'Welcome to Don Picaso MIMAROPA',
    message:
      'This private area is for approved and registered opportunity holders. Updates, training materials, photos, videos, and announcements from Titser Art will appear here.',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

function readStoredList<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function MemberPortalPage() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<MemberAnnouncement[]>([]);
  const [media, setMedia] = useState<MemberMedia[]>([]);

  const token = useMemo(() => localStorage.getItem('dp_app_token') ?? '', []);
  const fullName = localStorage.getItem('dp_applicant_fullName') ?? 'Member';
  const packageCode = localStorage.getItem('dp_availed_package') ?? '';
  const packageName = localStorage.getItem('dp_availed_package_name') ?? PACKAGE_LABELS[packageCode] ?? 'Selected Package';
  const packagePrice = localStorage.getItem('dp_availed_package_price') ?? '';
  const applicationDate = localStorage.getItem('dp_application_date') ?? '';

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    setAnnouncements(readStoredList('dp_member_announcements', defaultAnnouncements));
    setMedia(readStoredList('dp_member_media', []));
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('dp_app_token');
    localStorage.removeItem('dp_applicant_email');
    localStorage.removeItem('dp_applicant_fullName');
    navigate('/login', { replace: true });
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <main className="pt-28 pb-16">
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-4 py-2 text-sm font-semibold text-[#FFD700]">
                  <Lock className="h-4 w-4" />
                  Private Member Area
                </div>
                <h1 className="text-4xl font-bold text-white md:text-6xl">
                  Welcome,{' '}
                  <span className="brand-gradient-text">
                    {fullName}
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-300">
                  View your availed opportunity, owner announcements, and private training media.
                </p>
              </div>
              <Button
                type="button"
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </motion.div>

            <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <GlassCard className="lg:col-span-2 border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/10 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700] to-[#B30000]">
                    <Tag className="h-7 w-7 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FFD700]">
                      Your Selected Package
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-white">{packageName}</h2>
                    {packagePrice && (
                      <p className="mt-1 text-2xl font-bold brand-gradient-text">
                        {packagePrice}
                      </p>
                    )}
                    <p className="mt-2 text-gray-400 text-sm">
                      Package code: <span className="font-semibold text-white">{packageCode || 'TBA'}</span>
                    </p>
                    {applicationDate && (
                      <p className="mt-1 text-gray-400 text-sm flex items-center gap-2">
                        <span>Inquired on:</span>
                        <span className="font-semibold text-white">
                          {new Date(applicationDate).toLocaleString('en-PH', {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FFD700]">
                  Application Status
                </p>
                <div className="mt-2 text-2xl font-bold text-white">Submitted</div>
                <p className="mt-3 text-sm text-gray-300">
                  Our franchise team will review your inquiry and reach out within 24 hours.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400">Need help?</p>
                  <a href="tel:+639562931985" className="text-[#FFD700] text-sm font-semibold hover:text-white">
                    0956-293-1985
                  </a>
                </div>
              </GlassCard>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <section className="lg:col-span-2">
                <div className="mb-5 flex items-center gap-3">
                  <Bell className="h-6 w-6 text-[#FFD700]" />
                  <h2 className="text-2xl font-bold text-white">Announcements</h2>
                </div>
                <div className="space-y-5">
                  {announcements.map((announcement) => (
                    <GlassCard key={announcement.id} hover={false}>
                      <div className="mb-3 flex items-start gap-3">
                        <MessageSquare className="mt-1 h-5 w-5 flex-shrink-0 text-[#FFD700]" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                          <p className="text-xs text-gray-400">
                            {new Date(announcement.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="leading-7 text-gray-300">{announcement.message}</p>
                    </GlassCard>
                  ))}
                </div>
              </section>

              <section className="lg:col-span-3">
                <div className="mb-5 flex items-center gap-3">
                  <PlayCircle className="h-6 w-6 text-[#FFD700]" />
                  <h2 className="text-2xl font-bold text-white">Photos and Videos</h2>
                </div>

                {media.length === 0 ? (
                  <GlassCard hover={false} className="flex min-h-72 items-center justify-center text-center">
                    <div>
                      <Image className="mx-auto mb-4 h-12 w-12 text-[#FFD700]" />
                      <h3 className="text-2xl font-bold text-white">No uploads yet</h3>
                      <p className="mt-2 max-w-md text-gray-300">
                        Photos, videos, and training materials uploaded by your boss will appear here.
                      </p>
                    </div>
                  </GlassCard>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {media.map((item) => (
                      <GlassCard key={item.id} hover={false} className="overflow-hidden p-0">
                        {item.type === 'photo' ? (
                          <img src={item.src} alt={item.title} className="aspect-video w-full object-cover" />
                        ) : (
                          <video src={item.src} controls className="aspect-video w-full bg-black object-contain" />
                        )}
                        <div className="p-5">
                          <div className="text-lg font-bold text-white">{item.title}</div>
                          <div className="mt-1 text-sm capitalize text-[#FFD700]">{item.type}</div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="mt-10 text-center">
              <Link to="/contact" className="text-sm font-semibold text-[#FFD700] hover:text-white">
                Need help? Send a message to Don Picaso
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
