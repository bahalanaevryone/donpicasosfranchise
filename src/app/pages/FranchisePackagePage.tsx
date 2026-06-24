import { motion } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, HeadphonesIcon, Store, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { franchisePackages, getPackageBySlug } from '../data/franchisePackages';

export default function FranchisePackagePage() {
  const { packageSlug } = useParams();
  const pkg = getPackageBySlug(packageSlug);

  if (!pkg) {
    return <Navigate to="/franchise" replace />;
  }

  const contactUrl = `/contact?package=${encodeURIComponent(pkg.code)}&budget=${encodeURIComponent(pkg.price)}`;
  const otherPackages = franchisePackages.filter((item) => item.code !== pkg.code);

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#B30000]/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/franchise" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to all packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-semibold mb-5">
                {pkg.shortName.toUpperCase()} FRANCHISE PACKAGE
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-5">
                {pkg.name}
              </h1>
              <div className="text-5xl font-bold brand-gradient-text mb-5">
                {pkg.price}
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mb-8">
                {pkg.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={contactUrl}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-bold text-lg px-8 py-6 hover:opacity-90"
                  >
                    Apply for This Package
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <a 
                  href="tel:+639562931985" 
                  className="inline-flex items-center justify-center h-12 px-8 text-lg font-bold text-white transition-colors border rounded-md border-white/20 hover:bg-white/10 w-full sm:w-auto"
                >
                  Call Us
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="bg-gradient-to-br from-[#FFD700]/10 to-[#B30000]/10 border-[#FFD700]/30" hover={false}>
                <h2 className="text-2xl font-bold text-white mb-5">Package Highlights</h2>
                <div className="space-y-4">
                  {pkg.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{highlight}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: Target, title: 'Best For', detail: pkg.bestFor },
              { icon: Store, title: 'Setup', detail: pkg.setup },
              { icon: Clock, title: 'Training', detail: pkg.training },
              { icon: HeadphonesIcon, title: 'Support', detail: pkg.support },
            ].map((item) => (
              <GlassCard key={item.title} className="h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard>
            <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pkg.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-16 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Compare Other Packages
              </h2>
              <p className="text-gray-300">
                Still choosing? You can review the other franchise paths before applying.
              </p>
            </div>
            <Link to="/franchise">
              <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                View All Packages
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPackages.map((item) => (
              <Link key={item.code} to={`/franchise/${item.slug}`}>
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <div className="text-[#FFD700] font-bold whitespace-nowrap">{item.price}</div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
