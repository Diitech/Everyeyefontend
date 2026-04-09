import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layout, 
  GraduationCap, 
  Briefcase, 
  Palette, 
  Sparkles, 
  Crown,
  ArrowRight
} from 'lucide-react';
import { categories } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  GraduationCap,
  Briefcase,
  Palette,
  Sparkles,
  Crown
};

export function Categories() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-dark-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore Our Collections — Discover premium digital assets across six curated categories, 
            designed to help you create, learn, and grow.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Layout;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <Link
                  to={`/${category.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full bg-dark rounded-2xl border border-border p-6 transition-all duration-300 hover:border-coral/50 hover:shadow-glow hover:-translate-y-2 overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-dark-200 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-7 h-7 text-coral" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">
                            <span className="text-white font-medium">{category.productCount}</span> products
                          </span>
                          <span className="text-gray-500">
                            {category.priceRange}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-coral transition-all duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
