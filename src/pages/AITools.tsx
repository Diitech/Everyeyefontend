import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, MessageSquare, Image, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { products } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const aiCategories = [
  { name: 'ChatGPT Prompts', icon: MessageSquare, count: 45, description: 'Business, marketing, and creative prompts' },
  { name: 'AI Image Prompts', icon: Image, count: 38, description: 'Midjourney, DALL-E, and Stable Diffusion' },
  { name: 'Code Assistants', icon: Code, count: 25, description: 'Programming and development prompts' },
  { name: 'AI Workflows', icon: Zap, count: 18, description: 'Automated AI-powered processes' },
];

export function AITools() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const aiProducts = products.filter(p => p.category === 'AI Tools & Prompts');

  return (
    <>
      <SEO 
        title="AI Tools & Prompts"
        description="Supercharge your workflow with AI-powered tools and prompts. ChatGPT, Midjourney, DALL-E, and more."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
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
                AI Tools & Prompts
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Unlock AI{' '}
                <span className="text-coral">Potential</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Supercharge your workflow with expertly crafted AI prompts and tools. 
                From ChatGPT to Midjourney, get the most out of AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-coral hover:bg-coral-dark text-white">
                    Explore AI Tools
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
            <h2 className="text-2xl font-bold text-white mb-8">AI Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                    <p className="text-coral text-sm">{cat.count} resources</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured AI Tools */}
        <section ref={ref} className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Popular AI Resources</h2>
                <p className="text-gray-400">Top-rated by our community</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="border-border text-white">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {aiProducts.slice(0, 8).map((product, index) => (
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

        {/* Why AI */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Why Use AI Prompts?</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Get consistent, high-quality results from AI tools with expertly crafted prompts
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Save Time', desc: 'Get better results faster with proven prompts' },
                { title: 'Consistent Output', desc: 'Achieve reliable results every time' },
                { title: 'Learn Best Practices', desc: 'Understand how to craft effective prompts' },
                { title: 'Boost Productivity', desc: 'Automate repetitive tasks with AI' },
                { title: 'Stay Competitive', desc: 'Leverage AI to stay ahead in your field' },
                { title: 'Endless Possibilities', desc: 'Unlock new creative and business opportunities' },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-6 h-6 text-purple-400" />
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
