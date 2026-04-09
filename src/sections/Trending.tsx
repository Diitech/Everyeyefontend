import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { getProducts } from '@/api/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Product } from '@/types';

export function Trending() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(data => {
      const sorted = [...data]
        .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
        .slice(0, 6);
      setTrendingProducts(sorted);
    });
  }, []);

  const featuredProduct = trendingProducts[activeIndex];

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-coral" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Hot Right Now</h2>
              <p className="text-sm text-gray-400">Trending this week</p>
            </div>
          </div>

          <Link to="/products">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-white hover:bg-white/5 group"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 mb-10 max-w-xl"
        >
          Trending This Week — Discover what creators are buying right now.
          Updated weekly based on sales and popularity.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ranked List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {trendingProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setActiveIndex(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeIndex === index
                    ? 'bg-dark-100 border-coral/50 shadow-glow'
                    : 'bg-dark border-border hover:border-border-secondary hover:bg-dark-100'
                }`}
              >
                <span className={`text-2xl font-bold w-8 ${
                  activeIndex === index ? 'text-coral' : 'text-gray-600'
                }`}>
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${
                    activeIndex === index ? 'text-white' : 'text-gray-300'
                  }`}>
                    {product.title}
                  </p>
                </div>
                {activeIndex === index && (
                  <ArrowRight className="w-5 h-5 text-coral" />
                )}
              </button>
            ))}
          </motion.div>

          {/* Featured Product Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {featuredProduct && (
              <div className="bg-dark-100 rounded-2xl border border-border overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={featuredProduct.images?.[0] ?? featuredProduct.image ?? '/placeholder.jpg'}
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-coral/20 text-coral border-coral/30">
                      #{activeIndex + 1} Trending
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-white">{featuredProduct.rating}</span>
                    <span className="text-sm text-gray-500">({featuredProduct.reviewCount} reviews)</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {featuredProduct.shortDescription ?? featuredProduct.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-coral">
                        ${featuredProduct.price}
                      </span>
                      {featuredProduct.originalPrice && (
                        <span className="text-gray-500 line-through">
                          ${featuredProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => addToCart(featuredProduct)}
                      className="bg-coral hover:bg-coral-dark text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}