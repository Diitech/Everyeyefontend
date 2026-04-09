import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout, ArrowRight, Palette, FileText, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { products } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const templateCategories = [
  { name: 'Website Templates', icon: Monitor, count: 45, description: 'Landing pages, portfolios, and business sites' },
  { name: 'Dashboard UI Kits', icon: Layout, count: 32, description: 'Admin panels and analytics dashboards' },
  { name: 'Mobile App Templates', icon: Smartphone, count: 28, description: 'iOS and Android app designs' },
  { name: 'Presentation Decks', icon: FileText, count: 56, description: 'Pitch decks and slide templates' },
  { name: 'Design Systems', icon: Palette, count: 18, description: 'Complete component libraries' },
];

export function Templates() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const templateProducts = products.filter(p => p.category === 'Templates & Design');

  return (
    <>
      <SEO 
        title="Templates & Design"
        description="Premium templates and design assets for your creative projects. Website templates, UI kits, presentations, and more."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-dark to-dark" />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-coral/20 text-coral text-sm font-medium rounded-full mb-4">
                Templates & Design
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Design Assets That{' '}
                <span className="text-coral">Convert</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Professional templates and design systems crafted by industry experts. 
                From landing pages to complete design systems, find everything you need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-coral hover:bg-coral-dark text-white">
                    Browse All Templates
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">Template Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                    <p className="text-coral text-sm">{cat.count} templates</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Templates */}
        <section ref={ref} className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Featured Templates</h2>
                <p className="text-gray-400">Hand-picked by our team</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="border-border text-white">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templateProducts.slice(0, 8).map((product, index) => (
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

        {/* Features */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Templates?</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Every template is crafted with attention to detail and designed for real-world use.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Pixel Perfect', desc: 'Every element is precisely designed for a polished look' },
                { title: 'Fully Responsive', desc: 'Looks great on desktop, tablet, and mobile devices' },
                { title: 'Easy to Customize', desc: 'Well-organized layers and components for quick edits' },
                { title: 'Commercial License', desc: 'Use in unlimited personal and client projects' },
                { title: 'Regular Updates', desc: 'Get free updates when we improve our templates' },
                { title: 'Premium Support', desc: 'Our team is here to help within 24 hours' },
              ].map((feature, index) => (
                <div key={feature.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-coral font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
