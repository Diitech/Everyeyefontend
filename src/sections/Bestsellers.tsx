import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/api/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Product } from '@/types';

type FilterTab = 'bestseller' | 'featured' | 'sale';

export function Bestsellers() {
  const [activeTab, setActiveTab] = useState<FilterTab>('bestseller');
  const [products, setProducts] = useState<Product[]>([]);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = products
    .filter(p => {
      if (activeTab === 'bestseller') return p.badge === 'bestseller';
      if (activeTab === 'featured') return p.badge === 'featured';
      if (activeTab === 'sale') return p.discount && p.discount > 0;
      return true;
    })
    .slice(0, 4);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'bestseller', label: 'Bestseller' },
    { id: 'featured', label: 'Featured' },
    { id: 'sale', label: 'Save 50%' }
  ];

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Most Purchased</h2>
              <p className="text-sm text-gray-400">Top Buy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-coral text-white'
                      : 'bg-dark-100 text-gray-400 hover:text-white hover:bg-dark-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm" className="border-border text-white hover:bg-white/5 group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 mb-8"
        >
          Instant downloads. Commercial license. Premium quality.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}