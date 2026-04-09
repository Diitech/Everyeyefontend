import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { SEO } from '@/components/SEO';
import { products } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const courseCategories = [
  { name: 'Design', icon: BookOpen, count: 24, description: 'UI/UX, graphic design, and branding' },
  { name: 'Development', icon: FileText, count: 32, description: 'Web, mobile, and software development' },
  { name: 'Business', icon: Award, count: 18, description: 'Marketing, sales, and entrepreneurship' },
  { name: 'Video Production', icon: Video, count: 12, description: 'Filmmaking and video editing' },
];

export function Courses() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const courseProducts = products.filter(p => p.category === 'Online Courses');

  return (
    <>
      <SEO 
        title="Online Courses"
        description="Learn from industry experts with our comprehensive online courses. Design, development, business, and more."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-dark to-dark" />
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full mb-4">
                Online Courses
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Master New{' '}
                <span className="text-coral">Skills</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Learn from industry experts with our comprehensive courses. 
                From design to development, level up your skills today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-coral hover:bg-coral-dark text-white">
                    Explore Courses
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-t border-border bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50+', label: 'Expert Instructors' },
                { value: '200+', label: 'Hours of Content' },
                { value: '15k+', label: 'Students Enrolled' },
                { value: '4.9', label: 'Average Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-coral mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">Course Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courseCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                    <p className="text-coral text-sm">{cat.count} courses</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section ref={ref} className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Popular Courses</h2>
                <p className="text-gray-400">Most enrolled this month</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="border-border text-white">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courseProducts.slice(0, 8).map((product, index) => (
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

        {/* Learning Path */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Start learning in minutes with our simple process
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Choose a Course', desc: 'Browse our library of expert-led courses' },
                { step: '2', title: 'Purchase & Access', desc: 'Instant lifetime access after purchase' },
                { step: '3', title: 'Learn at Your Pace', desc: 'Watch videos and complete exercises' },
                { step: '4', title: 'Get Certified', desc: 'Earn a certificate upon completion' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-coral text-2xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
