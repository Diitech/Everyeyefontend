import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Palette, Type, Image, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { allProducts } from '@/data/extendedProducts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const subCategories = [
  { name: 'Icons', icon: Sparkles, count: 45, description: 'Vector icons for web and mobile' },
  { name: 'Fonts', icon: Type, count: 32, description: 'Premium typography collections' },
  { name: 'Illustrations', icon: Image, count: 28, description: 'Custom illustrations and graphics' },
  { name: 'Textures', icon: Layers, count: 56, description: 'Backgrounds and patterns' },
];

export function DesignAssets() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const designProducts = allProducts.filter(p => p.category === 'Creative Assets');

  return (
    <>
      <SEO 
        title="Design Assets"
        description="Premium design assets including icons, fonts, illustrations, and textures for your creative projects."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <Link to="/create" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Create
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-dark to-dark" />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-full mb-4">
                Design Assets
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Design Assets That{' '}
                <span className="text-coral">Stand Out</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Premium icons, fonts, illustrations, and textures to elevate your design projects.
                Commercial license included.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sub Categories */}
        <section className="py-16 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">Browse by Type</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                    <p className="text-coral text-sm">{cat.count} products</p>
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
                <h2 className="text-2xl font-bold text-white">Featured Design Assets</h2>
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
              {designProducts.slice(0, 8).map((product, index) => (
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
              <h2 className="text-2xl font-bold text-white mb-4">How to Use Design Assets</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Get the most out of your design assets with these tips
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Download', desc: 'Get instant access after purchase' },
                { step: '2', title: 'Import', desc: 'Add to your design tool of choice' },
                { step: '3', title: 'Create', desc: 'Use in unlimited projects' },
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
