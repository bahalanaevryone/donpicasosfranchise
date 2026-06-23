import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Target,
  Eye,
  Users,
  Award,
  Globe,
  ArrowRight,
  BookOpen,
  MapPin,
  Store,
  Quote,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';

export default function AboutPage() {
  const founderImage = '/assets/art_image.png';

  const timeline = [
    {
      year: '2007-2023',
      title: 'A Life in Education',
      description:
        'Titser Art spent more than 17 years as a professional teacher and later served as President of his own private school company.',
    },
    {
      year: '2020',
      title: 'A Difficult Turning Point',
      description:
        'Like many schools, the business was heavily affected by the COVID-19 pandemic, beginning a challenging season of recovery.',
    },
    {
      year: '2023',
      title: 'A New Door Opened',
      description:
        "After the difficult decision to close the school, Titser Art turned the chapter into a new opportunity: Don Picaso's.",
    },
    {
      year: 'Sorsogon',
      title: 'The Name Took Root',
      description:
        "DON, PI, CA, and SO honor Donsol, Pilar, Castilla, and Sorsogon, the places that inspired the brand's beginning.",
    },
    {
      year: 'Jan 2026',
      title: 'First Branch Opened',
      description:
        "The first Don Picaso's branch opened in Mamburao, Occidental Mindoro, bringing the concept closer to Titser Art's hometown.",
    },
    {
      year: '2026',
      title: 'MIMAROPA Growth',
      description:
        "The brand expanded across Mamburao, Paluan, Balansay, Sta. Cruz, and Barahan, strengthening the mission to build local entrepreneurs.",
    },
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Mentorship First',
      description:
        'We guide franchise partners with the patience and structure of an educator, not just the systems of a food brand.',
    },
    {
      icon: Users,
      title: 'Entrepreneur Success',
      description:
        'We help aspiring business owners learn how to operate effectively, sustainably, and with confidence.',
    },
    {
      icon: Award,
      title: 'Affordable Quality',
      description:
        'We serve communities with accessible, quality food backed by practical and repeatable store operations.',
    },
    {
      icon: Globe,
      title: 'Community Impact',
      description:
        'We create opportunities, jobs, and local growth through a homegrown franchise platform.',
    },
  ];

  const branches = ['Mamburao', 'Paluan', 'Balansay', 'Sta. Cruz', 'Barahan'];

  const milestones = [
    { number: '17+', label: 'Years in Education' },
    { number: '2026', label: 'First Branch Opened' },
    { number: '5', label: 'Growth Locations' },
    { number: 'MIMAROPA', label: 'Regional Goal' },
  ];

  const founderMessage = [
    "My name is Titser Art, and I am the Founder, CEO, and Owner of Don Picaso's Fast Food Chain, a growing fast-food brand operating under a franchising business model.",
    'Before entering the food industry, I spent more than 17 years in education. I was a professional teacher and later became the President of my own private school company, which I successfully operated from 2007 to 2023.',
    'Like many educational institutions, our school was heavily affected by the COVID-19 pandemic in 2020. Despite our best efforts to recover and sustain operations, we made the difficult decision to close the business in 2023. While it was a challenging chapter in my life, it also opened the door to a new opportunity.',
    "That opportunity became Don Picaso's.",
    "After establishing the concept in Sorsogon, I saw an opportunity to bring the business and franchising program to my hometown of Mamburao, Occidental Mindoro. In January 2026, we opened our first branch and quickly expanded into Mamburao, Paluan, Balansay, Sta. Cruz, and Barahan.",
    "This rapid growth strengthened my belief that Don Picaso is not only a food business but also a platform for entrepreneurship. Today, our mission is bigger than building restaurants. Our goal is to establish Don Picaso as a leading homegrown franchise brand throughout the MIMAROPA Region.",
    "What makes our franchise program unique is my background as an educator. Business success comes from proper guidance, training, and mentorship, and one of the strongest value propositions of Don Picaso's Franchise Program is our commitment to teaching and supporting our franchise partners.",
    'At Don Picaso, we are not simply building stores. We are building entrepreneurs, creating jobs, and helping communities grow. As we continue our expansion, our vision is clear: to become the preferred fast-food franchise brand across the MIMAROPA Region and eventually throughout the Philippines.',
  ];

  return (
    <div className="min-h-screen bg-[#7A0000]">
      <Navbar />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#B30000]/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The founder-led journey of Don Picaso's, a homegrown fast-food franchise brand built
              to season the success of local entrepreneurs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/25 bg-[#5A0000]/70 shadow-2xl">
                <img
                  src={founderImage}
                  alt="Titser Art, Founder and CEO of Don Picaso's"
                  className="aspect-[4/5] w-full object-cover object-center"
                  onError={(event) => {
                    event.currentTarget.src = '/assets/don-picasos-logo.jpg';
                    event.currentTarget.className =
                      'aspect-[4/5] w-full object-contain object-center p-10 bg-white';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-2xl font-bold text-white">Titser Art</div>
                  <div className="text-[#FFD700]">Founder, CEO, and Owner</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                From Education to{' '}
                <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
                  Entrepreneurship
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                My name is Titser Art, and I am the Founder, CEO, and Owner of Don Picaso's Fast
                Food Chain, a growing fast-food brand operating under a franchising business model.
              </p>
              <p className="text-gray-300 text-lg mb-4">
                Before entering the food industry, I spent more than 17 years in education. I was a
                professional teacher and later became the President of my own private school company,
                which I successfully operated from 2007 to 2023.
              </p>
              <p className="text-gray-300 text-lg mb-4">
                Like many educational institutions, our school was heavily affected by the COVID-19
                pandemic in 2020. Despite our best efforts to recover and sustain operations, we made
                the difficult decision to close the business in 2023. While it was a challenging
                chapter, it opened the door to a new opportunity.
              </p>
              <p className="text-[#FFD700] text-2xl font-semibold">
                That opportunity became Don Picaso's.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent mb-2 break-words">
                    {milestone.number}
                  </div>
                  <div className="text-gray-300">{milestone.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="relative overflow-hidden border-[#FFD700]/30 bg-gradient-to-br from-white/10 to-[#FFD700]/5">
              <Quote className="absolute right-6 top-6 h-16 w-16 text-[#FFD700]/15" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                  Founder&apos;s Message
                </p>
                <h2 className="mt-3 text-4xl font-bold text-white">Titser Art&apos;s Journey</h2>
                <div className="mt-8 space-y-5 text-lg leading-8 text-gray-300">
                  {founderMessage.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 border-l-4 border-[#FFD700] pl-5">
                  <p className="text-2xl font-semibold text-white">&quot;We Season Your Success.&quot;</p>
                  <p className="mt-2 text-[#FFD700]">Titser Art</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full bg-gradient-to-br from-[#FFD700]/10 to-transparent border-[#FFD700]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 text-lg">
                  To establish Don Picaso's as a leading homegrown franchise brand throughout the
                  MIMAROPA Region, creating opportunities for local entrepreneurs while providing
                  affordable, quality food to our communities.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="h-full bg-gradient-to-br from-[#B30000]/10 to-transparent border-[#B30000]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300 text-lg">
                  To become the preferred fast-food franchise brand across the MIMAROPA Region and
                  eventually throughout the Philippines.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A journey from education, through a difficult business closure, into a new platform
              for entrepreneurship.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] to-[#B30000]" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <GlassCard className={index % 2 === 0 ? 'md:text-right' : ''}>
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </GlassCard>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                    <div className="w-8 h-8 bg-black rounded-full" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Meaning of{' '}
                <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
                  Don Picaso
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                The name Don Picaso represents the roots of our company and the places that inspired
                our journey in the Province of Sorsogon, Bicol Region.
              </p>
              <p className="text-gray-300 text-lg">
                After establishing the concept in Sorsogon, Titser Art saw an opportunity to bring
                the business and franchising program to his hometown of Mamburao, Occidental Mindoro.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                ['DON', 'Donsol'],
                ['PI', 'Pilar'],
                ['CA', 'Castilla'],
                ['SO', 'Sorsogon'],
              ].map(([code, place]) => (
                <GlassCard key={code} className="text-center" hover={false}>
                  <div className="text-4xl font-bold text-[#FFD700] mb-2">{code}</div>
                  <div className="text-white font-semibold">{place}</div>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The principles that guide the franchise and every partner we support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-lg">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Growing Across{' '}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
                Mindoro
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From the first branch in Mamburao, Don Picaso's quickly expanded into nearby
              communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {branches.map((branch, index) => (
              <motion.div
                key={branch}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{branch}</h3>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#FFD700]/10 to-[#B30000]/10 border-y border-[#FFD700]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We Season Your Success.
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
              At Don Picaso's, we are not simply building stores. We are building entrepreneurs,
              creating jobs, and helping communities grow. Our goal now is Don Picaso MIMAROPA.
            </p>
            <div className="mb-8 flex items-center justify-center gap-3 text-[#FFD700]">
              <Store className="w-6 h-6" />
              <span className="text-lg font-semibold">Titser Art</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/franchise">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg px-8 py-6 hover:opacity-90"
                >
                  Explore Opportunities
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
