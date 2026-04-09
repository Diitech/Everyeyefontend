import { motion } from 'framer-motion';
import { RefreshCw, Check, Clock, Shield, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';

export function Refund() {
  return (
    <>
      <SEO 
        title="Refund Policy"
        description="Our 30-day money-back guarantee. Learn about our refund policy and how to request a refund."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-500/10 via-dark to-dark">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                30-Day Money-Back <span className="text-coral">Guarantee</span>
              </h1>
              <p className="text-gray-400">
                Not satisfied? We&apos;ll refund your purchase. No questions asked.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { 
                  icon: Clock, 
                  title: '30-Day Window', 
                  desc: 'Request a refund within 30 days of purchase'
                },
                { 
                  icon: Shield, 
                  title: 'No Questions Asked', 
                  desc: 'We trust you. No explanation needed.'
                },
                { 
                  icon: Check, 
                  title: 'Full Refund', 
                  desc: '100% of your purchase price back'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* How to Request */}
            <div className="bg-dark-100 rounded-2xl p-8 border border-border mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">How to Request a Refund</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Go to Orders', desc: 'Visit your account orders page' },
                  { step: '2', title: 'Select Order', desc: 'Find the order you want to refund' },
                  { step: '3', title: 'Click Refund', desc: 'Click the Request Refund button' },
                  { step: '4', title: 'Get Refunded', desc: 'Refund processed within 5-10 business days' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-coral font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  Eligible for Refund
                </h2>
                <ul className="space-y-3">
                  {[
                    'Digital products within 30 days',
                    'Membership subscriptions (prorated)',
                    'Bundle purchases',
                    'Products with technical issues',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Not Eligible
                </h2>
                <ul className="space-y-3">
                  {[
                    'Products purchased more than 30 days ago',
                    'Products that have been heavily modified',
                    'Free products and downloads',
                    'Gift purchases (contact support)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-16 text-center">
              <p className="text-gray-400 mb-4">
                Have questions about our refund policy?
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 text-coral hover:underline"
              >
                Contact our support team
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
