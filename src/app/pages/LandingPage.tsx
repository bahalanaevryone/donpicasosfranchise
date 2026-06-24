import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  TrendingUp,
  Users,
  Building2,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Star,
  MapPin,
  GraduationCap,
  BarChart3,
  Handshake,
  BadgeDollarSign,
  Utensils,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { franchisePackages } from '../data/franchisePackages';

export default function LandingPage() {
  const stats = [
    { icon: Building2, value: '5', label: 'Active Branches' },
    { icon: Users, value: 'MIMAROPA', label: 'Regional Expansion' },
    { icon: TrendingUp, value: '2026', label: 'Founded' },
    { icon: Award, value: '?199K', label: 'Starting Investment' },
  ];

  const packages = franchisePackages;

  const testimonials = [
    {
      name: 'Franchise Partner',
      role: 'Mamburao Branch',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'Don Picaso gave me not just a business, but the education and mentorship to run it successfully.',
      rating: 5,
    },
    {
      name: 'Franchise Partner',
      role: 'Paluan Branch',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      text: 'The Titser Art program changed the way I think about entrepreneurship. It is more than a food business.',
      rating: 5,
    },
    {
      name: 'Franchise Partner',
      role: 'Sta. Cruz Branch',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      text: 'Affordable packages, strong support, and a founder who genuinely cares about your success.',
      rating: 5,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Submit Inquiry',
      description: 'Fill out our franchise application form and tell us about your goals.',
    },
    {
      step: '02',
      title: 'Initial Meeting',
      description: 'Meet with our franchise team to discuss opportunities and requirements.',
    },
    {
      step: '03',
      title: 'Site Selection',
      description: 'We help you find the perfect location for maximum success.',
    },
    {
      step: '04',
      title: 'Training & Setup',
      description: 'Comprehensive training and full support during setup phase.',
    },
    {
      step: '05',
      title: 'Grand Opening',
      description: 'Launch your franchise with our marketing and operational support.',
    },
  ];

  const coreValues = [
    { letter: 'D', title: 'Dependability', description: 'Consistently delivering quality products, excellent service, and reliable support.' },
    { letter: 'O', title: 'Ownership', description: 'We take responsibility for our actions, commitments, and results.' },
    { letter: 'N', title: 'Nurturing Growth', description: 'Empowering employees, franchisees, customers, and communities.' },
    { letter: 'P', title: 'Passion for Excellence', description: 'Pursuing excellence in food quality, customer experience, and business performance.' },
    { letter: 'I', title: 'Integrity', description: 'Conducting business with honesty, transparency, and fairness.' },
    { letter: 'C', title: 'Customer-Centered Service', description: 'Placing our customers at the heart of every decision.' },
    { letter: 'A', title: 'Accountability', description: 'Honoring commitments and continuously improving our systems.' },
    { letter: 'S', title: 'Synergy', description: 'Teamwork and strong partnerships drive sustainable success.' },
    { letter: 'O', title: 'Opportunity Creation', description: 'Creating opportunities for entrepreneurship, employment, and community development.' },
  ];

  const branches = [
    { name: 'Mamburao', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', status: 'Open' },
    { name: 'Balansay', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop', status: 'Open' },
    { name: 'Paluan', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', status: 'Open' },
    { name: 'Sta. Cruz', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop', status: 'Open' },
    { name: 'Barahan', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop', status: 'Open' },
    { name: 'Oriental Mindoro', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&h=400&fit=crop', status: 'Coming Soon' },
  ];

  const faqs = [
    {
      question: 'What is the total investment required?',
      answer:
        'Don Picaso\'s offers three franchise packages: Starter at ?199,000, Pro at ?599,000, and Elite at ?1,000,000. Estimated store investment ranges from ?300,000 to ?500,000+ depending on location, store size, and operational requirements.',
    },
    {
      question: 'What is the Titser Art Entrepreneur Development Program?',
      answer:
        'Titser Art is our entrepreneur development platform that provides business coaching, mentorship, leadership development, financial literacy training, and personal growth programs. It complements our franchise system to develop not just successful businesses, but successful entrepreneurs.',
    },
    {
      question: 'How long does it take to open a franchise?',
      answer:
        'From application to grand opening, the process typically takes 4�6 months. This includes site selection, construction, training, and setup.',
    },
    {
      question: 'What kind of support do franchisees receive?',
      answer:
        'We provide comprehensive support including training, marketing materials, operational guidance, supply chain management, and ongoing business consultation through the Titser Art program.',
    },
    {
      question: 'Where is Don Picaso\'s currently operating?',
      answer:
        'We currently have branches in Mamburao, Balansay, Paluan, Sta. Cruz, and Barahan in Occidental Mindoro. Our expansion roadmap covers the entire MIMAROPA Region and beyond.',
    },
    {
      question: 'Do I need prior restaurant experience?',
      answer:
        'No prior experience is required. We provide complete training on all aspects of running the business, and the Titser Art program ensures you develop the entrepreneurial mindset to succeed.',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Subtle radial glow at top center */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,120,120,0.10) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/assets/don-picasos-logo.jpg"
              alt="Don Picaso's"
              className="mx-auto mb-8 h-20 w-full max-w-md rounded-lg object-contain shadow-[0_0_36px_rgba(255,215,0,0.28)]"
            />
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-[#FFD700]/20 to-[#B30000]/20 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-semibold">
                Proudly Filipino-Owned � MIMAROPA Region
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Don Picaso's House
              <br />
              <span className="brand-gradient-text">
                of Franchise
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Swak sa Budget, Premium ang Lasa.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              We don't just build restaurants � we build entrepreneurs. Join a franchise system
              powered by the Titser Art Entrepreneur Development Program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/franchise">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity"
                >
                  View Franchise Packages
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-lg px-8 py-6"
                >
                  Talk to Us
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-20"
          >
            <ChevronDown className="text-gray-400 w-8 h-8 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                A Brand Built on{' '}
                <span className="brand-gradient-text">
                  Resilience
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Don Picaso's was born from resilience, innovation, and a commitment to creating
                opportunities for communities. The name represents the places that inspired our
                beginnings � <strong className="text-white">Don</strong>sol,{' '}
                <strong className="text-white">Pi</strong>lar,{' '}
                <strong className="text-white">Ca</strong>stilla, and{' '}
                <strong className="text-white">So</strong>rsogon � communities in the Province of
                Sorsogon that shaped this vision.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                Founded by Arturo D. Alafriz Jr., a professional teacher and school president of
                16 years, Don Picaso's transforms adversity into opportunity � establishing its
                first branch in Mamburao in January 2026, and expanding to multiple locations
                within six months.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                  Learn Our Story
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/assets/landing_page_image.png"
                alt="Don Picaso's Restaurant"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#FFD700] to-[#B30000] p-6 rounded-xl">
                <div className="text-black text-3xl font-bold">5 Branches</div>
                <div className="text-black/80">and Growing</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Menu Section */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{' '}
              <span className="brand-gradient-text">
                Menu
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Quality food at prices that work � Swak sa Budget, Premium ang Lasa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src="/assets/minu1.png"
                alt="Don Picaso's Menu Page 1"
                className="w-full h-auto object-contain bg-white/5"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src="/assets/menu2.png"
                alt="Don Picaso's Menu Page 2"
                className="w-full h-auto object-contain bg-white/5"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold px-8 py-5 hover:opacity-90">
                Inquire About Franchise
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Franchise with{' '}
              <span className="brand-gradient-text">
                Don Picaso's?
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A franchise ecosystem designed to develop successful businesses and successful entrepreneurs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: 'Educator-Led Mentorship',
                description: "Your franchisor is a former school president. You don't just get a manual � you get a mentor.",
              },
              {
                icon: BarChart3,
                title: 'Proven Track Record',
                description: '4 branches opened in just 6 months with monthly sales of ?150K�?300K per branch',
              },
              {
                icon: Handshake,
                title: 'Community-Rooted Brand ',
                description: 'Built for and by local communities in the MIMAROPA Region � not a foreign import. ',
              },
              {
                icon: BadgeDollarSign,
                title: 'Affordable Investment ',
                description: 'Competitive franchise packages designed for the local market � accessible to teachers, OFWs, and professionals.',
              },
              {
                icon: TrendingUp,
                title: 'Exclusive Territory ',
                description: 'One franchisee per municipality � protecting your investment and market coverage.',
              },
              {
                icon: Utensils,
                title: 'Quality & Affordable Food ',
                description: 'Products designed for the Filipino palate � fast, flavorful, and fairly priced for every community.',
              },
            ].map((item, index) => (
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

      {/* Franchise Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your{' '}
              <span className="brand-gradient-text">
                Franchise Package
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Three investment tiers designed for every stage of the entrepreneurial journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <GlassCard hover={false}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold brand-gradient-text mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-gray-400 text-sm">{pkg.description}</p>
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
                    <Button className="w-full bg-white/10 text-white hover:bg-white/20">
                      Apply Now
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 mt-8 text-sm">
            Estimated store investment: ?300,000 � ?500,000+ depending on location, store size, and operational requirements.
          </p>
        </div>
      </section>

      {/* Titser Art Section */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="bg-gradient-to-br from-[#FFD700]/10 to-[#B30000]/10 border-[#FFD700]/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-semibold">
                      TITSER ART
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Entrepreneur Development Platform
                  </h2>
                  <p className="text-gray-300 text-lg mb-4">
                    "We Season Your Success."
                  </p>
                  <p className="text-gray-400 mb-6">
                    Founded by a professional educator, Titser Art goes beyond the franchise system
                    to develop the entrepreneur behind the business � through coaching, mentorship,
                    leadership training, and financial education.
                  </p>
                  <div className="space-y-3">
                    {[
                      'Business Coaching & Mentorship',
                      'Leadership Development',
                      'Financial Literacy Training',
                      'Personal Growth Programs',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    The T.I.T.S.E.R.A.R.T Framework
                  </h3>
                  <div className="space-y-3">
                    {[
                      { letter: 'T', action: 'Think Like an Entrepreneur' },
                      { letter: 'I', action: 'Innovate Opportunities' },
                      { letter: 'T', action: 'Take Action' },
                      { letter: 'S', action: 'Systemize Operations' },
                      { letter: 'E', action: 'Empower People' },
                      { letter: 'R', action: 'Reinvest and Scale' },
                      { letter: 'A', action: 'Adapt to Change' },
                      { letter: 'R', action: 'Reach Your Purpose' },
                      { letter: 'T', action: 'Transform Lives' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                          {item.letter}
                        </div>
                        <span className="text-gray-300 text-sm">{item.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
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
                DON PICASO
              </span>{' '}
              Core Values
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Every letter of our name stands for a principle that guides how we do business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <GlassCard>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                      {value.letter}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{value.title}</h3>
                      <p className="text-gray-400 text-sm">{value.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Network */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{' '}
              <span className="brand-gradient-text">
                Branch Network
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Starting in Occidental Mindoro and expanding across the entire MIMAROPA Region.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#FFD700]" />
                      <h3 className="text-white font-bold text-xl">{branch.name}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${branch.status === 'Open'
                        ? 'bg-green-500/80 text-white'
                        : 'bg-[#FFD700]/80 text-black'
                        }`}
                    >
                      {branch.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/branches">
              <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                View All Branches
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Expansion Roadmap */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              MIMAROPA{' '}
              <span className="brand-gradient-text">
                Expansion Roadmap
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A clear, phased plan to bring Don Picaso's across every province in MIMAROPA and beyond.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#B30000] -translate-y-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {[
                { phase: 'Phase 1', title: 'Occidental Mindoro', description: 'Current operations in Mamburao, Balansay, Paluan, Sta. Cruz, and Barahan.', active: true },
                { phase: 'Phase 2', title: 'Oriental Mindoro & Marinduque', description: 'Expanding east across Mindoro and into Marinduque.', active: false },
                { phase: 'Phase 3', title: 'Romblon & Palawan', description: 'Reaching the outer islands of MIMAROPA.', active: false },
                { phase: 'Phase 4', title: 'National Expansion', description: 'Taking Don Picaso\'s beyond MIMAROPA to the rest of the Philippines.', active: false },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`rounded-2xl p-6 border transition-all duration-300 ${phase.active
                    ? 'bg-gradient-to-br from-[#FFD700]/20 to-[#B30000]/20 border-[#FFD700]/50'
                    : 'bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10'
                    }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto font-bold text-sm ${phase.active
                      ? 'bg-gradient-to-br from-[#FFD700] to-[#B30000] text-black'
                      : 'bg-white/10 text-white border border-white/20'
                      }`}>
                      {phase.phase}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 text-center">{phase.title}</h3>
                    <p className="text-gray-400 text-sm text-center">{phase.description}</p>
                    {phase.active && (
                      <div className="mt-4 text-center">
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold">
                          Active Now
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Franchise{' '}
              <span className="brand-gradient-text">
                Partner Stories
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Path to{' '}
              <span className="brand-gradient-text">
                Partnership
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A simple, transparent process from inquiry to grand opening.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#B30000] -translate-y-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-full flex items-center justify-center mb-4 mx-auto text-black font-bold text-xl">
                      {step.step}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-400 text-sm text-center">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked{' '}
              <span className="brand-gradient-text">
                Questions
              </span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6"
              >
                <AccordionTrigger className="text-white hover:text-[#FFD700] text-left py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your{' '}
              <span className="brand-gradient-text">
                Future?
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join Don Picaso's House of Franchise and become part of a growing network of entrepreneurs
              across the MIMAROPA Region. Packages start at ?199,000.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg px-10 py-6 hover:opacity-90 transition-opacity"
                >
                  Apply for a Franchise
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-lg px-10 py-6"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
            <p className="text-white-500 text-sm mt-6">
              Contact: 0956-293-1985 � donpicasofoodservices@gmail.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
