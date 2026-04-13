import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bot, MessageSquare, Image, Code, FileText, Play, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { allProducts } from '@/data/extendedProducts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const aiCategories = [
  { name: 'ChatGPT Prompts', icon: MessageSquare, count: 500, description: 'Business, marketing, creative prompts' },
  { name: 'Image Generation', icon: Image, count: 300, description: 'Midjourney, DALL-E prompts' },
  { name: 'Code Assistants', icon: Code, count: 200, description: 'Programming help prompts' },
  { name: 'Content Creation', icon: FileText, count: 400, description: 'Blog, social, email prompts' },
];

const howToUse = [
  {
    tool: 'ChatGPT',
    steps: [
      'Copy the prompt from our template',
      'Paste into ChatGPT',
      'Customize variables as needed',
      'Get professional results instantly',
    ],
  },
  {
    tool: 'Midjourney',
    steps: [
      'Select an image prompt',
      'Add your subject/description',
      'Adjust parameters if needed',
      'Generate stunning visuals',
    ],
  },
  {
    tool: 'DALL-E',
    steps: [
      'Choose a prompt template',
      'Customize the description',
      'Set image style preferences',
      'Create unique images',
    ],
  },
];

export function AIAutomation() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const aiProducts = allProducts.filter(p => p.category === 'AI Tools & Prompts');

  return (
    <>
      <SEO 
        title="AI Automation"
        description="Supercharge your workflow with AI-powered tools and prompts. Step-by-step guides included."
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-dark to-dark" />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-full mb-4">
                AI Automation
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Unlock AI{' '}
                <span className="text-coral">Power</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Expert-crafted prompts and AI workflows to 10x your productivity. 
                Includes step-by-step usage guides.
              </p>
            </motion.div>
          </div>
        </section>

        {/* AI Categories */}
        <section className="py-16 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">AI Tools & Prompts</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiCategories.map((cat, index) => {
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
                    <p className="text-coral text-sm">{cat.count}+ prompts</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How to Use Our AI Prompts</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {howToUse.map((tool, index) => (
                <motion.div
                  key={tool.tool}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark rounded-xl p-6 border border-border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold">{tool.tool}</h3>
                  </div>
                  <ol className="space-y-3">
                    {tool.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-coral text-xs font-medium">{stepIndex + 1}</span>
                        </span>
                        <span className="text-gray-400 text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section ref={ref} className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Popular AI Tools</h2>
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
              {aiProducts.map((product, index) => (
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

        {/* Video Tutorial CTA */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-gradient-to-r from-purple-500/20 to-coral/20 rounded-2xl p-8 md:p-12 text-center border border-purple-500/20">
              <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-coral" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Free AI Mastery Course
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                Learn how to get the most out of AI tools with our free video course. 
                Includes real examples and pro tips.
              </p>
              <Button className="bg-coral hover:bg-coral-dark text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Learning Free
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
