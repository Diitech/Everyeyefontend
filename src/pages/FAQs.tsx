import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    name: 'General',
    questions: [
      { q: 'What is Everytech?', a: 'Everytech is a premium digital marketplace offering templates, courses, AI tools, and design assets for creators and entrepreneurs. We curate high-quality products to help you build, learn, and grow.' },
      { q: 'How do I create an account?', a: 'Click the "Sign In" button in the top right corner and select "Create Account". You can sign up with your email, Google, or GitHub account.' },
      { q: 'Is Everytech free to use?', a: 'Browsing is free! You only pay for the products you purchase. We also offer a free Starter membership with access to select free products.' },
    ]
  },
  {
    name: 'Purchases & Downloads',
    questions: [
      { q: 'How do I download my purchases?', a: 'After purchase, go to your account dashboard and click "Downloads". You can also find download links in your order confirmation email.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.' },
      { q: 'Can I get a refund?', a: 'Yes! We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied, contact us for a full refund.' },
      { q: 'Do I get free updates?', a: 'Yes, when you purchase a product, you receive free updates for life whenever the creator improves the product.' },
    ]
  },
  {
    name: 'Licensing',
    questions: [
      { q: 'What license do products come with?', a: 'All products include a commercial license, allowing you to use them in unlimited personal and client projects. See our License page for full details.' },
      { q: 'Can I use products for client work?', a: 'Absolutely! Our commercial license covers client projects. You can use our products in work you do for clients without any additional fees.' },
      { q: 'Can I resell the products?', a: 'No, you cannot resell or redistribute our products as-is. However, you can use them to create derivative works and end products.' },
    ]
  },
  {
    name: 'Membership',
    questions: [
      { q: 'What is included in a membership?', a: 'Pro and Team memberships include unlimited access to our entire product library, new weekly releases, exclusive content, and priority support.' },
      { q: 'Can I cancel my membership?', a: 'Yes, you can cancel anytime from your account settings. You\'ll continue to have access until the end of your billing period.' },
      { q: 'What happens to my downloads if I cancel?', a: 'Products you downloaded during your membership remain yours to keep forever, even after cancellation.' },
    ]
  },
  {
    name: 'Technical Support',
    questions: [
      { q: 'What file formats are supported?', a: 'We support a wide range of formats including Figma, Sketch, Adobe XD, Photoshop, Illustrator, HTML/CSS, React, Vue, and more. Each product lists its supported formats.' },
      { q: 'I\'m having trouble with a download. What should I do?', a: 'First, try clearing your browser cache and downloading again. If the issue persists, contact our support team and we\'ll help you right away.' },
      { q: 'How do I contact support?', a: 'You can reach us via email at support@everytech.com, through our contact form, or by clicking the chat icon in the bottom right corner.' },
    ]
  },
];

export function FAQs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('General');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredFaqs = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <>
      <SEO 
        title="FAQs"
        description="Find answers to frequently asked questions about Everytech. Learn about purchases, licensing, memberships, and more."
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
                <HelpCircle className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Frequently Asked <span className="text-coral">Questions</span>
              </h1>
              <p className="text-gray-400 mb-8">
                Find answers to common questions about Everytech
              </p>
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 bg-dark-100 border-border text-white text-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-16">
            {searchQuery ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-6">Search Results</h2>
                {filteredFaqs.map((cat) => (
                  cat.questions.map((q, idx) => (
                    <div key={`${cat.name}-${idx}`} className="bg-dark-100 rounded-xl border border-border overflow-hidden">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === `${cat.name}-${idx}` ? null : `${cat.name}-${idx}`)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="text-white font-medium">{q.q}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openQuestion === `${cat.name}-${idx}` ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openQuestion === `${cat.name}-${idx}` && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-gray-400">{q.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ))}
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No results found. Try a different search term.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {faqCategories.map((category) => (
                  <div key={category.name} className="bg-dark-100 rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                      className="w-full flex items-center justify-between p-4 text-left bg-dark"
                    >
                      <span className="text-white font-semibold text-lg">{category.name}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openCategory === category.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openCategory === category.name && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="divide-y divide-border">
                            {category.questions.map((q, idx) => (
                              <div key={idx} className="p-4">
                                <p className="text-white font-medium mb-2">{q.q}</p>
                                <p className="text-gray-400 text-sm">{q.a}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
            <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-coral" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Still have questions?</h2>
            <p className="text-gray-400 mb-6">Can&apos;t find what you&apos;re looking for? We&apos;re here to help.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
