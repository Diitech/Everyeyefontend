import { motion } from 'framer-motion';
import { Check, X, FileText, Shield, Briefcase, Users } from 'lucide-react';
import { SEO } from '@/components/SEO';

export function License() {
  return (
    <>
      <SEO 
        title="License Information"
        description="Learn about our licensing terms. Understand what you can and cannot do with our digital products."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-coral/10 via-dark to-dark">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-coral/20 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                License <span className="text-coral">Information</span>
              </h1>
              <p className="text-gray-400">
                Understand what you can and cannot do with our digital products
              </p>
            </motion.div>
          </div>
        </section>

        {/* License Types */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { 
                  icon: Users, 
                  title: 'Personal License', 
                  desc: 'For individual use in personal projects',
                  price: 'Included'
                },
                { 
                  icon: Briefcase, 
                  title: 'Commercial License', 
                  desc: 'For use in client and commercial projects',
                  price: 'Included'
                },
                { 
                  icon: Shield, 
                  title: 'Extended License', 
                  desc: 'For resale and redistribution rights',
                  price: 'Contact us'
                },
              ].map((license, index) => {
                const Icon = license.icon;
                return (
                  <motion.div
                    key={license.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{license.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{license.desc}</p>
                    <span className="text-coral font-medium">{license.price}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* What You Can Do */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-dark-100 rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-400" />
                  What You Can Do
                </h2>
                <ul className="space-y-4">
                  {[
                    'Use in unlimited personal projects',
                    'Use in unlimited client projects',
                    'Modify and customize the products',
                    'Create derivative works',
                    'Use in commercial products and services',
                    'Use in advertising and marketing materials',
                    'Use in software applications',
                    'Use in websites and mobile apps',
                    'Use in print materials',
                    'Use in social media content',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-dark-100 rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <X className="w-6 h-6 text-red-400" />
                  What You Cannot Do
                </h2>
                <ul className="space-y-4">
                  {[
                    'Resell or redistribute as-is',
                    'Include in stock asset libraries',
                    'Share files with non-purchasers',
                    'Use in ways that defame our brand',
                    'Claim ownership of the original work',
                    'Use in products that promote illegal activities',
                    'Create competing products using our assets',
                    'Transfer license to another person (without Extended License)',
                    'Use in trademark or logo applications',
                    'Sublicense the products to third parties',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Common Questions</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { q: 'Do I need to credit Everytech?', a: 'No, crediting is not required but always appreciated!' },
                  { q: 'Can I use products for client work?', a: 'Yes, all our products include a commercial license for client projects.' },
                  { q: 'What happens if I cancel my membership?', a: 'Products you downloaded remain yours to keep forever.' },
                  { q: 'Can I share files with my team?', a: 'Team memberships allow sharing within your organization.' },
                ].map((faq, index) => (
                  <div key={index} className="bg-dark-100 rounded-xl p-6 border border-border">
                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                    <p className="text-gray-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
