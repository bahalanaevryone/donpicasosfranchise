import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  CheckCircle,
  DollarSign,
  TrendingUp,
  HeadphonesIcon,
  BookOpen,
  Truck,
  BarChart3,
  Award,
  Users,
  ArrowRight,
  Clock,
  MapPin,
  Wrench,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { franchisePackages } from '../data/franchisePackages';

export default function FranchisePage() {
  const packages = franchisePackages;

  const inclusions = [
    {
      icon: Award,
      title: 'Business Rebranding',
      description: 'Support for clients who want a clearer plug-and-play food business setup',
    },
    {
      icon: Wrench,
      title: 'Product System',
      description: 'Condiments, marinades, seasonings, and ready-to-cook products for operators',
    },
    {
      icon: BookOpen,
      title: 'Customer Support',
      description: 'Responsive communication, feedback mechanisms, and client assistance',
    },
    {
      icon: Truck,
      title: 'Supply Chain',
      description: 'Reliable supply chain planning and timely delivery for client orders',
    },
    {
      icon: BarChart3,
      title: 'Business Model',
      description: 'B2B platform for product sales, bulk orders, and wholesale partnerships',
    },
    {
      icon: HeadphonesIcon,
      title: 'Marketing Channels',
      description: 'Lead channels include direct sales, online platforms, social media, events, and referrals',
    },
  ];

  const roiData = [
    {
      metric: 'Projected Sales',
      starter: '2026: PHP 1.8M',
      premium: '2028: PHP 2.38M',
      enterprise: '2030: PHP 3.15M',
    },
    {
      metric: 'Growth Target',
      starter: '15% yearly',
      premium: '15% yearly',
      enterprise: '15% yearly',
    },
    {
      metric: 'Revenue Streams',
      starter: 'Product sales',
      premium: 'Bulk orders',
      enterprise: 'Wholesale partnerships',
    },
    {
      metric: 'Cost Focus',
      starter: 'Ingredients/materials',
      premium: 'Production/labor',
      enterprise: 'Marketing/logistics',
    },
    {
      metric: 'Funding Need',
      starter: 'Commissary',
      premium: 'Equipment',
      enterprise: 'PHP 3M-5M target',
    },
    {
      metric: 'Primary Channels',
      starter: 'Direct sales',
      premium: 'Online/social',
      enterprise: 'Events/referrals',
    },
  ];

  const support = [
    {
      icon: BookOpen,
      title: 'Pre-Opening Training',
      items: [
        'Operations management',
        'Kitchen and food preparation',
        'Customer service excellence',
        'Staff management',
        'Financial management',
        'Health and safety compliance',
      ],
    },
    {
      icon: HeadphonesIcon,
      title: 'Ongoing Support',
      items: [
        '24/7 helpdesk access',
        'Regular site visits',
        'Performance monitoring',
        'Business consulting',
        'Quarterly training updates',
        'Franchise community network',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Marketing Support',
      items: [
        'National campaigns',
        'Social media templates',
        'Local marketing guidance',
        'Promotional materials',
        'Digital marketing tools',
        'Brand guidelines',
      ],
    },
    {
      icon: Truck,
      title: 'Supply Chain',
      items: [
        'Preferred supplier network',
        'Bulk purchasing discounts',
        'Quality assurance',
        'Inventory management',
        'Delivery coordination',
        'New product introduction',
      ],
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Inquiry',
      description: 'Submit your franchise application and schedule an initial consultation with our team.',
      duration: '1-2 days',
    },
    {
      step: '02',
      title: 'Discovery Meeting',
      description: 'Meet with our franchise team to discuss opportunities, requirements, and answer all your questions.',
      duration: '1 week',
    },
    {
      step: '03',
      title: 'Application Review',
      description: 'We review your application and conduct background checks to ensure mutual compatibility.',
      duration: '1-2 weeks',
    },
    {
      step: '04',
      title: 'Site Selection',
      description: 'Our experts help you find and evaluate the perfect location for your franchise.',
      duration: '2-4 weeks',
    },
    {
      step: '05',
      title: 'Agreement Signing',
      description: 'Review and sign the franchise agreement and make the initial investment.',
      duration: '1 week',
    },
    {
      step: '06',
      title: 'Training Program',
      description: 'Complete our comprehensive training program covering all aspects of operations.',
      duration: '3-12 months',
    },
    {
      step: '07',
      title: 'Store Setup',
      description: 'Build out your location with our support, install equipment, and prepare for opening.',
      duration: '2-3 months',
    },
    {
      step: '08',
      title: 'Grand Opening',
      description: 'Launch your franchise with our marketing and operational support.',
      duration: 'Day 1',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#B30000]/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-[#FFD700]/20 to-[#B30000]/20 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-semibold">
                Season Your Success
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Business{' '}
              <span className="brand-gradient-text">
                Opportunities
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore Don Picaso's B2B food service opportunities through business rebranding,
              supply distribution, and ready-to-cook product support.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg px-8 py-6 hover:opacity-90"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Opportunity Options
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Franchise Inclusions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What's{' '}
              <span className="brand-gradient-text">
                Included
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Food service support built around rebranding, reliable supply, and consistent flavor profiles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inclusions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Packages */}
      <section id="packages" className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Opportunity{' '}
              <span className="brand-gradient-text">
                Options
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Choose the support path that matches your food business goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black px-4 py-1 rounded-full text-sm font-semibold z-10">
                    Most Popular
                  </div>
                )}
                <GlassCard
                  className={`h-full ${pkg.recommended ? 'border-[#FFD700]/50 bg-white/10' : ''
                    }`}
                  hover={false}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-5xl font-bold brand-gradient-text mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-gray-400">{pkg.description}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/franchise/${pkg.slug}`}>
                    <Button
                      className={`w-full ${pkg.recommended
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      Apply Now
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Projections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Financial{' '}
              <span className="brand-gradient-text">
                Projection
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Business-plan figures from the PPT, subject to owner verification before public launch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white font-semibold">Metric</th>
                    <th className="text-center py-4 px-4 text-[#FFD700] font-semibold">Column 1</th>
                    <th className="text-center py-4 px-4 text-[#FFD700] font-semibold">Column 2</th>
                    <th className="text-center py-4 px-4 text-[#FFD700] font-semibold">Column 3</th>
                  </tr>
                </thead>
                <tbody>
                  {roiData.map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 px-4 text-gray-300 font-medium">{row.metric}</td>
                      <td className="py-4 px-4 text-center text-white">{row.starter}</td>
                      <td className="py-4 px-4 text-center text-white">{row.premium}</td>
                      <td className="py-4 px-4 text-center text-white">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 p-4 bg-[#FFD700]/10 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Note:</strong> These projections are based on
                  the KMME-BIP presentation and should be reviewed by management before publishing.
                  Actual business results may vary based on demand, operations, pricing, and costs.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Support & Training */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support &{' '}
              <span className="brand-gradient-text">
                Training
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comprehensive support system to ensure your success at every stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {support.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((subItem, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-[#FFD700] flex-shrink-0 mt-1" />
                        <span className="text-gray-300 text-sm">{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The{' '}
              <span className="brand-gradient-text">
                Process
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Your step-by-step journey from inquiry to grand opening.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-full flex items-center justify-center mb-4 mx-auto text-black font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-400 text-sm text-center mb-3">{step.description}</p>
                  <div className="flex items-center justify-center space-x-2 text-[#FFD700] text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{step.duration}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFD700]/10 to-[#B30000]/10 border-y border-[#FFD700]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
              Take the first step towards owning your own Don Picaso's franchise. Our team is ready
              to answer all your questions and guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg px-8 py-6 hover:opacity-90"
                >
                  Submit Inquiry
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <a href="tel:+639562931985">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Call Us: 0956-293-1985
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
