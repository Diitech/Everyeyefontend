import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Star, Shield, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { getBestsellers } from '@/data';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const featuredProduct = getBestsellers()[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="relative min-h-screen pt-[72px] overflow-hidden bg-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-100" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 px-3 py-1.5 bg-coral/10 text-coral border-coral/20 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-coral mr-2 animate-pulse" />
                Premium Digital Marketplace
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Find your next{' '}
              <span className="text-coral">creative edge</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-8"
            >
              Templates, courses, and tools—curated for makers. Instant downloads with commercial license.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search templates, courses, icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 bg-dark-100 border-border text-white placeholder:text-gray-500 text-base focus:border-coral focus:ring-coral/20 rounded-xl"
                  />
                </div>
                <Button className="bg-coral hover:bg-coral-dark text-white px-6 py-6 rounded-xl">
                  Search
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Link to="/products">
                <Button className="bg-coral hover:bg-coral-dark text-white px-6 py-6 text-base font-medium group rounded-xl">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/create">
                <Button
                  variant="outline"
                  className="border-border text-white hover:bg-white/5 px-6 py-6 text-base rounded-xl"
                >
                  Explore Categories
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">50k+</p>
                  <p className="text-xs text-gray-400">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">4.9</p>
                  <p className="text-xs text-gray-400">Average Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">30-Day</p>
                  <p className="text-xs text-gray-400">Money-Back</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Product */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-6">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"
                alt="Creative workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            </div>

            {/* Featured Product Card */}
            {featuredProduct && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-8 left-4 right-4 lg:left-8 lg:right-8"
              >
                <div className="bg-dark-100 border border-border rounded-2xl p-5 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-dark-200 flex-shrink-0">
                      <img
                        src={featuredProduct.image}
                        alt={featuredProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge className="mb-2 bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                        BESTSELLER
                      </Badge>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Shop Bestsellers
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        Instant downloads. Commercial license. Premium quality.
                      </p>
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
                    </div>
                  </div>

                  {/* Mini Product Card */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-200">
                          <img
                            src={featuredProduct.image}
                            alt={featuredProduct.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-coral font-medium">FEATURED</p>
                          <p className="text-sm font-medium text-white">{featuredProduct.title}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-gray-400">
                              {featuredProduct.rating} ({featuredProduct.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-coral">
                          ${featuredProduct.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(featuredProduct)}
                          className="bg-coral hover:bg-coral-dark text-white"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
