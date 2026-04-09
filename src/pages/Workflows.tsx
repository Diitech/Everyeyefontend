import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, Settings, Repeat, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { allProducts } from '@/data/extendedProducts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const workflowTypes = [
  { name: 'Email Automation', icon: Zap, count: 45, description: 'Automated email sequences' },
  { name: 'Social Media', icon: Settings, count: 32, description: 'Social posting workflows' },
  { name: 'Lead Management', icon: Repeat, count: 28, description: 'Lead nurturing systems' },
  { name: 'Task Automation', icon: Clock, count: 56, description: 'Repetitive task automation' },
];

export function Workflows() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const workflowProducts = allProducts.filter(p => p.subcategory === 'workflows' || p.subcategory === 'automation');

  return (
    <>
      <SEO 
        title="Workflows & Automation"
        description="Automate your business with pre-built workflows. Email, social media, lead management, and more."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <Link to="/automate" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Automate
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-dark to-dark" />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full mb-4">
                Workflows & Automation
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Automate Your{' '}
                <span className="text-coral">Business</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Save hours every week with pre-built automation workflows. 
                Easy to set up, powerful results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Workflow Types */}
        <section className="py-16 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">Workflow Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                      {type.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                    <p className="text-coral text-sm">{type.count} workflows</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products */}
        <section ref={ref} className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Popular Workflows</h2>
                <p className="text-gray-400">Ready to use automation templates</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="border-border text-white">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workflowProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">How to Set Up Workflows</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Get started with automation in minutes
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Choose a Workflow', desc: 'Browse and select a pre-built template' },
                { step: '2', title: 'Connect Apps', desc: 'Link your tools (Zapier, Make, etc.)' },
                { step: '3', title: 'Activate', desc: 'Turn on automation and watch it work' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-coral text-2xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
