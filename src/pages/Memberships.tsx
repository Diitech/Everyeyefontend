import { motion } from 'framer-motion';
import { Crown, Check, Download, Zap, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { pricingPlans } from '@/data';

const membershipFeatures = [
  { icon: Download, title: 'Unlimited Downloads', desc: 'Access our entire library with no restrictions' },
  { icon: Zap, title: 'New Content Weekly', desc: 'Fresh templates, courses, and tools every week' },
  { icon: Star, title: 'Exclusive Content', desc: 'Members-only products and early access' },
  { icon: Shield, title: 'Commercial License', desc: 'Use everything in client projects' },
];

export function Memberships() {
  return (
    <>
      <SEO 
        title="Memberships"
        description="Get unlimited access to our entire library of premium digital assets with an Everytech membership."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-dark to-dark" />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-amber-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Unlock Unlimited{' '}
                <span className="text-coral">Access</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Get unlimited access to our entire library of premium digital assets. 
                New content added weekly. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-coral text-white text-xs font-medium px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`h-full rounded-2xl border p-6 ${
                    plan.highlighted
                      ? 'bg-dark-100 border-coral/50 shadow-glow'
                      : 'bg-dark-100 border-border'
                  }`}>
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-500">/{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => {
                        const isAvailable = plan.price > 0 || i < 3;
                        return (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 flex-shrink-0 ${isAvailable ? 'text-coral' : 'text-gray-600'}`} />
                            <span className={`text-sm ${isAvailable ? 'text-gray-300' : 'text-gray-500'}`}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-coral hover:bg-coral-dark text-white'
                          : 'bg-dark-200 hover:bg-dark-300 text-white border border-border'
                      }`}
                    >
                      {plan.ctaText}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Membership Benefits</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Everything you need to create amazing projects
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {membershipFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Can I cancel my membership anytime?', a: 'Yes, you can cancel your membership at any time. You\'ll continue to have access until the end of your billing period.' },
                { q: 'What happens to my downloads if I cancel?', a: 'Any products you downloaded during your membership remain yours to keep forever, even after cancellation.' },
                { q: 'Is there a limit on downloads?', a: 'Pro and Team members have unlimited downloads. Starter members can access free products only.' },
                { q: 'Can I use products for client work?', a: 'Yes! All our products come with a commercial license, perfect for client projects.' },
                { q: 'How often is new content added?', a: 'We add new products every week, so there\'s always something fresh to discover.' },
              ].map((faq, index) => (
                <div key={index} className="bg-dark-100 rounded-xl p-6 border border-border">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
