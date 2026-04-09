import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Blog() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-coral" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">From the Blog</h2>
              <p className="text-sm text-gray-400">Latest Insights</p>
            </div>
          </div>

          <Link to="/blog">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-white hover:bg-white/5 group"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full bg-dark-100 rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-border-secondary hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-coral/20 text-coral border-coral/30 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <span className="text-sm text-coral font-medium group-hover:underline">
                        Read More
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
