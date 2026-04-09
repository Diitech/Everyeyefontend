import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Grid3X3, List, SlidersHorizontal, X, ChevronDown,
  Search, Star, Tag, TrendingUp, Loader2, ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { categories } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getProducts } from '@/api/products';
import type { Product } from '@/types';

type SortOption = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';

const PRICE_MAX = 500;
const TAGS = ['Bestseller', 'New', 'Featured', 'AI Tools', 'Templates', 'Courses'];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [predictiveResults, setPredictiveResults] = useState<Product[]>([]);
  const [showPredictive, setShowPredictive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, PRICE_MAX]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // Predictive search
  useEffect(() => {
    if (searchInput.length < 2) {
      setPredictiveResults([]);
      setShowPredictive(false);
      return;
    }
    const query = searchInput.toLowerCase();
    const results = products
      .filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
      .slice(0, 6);
    setPredictiveResults(results);
    setShowPredictive(true);
  }, [searchInput, products]);

  // Close predictive on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowPredictive(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Sync URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (sortBy !== 'popular') params.sort = sortBy;
    if (minRating) params.rating = String(minRating);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, sortBy, minRating, setSearchParams]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSearchInput(query);
    setShowPredictive(false);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      const category = categories.find(c => c.slug === selectedCategory);
      if (category) result = result.filter(p => p.category === category.name);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (minRating) result = result.filter(p => p.rating >= minRating);

    if (selectedTags.length > 0) {
      result = result.filter(p =>
        selectedTags.some(tag =>
          p.badge === tag.toLowerCase() ||
          p.title.toLowerCase().includes(tag.toLowerCase()) ||
          p.category.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, minRating, selectedTags, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSearchInput('');
    setSelectedCategory(null);
    setPriceRange([0, PRICE_MAX]);
    setMinRating(null);
    setSelectedTags([]);
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || minRating ||
    selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < PRICE_MAX;

  const activeFilterCount = [
    searchQuery, selectedCategory, minRating,
    ...selectedTags,
    priceRange[0] > 0 || priceRange[1] < PRICE_MAX ? 'price' : null
  ].filter(Boolean).length;

  const sortLabels: Record<SortOption, string> = {
    popular: 'Most Popular',
    newest: 'Newest First',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    rating: 'Highest Rated',
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-coral" />Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-coral text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            All Categories
            <span className="ml-auto float-right text-xs opacity-60">{products.length}</span>
          </button>
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.name).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-coral text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {cat.name}
                <span className="ml-auto float-right text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-coral" />Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}{priceRange[1] >= PRICE_MAX ? '+' : ''}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={10}
              value={priceRange[0]}
              onChange={e => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 10), priceRange[1]])}
              className="w-full accent-coral h-1"
            />
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={10}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 10)])}
              className="w-full accent-coral h-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[[0, 50], [50, 100], [100, 200], [200, PRICE_MAX]].map(([min, max]) => (
              <button
                key={`${min}-${max}`}
                onClick={() => setPriceRange([min, max])}
                className={`text-xs px-2 py-1.5 rounded-lg border transition-colors ${
                  priceRange[0] === min && priceRange[1] === max
                    ? 'bg-coral border-coral text-white'
                    : 'border-border text-gray-400 hover:text-white hover:border-gray-400'
                }`}
              >
                ${min}–${max === PRICE_MAX ? '500+' : max}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-coral" />Minimum Rating
        </h3>
        <div className="space-y-1">
          {[null, 4.5, 4, 3].map(rating => (
            <button
              key={String(rating)}
              onClick={() => setMinRating(rating)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                minRating === rating ? 'bg-coral text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {rating === null ? (
                'All Ratings'
              ) : (
                <>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  {rating}+ Stars
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4 text-coral" />Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-coral border-coral text-white'
                  : 'border-border text-gray-400 hover:text-white hover:border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline" className="w-full border-border text-white hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30">
          <X className="w-4 h-4 mr-2" />Clear All Filters
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-coral animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title="Browse All Products"
        description="Shop hundreds of premium digital products. Templates, courses, AI prompts, business systems and more. Instant download after purchase."
        keywords="buy digital products, premium templates, design assets, online courses, AI tools"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' }
        ]}
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Header */}
        <section className="py-10 bg-dark-100 border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">All Products</h1>
              <p className="text-gray-400">Browse {products.length}+ premium digital products</p>
            </motion.div>
          </div>
        </section>

        <section ref={ref} className="py-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              {/* Search */}
              <div ref={searchRef} className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch(searchInput)}
                  onFocus={() => searchInput.length >= 2 && setShowPredictive(true)}
                  className="w-full pl-10 pr-10 bg-dark-100 border-border text-white placeholder:text-gray-500"
                />
                {searchInput && (
                  <button onClick={() => { setSearchInput(''); setSearchQuery(''); setShowPredictive(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Predictive Results */}
                <AnimatePresence>
                  {showPredictive && predictiveResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-dark-100 border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        <p className="text-gray-500 text-xs px-3 py-1 mb-1">Quick Results</p>
                        {predictiveResults.map(product => (
                          <button
                            key={product.id}
                            onClick={() => handleSearch(product.title)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark flex-shrink-0">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{product.title}</p>
                              <p className="text-gray-400 text-xs">{product.category} · ${product.price}</p>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400 text-xs flex-shrink-0">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {product.rating}
                            </div>
                          </button>
                        ))}
                        <button
                          onClick={() => handleSearch(searchInput)}
                          className="w-full text-center px-3 py-2 text-coral text-sm hover:bg-coral/10 rounded-lg transition-colors mt-1"
                        >
                          See all results for "{searchInput}"
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-100 border border-border text-white rounded-lg text-sm hover:border-coral transition-colors"
                  >
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    {sortLabels[sortBy]}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showSortDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full right-0 mt-2 w-52 bg-dark-100 border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        {(Object.keys(sortLabels) as SortOption[]).map(option => (
                          <button
                            key={option}
                            onClick={() => { setSortBy(option); setShowSortDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === option ? 'bg-coral text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                          >
                            {sortLabels[option]}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View mode */}
                <div className="flex bg-dark-100 border border-border rounded-lg p-1">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-coral text-white' : 'text-gray-400 hover:text-white'}`}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-coral text-white' : 'text-gray-400 hover:text-white'}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`lg:hidden border-border text-white relative ${activeFilterCount > 0 ? 'border-coral' : ''}`}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-coral rounded-full text-xs flex items-center justify-center text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-red-400">
                    <X className="w-4 h-4 mr-1" />Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Active filter chips */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-5"
                >
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-coral/20 text-coral text-sm rounded-full">
                      Search: "{searchQuery}"
                      <button onClick={() => { setSearchQuery(''); setSearchInput(''); }}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-coral/20 text-coral text-sm rounded-full">
                      {categories.find(c => c.slug === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {minRating && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-coral/20 text-coral text-sm rounded-full">
                      {minRating}+ Stars
                      <button onClick={() => setMinRating(null)}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < PRICE_MAX) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-coral/20 text-coral text-sm rounded-full">
                      ${priceRange[0]}–${priceRange[1]}
                      <button onClick={() => setPriceRange([0, PRICE_MAX])}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {selectedTags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-coral/20 text-coral text-sm rounded-full">
                      {tag}
                      <button onClick={() => toggleTag(tag)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-8">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-dark-100 rounded-2xl border border-border p-5 sticky top-24">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white font-semibold">Filters</h2>
                    {activeFilterCount > 0 && (
                      <span className="w-5 h-5 bg-coral rounded-full text-xs flex items-center justify-center text-white">{activeFilterCount}</span>
                    )}
                  </div>
                  <FilterPanel />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">
                    <span className="text-white font-medium">{filteredProducts.length}</span> products found
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className={`grid gap-5 ${
                    viewMode === 'grid'
                      ? 'sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}>
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
                      >
                        <ProductCard product={product} index={index} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-dark-100 rounded-2xl border border-border">
                    <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                    <p className="text-gray-400 mb-6">Try adjusting your filters or search query.</p>
                    <Button onClick={clearFilters} className="bg-coral hover:bg-coral-dark text-white">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-dark-100 border-r border-border z-50 overflow-y-auto lg:hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-bold text-lg">Filters</h2>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white p-1">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterPanel />
                  <Button onClick={() => setShowFilters(false)} className="w-full mt-6 bg-coral hover:bg-coral-dark text-white">
                    Show {filteredProducts.length} Results
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}