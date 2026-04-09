import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/api/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Product } from '@/types';

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const filtered = data.filter(p => p.badge === 'new').slice(0, 7);
      setNewProducts(filtered);
    });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={ref} className="py-24 bg-dark-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Just Launched</h2>
              <p className="text-sm text-gray-400">New arrivals this week</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-lg bg-dark border border-border flex items-center justify-center text-gray-400 hover:text-white hover:border-coral transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-lg bg-dark border border-border flex items-center justify-center text-gray-400 hover:text-white hover:border-coral transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm" className="border-border text-white hover:bg-white/5 group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
            >
              <ProductCard product={product} variant="compact" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}