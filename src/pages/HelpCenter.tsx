import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, FileText, Video, ChevronRight, LifeBuoy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';

const helpCategories = [
  { 
    name: 'Getting Started', 
    icon: Book, 
    articles: 12,
    description: 'Learn the basics of using Everytech'
  },
  { 
    name: 'Account & Billing', 
    icon: FileText, 
    articles: 8,
    description: 'Manage your account and payments'
  },
  { 
    name: 'Downloads & Licensing', 
    icon: FileText, 
    articles: 15,
    description: 'Everything about downloading and licenses'
  },
  { 
    name: 'Video Tutorials', 
    icon: Video, 
    articles: 24,
    description: 'Step-by-step video guides'
  },
  { 
    name: 'Contact Support', 
    icon: MessageCircle, 
    articles: null,
    description: 'Get help from our team'
  },
  { 
    name: 'Community', 
    icon: LifeBuoy, 
    articles: null,
    description: 'Connect with other creators'
  },
];

const popularArticles = [
  'How do I download my purchases?',
  'What is included in the commercial license?',
  'How do I request a refund?',
  'Can I use products for client work?',
  'How do I update my payment method?',
  'What file formats are supported?',
];

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <SEO 
        title="Help Center"
        description="Find answers to your questions. Browse our knowledge base, video tutorials, or contact our support team."
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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                How Can We <span className="text-coral">Help?</span>
              </h1>
              <p className="text-gray-400 mb-8">
                Search our knowledge base or browse categories to find answers
              </p>
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 bg-dark-100 border-border text-white text-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={cat.articles ? `#` : '/contact'}
                      className="block bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-coral" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-coral transition-colors">
                              {cat.name}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">{cat.description}</p>
                            {cat.articles && (
                              <p className="text-coral text-sm mt-2">{cat.articles} articles</p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-coral transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
                <div className="space-y-3">
                  {popularArticles.map((article, index) => (
                    <Link
                      key={index}
                      to="/faqs"
                      className="flex items-center gap-3 p-4 bg-dark rounded-lg border border-border hover:border-coral/50 transition-colors group"
                    >
                      <FileText className="w-5 h-5 text-gray-500 group-hover:text-coral" />
                      <span className="text-gray-300 group-hover:text-white">{article}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-coral" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Still Need Help?</h2>
                <div className="bg-dark rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Contact Support</h3>
                      <p className="text-gray-400 text-sm">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="block w-full text-center py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
