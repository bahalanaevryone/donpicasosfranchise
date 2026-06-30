import { FormEvent, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { supabase } from '../../supabaseClient';
import { franchisePackages } from '../data/franchisePackages';

const PACKAGE_LABELS = Object.fromEntries(
  franchisePackages.map((pkg) => [pkg.code, `${pkg.name} - ${pkg.price}`]),
);

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const preSelectedPackage = (searchParams.get('package') ?? '').toUpperCase();
  const preSelectedBudget = searchParams.get('budget') ?? '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: preSelectedPackage ? 'franchise' : '',
    investmentBudget: preSelectedBudget,
    preferredLocation: '',
    message: preSelectedPackage
      ? `I am interested in the ${PACKAGE_LABELS[preSelectedPackage] ?? preSelectedPackage}. Please send me more details.`
      : '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (preSelectedPackage) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: 'franchise',
        investmentBudget: preSelectedBudget || prev.investmentBudget,
        message: prev.message || `I am interested in the ${PACKAGE_LABELS[preSelectedPackage] ?? preSelectedPackage}. Please send me more details.`,
      }));
    }
  }, [preSelectedPackage, preSelectedBudget]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      // 1. Kuhanin natin kung may piniling package sa URL (e.g. ?package=VIP)
      const urlPackageCode = (searchParams.get('package') ?? '').toUpperCase();
      const hasPackage = urlPackageCode && PACKAGE_LABELS[urlPackageCode];
      const finalPackageName = hasPackage ? PACKAGE_LABELS[urlPackageCode] : null;

      // 2. I-insert na natin kasama ang mga bagong columns para sa Admin Dashboard niyo!
      const { error } = await supabase
        .from('franchise_leads')
        .insert([{
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: 'new',
          package_name: finalPackageName,
          budget: formData.investmentBudget || null,
          location: formData.preferredLocation || null
        }]);

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      setSubmitStatus('success');
      setSubmitMessage('Your message has been sent successfully! A member of our team will get back to you within 24 to 48 hours. Please check your email for a confirmation message.');

      // I-reset ang form fields pagkatapos ng tagumpay na submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        investmentBudget: '',
        preferredLocation: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitStatus('error');
    }
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: ['0956-293-1985'], action: 'tel:+639562931985' },
    { icon: Mail, title: 'Email', details: ['donpicasofoodservices@gmail.com'], action: 'mailto:donpicasofoodservices@gmail.com' },
    { icon: MapPin, title: 'Head Office', details: ['Mamburao', 'Occidental Mindoro, Philippines'], action: '#' },
    { icon: Clock, title: 'Business Hours', details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'], action: '#' },
  ];

  const socialMedia = [
    { icon: Facebook, name: 'Facebook', handle: "Don Picaso's House of Franchise", link: 'https://www.facebook.com/profile.php?id=61584873088991' },
    { icon: Instagram, name: 'Instagram', handle: 'Follow us for updates', link: '#' },
    { icon: Twitter, name: 'Twitter', handle: 'Follow us for updates', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#B30000]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Get In <span className="brand-gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to discuss business rebranding, supply distribution, or ready-to-cook products?
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#5A0000]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Send Us a <span className="brand-gradient-text">Message</span></h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">First Name *</label>
                    <Input placeholder="Juan" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Last Name *</label>
                    <Input placeholder="Dela Cruz" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Email *</label>
                  <Input type="email" placeholder="juan@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Phone Number *</label>
                  <Input placeholder="Your active mobile number" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Message *</label>
                  <Textarea placeholder="Tell us more about your food business needs..." rows={5} value={formData.message} onChange={(e) => updateField('message', e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-emerald-500/10 px-6 py-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="rounded-full bg-green-500/20 p-1.5">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-green-300 font-semibold text-base">Message Sent Successfully!</p>
                        <p className="text-green-400/80 text-sm mt-1 leading-relaxed">{submitMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/30 bg-gradient-to-r from-red-500/20 to-rose-500/10 px-6 py-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-red-500/20 p-1.5">
                        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-red-300 text-sm">Something went wrong. Please try again or contact us directly.</p>
                    </div>
                  </motion.div>
                )}

                <Button type="submit" disabled={submitStatus === 'submitting'} className="w-full bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg py-6 hover:opacity-90">
                  <Send className="mr-2 w-5 h-5" />
                  {submitStatus === 'submitting' ? 'Saving...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            <div className="space-y-8">
              <GlassCard>
                <h3 className="text-2xl font-bold text-white mb-4">Prefer to Call?</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-gray-300">
                      <info.icon className="w-5 h-5 text-[#FFD700]" />
                      <span>{info.details.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
