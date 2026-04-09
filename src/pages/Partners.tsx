import { motion } from 'framer-motion';
import { Handshake, ArrowRight, Zap, TrendingUp, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';

const partnerTypes = [
  {
    icon: Zap,
    title: 'Technology Partners',
    desc: 'Integrate with Everytech to enhance your product offering and reach new customers.',
  },
  {
    icon: TrendingUp,
    title: 'Affiliate Partners',
    desc: 'Earn commissions by promoting Everytech products to your audience.',
  },
  {
    icon: Users,
    title: 'Creator Partners',
    desc: 'Sell your digital products on Everytech and reach thousands of customers.',
  },
  {
    icon: Globe,
    title: 'Enterprise Partners',
    desc: 'Custom solutions for teams and organizations.',
  },
];

const featuredPartners = [
  { name: 'Figma', logo: 'F' },
  { name: 'Notion', logo: 'N' },
  { name: 'Webflow', logo: 'W' },
  { name: 'Framer', logo: 'Fr' },
  { name: 'Stripe', logo: 'St' },
  { name: 'Vercel', logo: 'Ve' },
];

export function Partners() {
  return (
    <>
      <SEO 
        title="Partners"
        description="Partner with Everytech. Join our affiliate program, become a technology partner, or sell your products on our marketplace."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-coral/10 via-dark to-dark">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-coral/20 flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Partner With <span className="text-coral">Everytech</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Join forces with us to empower creators worldwide. 
                Together, we can build something amazing.
              </p>
              <a 
                href="mailto:partners@everytech.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
              >
                Become a Partner
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Partnership Opportunities</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Choose the partnership that fits your goals
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerTypes.map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <motion.div
                    key={partner.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{partner.title}</h3>
                    <p className="text-gray-400 text-sm">{partner.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Partners */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Trusted By Industry Leaders</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                We&apos;re proud to partner with amazing companies
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {featuredPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-24 h-24 rounded-xl bg-dark flex items-center justify-center border border-border"
                >
                  <span className="text-2xl font-bold text-coral">{partner.logo}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate Program */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Affiliate Program</h2>
                <p className="text-gray-400 mb-6">
                  Earn up to 30% commission on every sale you refer. Our affiliate program is perfect for:
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Content creators and influencers',
                    'Bloggers and website owners',
                    'Design and development educators',
                    'Anyone with an audience interested in digital products',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="bg-coral hover:bg-coral-dark text-white">
                  Join Affiliate Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="bg-dark-100 rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-semibold text-white mb-6">Program Benefits</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Commission Rate', value: 'Up to 30%' },
                    { label: 'Cookie Duration', value: '60 days' },
                    { label: 'Payout Threshold', value: '$50' },
                    { label: 'Payment Method', value: 'PayPal, Bank Transfer' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between py-3 border-b border-border last:border-0">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="text-white font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-gradient-to-r from-coral/20 to-coral/5 rounded-2xl p-8 md:p-12 text-center border border-coral/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Partner?
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                Let&apos;s discuss how we can work together to create value for our communities.
              </p>
              <a 
                href="mailto:partners@everytech.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
              >
                <Handshake className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
