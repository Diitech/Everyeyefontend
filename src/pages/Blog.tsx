import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/SEO';
import { blogPosts } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = ['All', 'Business', 'Design', 'Development', 'AI & Tech', 'Marketing'];

export function Blog() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <>
      <SEO 
        title="Blog"
        description="Insights, tips, and resources for creators and entrepreneurs. Learn about design, development, business, and more."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-coral/10 via-dark to-dark">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Everytech <span className="text-coral">Blog</span>
              </h1>
              <p className="text-lg text-gray-400">
                Insights, tips, and resources to help you create, learn, and grow
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === 'All'
                      ? 'bg-coral text-white'
                      : 'bg-dark-100 text-gray-400 hover:text-white border border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
            {blogPosts[0] && (
              <Link to={`/blog/${blogPosts[0].slug}`} className="block group">
                <div className="grid lg:grid-cols-2 gap-8 bg-dark-100 rounded-2xl overflow-hidden border border-border hover:border-coral/50 transition-colors">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-coral/20 text-coral border-coral/30">
                      {blogPosts[0].category}
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-coral transition-colors">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-gray-400 mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blogPosts[0].author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blogPosts[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* All Posts */}
        <section ref={ref} className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
              <Button variant="outline" className="border-border text-white">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block group h-full">
                    <div className="h-full bg-dark rounded-xl overflow-hidden border border-border hover:border-coral/50 transition-colors">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <Badge className="mb-3 bg-coral/20 text-coral border-coral/30 text-xs">
                          {post.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-gradient-to-r from-coral/20 to-coral/5 rounded-2xl p-8 md:p-12 text-center border border-coral/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                Get the latest articles, tips, and exclusive deals delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-dark border border-border rounded-lg text-white placeholder:text-gray-500"
                />
                <Button className="bg-coral hover:bg-coral-dark text-white px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
