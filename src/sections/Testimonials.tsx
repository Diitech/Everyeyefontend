import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';
import { testimonials } from '@/data';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

function Counter({ value }: { value: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>({ threshold: 0.5 });
  const { count, startAnimation } = useCountUp(value, 2000);

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-coral fill-coral" />
            <span className="text-coral font-medium">Loved by</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <Counter value={8000} />+ Creators
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust Everyshop for their digital asset needs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group"
            >
              <div className="h-full bg-dark-100 rounded-2xl border border-border p-6 transition-all duration-300 hover:border-border-secondary hover:-translate-y-1">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-coral/30" />
                </div>

                {/* Quote Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.author}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
