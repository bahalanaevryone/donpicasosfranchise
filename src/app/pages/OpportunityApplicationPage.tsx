import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import GlassCard from '../components/GlassCard';
import PictureImage from '../components/PictureImage';
import { franchisePackages, getPackageByCode } from '../data/franchisePackages';

export default function OpportunityApplicationPage() {
  const [searchParams] = useSearchParams();
  const packageCode = (searchParams.get('package') ?? '').toUpperCase();
  const pkg = getPackageByCode(packageCode);

  const contactUrl = pkg
    ? `/contact?package=${encodeURIComponent(pkg.code)}&budget=${encodeURIComponent(pkg.price)}`
    : '/contact';

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <PictureImage
            webpSrc="/assets/don-picasos-logo.webp"
            fallbackSrc="/assets/don-picasos-logo.jpg"
            alt="Don Picaso's"
            className="mx-auto mb-6 h-16 w-auto max-w-xs rounded-lg object-contain shadow-[0_0_24px_rgba(255,215,0,0.25)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {pkg ? (
              <>
                You Selected the{' '}
                <span className="brand-gradient-text">
                  {pkg.name}
                </span>
              </>
            ) : (
              <>
                Choose a{' '}
                <span className="brand-gradient-text">
                  Package
                </span>
              </>
            )}
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            {pkg
              ? 'Review what is included and send us your inquiry to get started.'
              : 'Select one of the franchise packages below to continue.'}
          </p>
        </motion.div>

        {pkg ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="mb-8 bg-gradient-to-br from-[#FFD700]/10 to-[#B30000]/10 border-[#FFD700]/30">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <span className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-xs font-semibold">
                    SELECTED PACKAGE
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-3 mb-1">{pkg.name}</h2>
                  <div className="text-4xl font-bold brand-gradient-text mb-3">
                    {pkg.price}
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-64 space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-[#FFD700] text-xs font-semibold uppercase tracking-wide mb-3">
                      Questions? Reach us directly
                    </p>
                    <a
                      href="tel:+639562931985"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors mb-3"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-sm font-medium">0956-293-1985</span>
                    </a>
                    <a
                      href="mailto:donpicasofoodservices@gmail.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-sm font-medium">Send Email</span>
                    </a>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-sm text-gray-400">
                    <p>Estimated store investment:</p>
                    <p className="text-white font-semibold mt-1">₱300,000 - ₱500,000+</p>
                    <p className="text-xs mt-1">depending on location and store size</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={contactUrl}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-bold text-lg px-10 py-6 hover:opacity-90"
                >
                  Inquire About This Package
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to={`/franchise/${pkg.slug}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-lg px-10 py-6"
                >
                  View Package Page
                </Button>
              </Link>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              You will be taken to the contact form with your package pre-filled.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {franchisePackages.map((item) => (
              <Link key={item.code} to={`/franchise/${item.slug}`}>
                <GlassCard className="h-full text-left">
                  <h2 className="text-white font-bold mb-1">{item.name}</h2>
                  <p className="text-[#FFD700] font-semibold mb-2">{item.price}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
