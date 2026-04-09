import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { products, categories, getDeals, getNewArrivals } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CategoryPageProps {
  categorySlug?: string;
  title?: string;
  description?: string;
  filter?: 'deals' | 'new' | 'all';
}

export function CategoryPage({ 
  categorySlug: propCategorySlug, 
  title: propTitle, 
  description: propDescription,
  filter = 'all'
}: CategoryPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const categorySlug = propCategorySlug || slug;
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const category = categorySlug ? categories.find(c => c.slug === categorySlug) : null;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filter === 'deals') {
      return getDeals();
    }

    if (filter === 'new') {
      return getNewArrivals();
    }

    if (category) {
      result = result.filter(p => p.category === category.name);
    }

    return result;
  }, [category, filter]);

  const title = propTitle || category?.name || 'Products';
  const description = propDescription || category?.description || 'Browse our collection';

  // Get hero content based on page type
  const getHeroContent = () => {
    switch (filter) {
      case 'deals':
        return {
          badge: 'Limited Time',
          badgeColor: 'bg-red-500/20 text-red-400',
          title: 'Hot Deals',
          highlight: 'Up to 50% Off',
          description: 'Don\'t miss out on these incredible savings. Limited time offers on our best products.',
          gradient: 'from-red-500/10 via-dark to-dark'
        };
      case 'new':
        return {
          badge: 'Just Dropped',
          badgeColor: 'bg-green-500/20 text-green-400',
          title: 'New Arrivals',
          highlight: 'Fresh Products',
          description: 'Discover our latest releases. Be the first to get your hands on these new additions.',
          gradient: 'from-green-500/10 via-dark to-dark'
        };
      default:
        return {
          badge: category?.name || 'Category',
          badgeColor: 'bg-coral/20 text-coral',
          title: category?.name || 'Products',
          highlight: 'Premium Collection',
          description: category?.description || 'Browse our curated collection of digital products.',
          gradient: 'from-coral/10 via-dark to-dark'
        };
    }
  };

  const hero = getHeroContent();

  return (
    <>
      <SEO 
        title={title}
        description={description}
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero Section */}
        <section className={`relative py-20 overflow-hidden bg-gradient-to-br ${hero.gradient}`}>
          <div className="absolute inset-0 bg-dark/50" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${hero.badgeColor}`}>
                {hero.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                {hero.title}{' '}
                <span className="text-coral">{hero.highlight}</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-coral hover:bg-coral-dark text-white">
                    Browse All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section ref={ref} className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {filter === 'deals' ? 'Best Deals' : 
                   filter === 'new' ? 'New Releases' : 
                   'All Products'}
                </h2>
                <p className="text-gray-400">
                  {filteredProducts.length} products available
                </p>
              </div>

              {/* Sort Dropdown */}
              <select className="bg-dark-100 border border-border text-white px-4 py-2 rounded-lg text-sm focus:border-coral focus:outline-none">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </motion.div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Check back soon for new additions!</p>
              </div>
            )}
          </div>
        </section>

        {/* Category Cards (for main category pages) */}
        {!filter && !category && (
          <section className="py-16 border-t border-border bg-dark-100">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
              <h2 className="text-2xl font-bold text-white mb-8">Browse Categories</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${cat.slug}`}
                      className="block bg-dark rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group"
                    >
                      <h3 className="text-lg font-semibold text-white group-hover:text-coral transition-colors mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{cat.productCount} products</span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-coral transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
