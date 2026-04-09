import { motion } from 'framer-motion';
import { Download, Infinity, BadgeCheck, Headphones, Users, Package, Star, Clock } from 'lucide-react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

const features = [
  {
    icon: Download,
    title: 'Instant Download',
    description: 'Get immediate access to your purchases. No waiting, no delays—start using your assets right away.'
  },
  {
    icon: Infinity,
    title: 'Lifetime Access',
    description: 'Buy once, keep forever. All purchases include lifetime access with free updates when available.'
  },
  {
    icon: BadgeCheck,
    title: 'Commercial License',
    description: 'Use our assets in client projects, products, and commercial work without additional fees.'
  },
  {
    icon: Headphones,
    title: 'Premium Support',
    description: 'Get help when you need it. Our team responds to all inquiries within 24 hours.'
  }
];

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Happy Customers' },
  { icon: Package, value: 500, suffix: '+', label: 'Digital Products' },
  { icon: Star, value: 4.9, suffix: '', label: 'Average Rating' },
  { icon: Clock, value: 24, suffix: 'h', label: 'Support Response' }
];

function StatCounter({ icon: Icon, value, suffix, label }: { 
  icon: React.ElementType; 
  value: number; 
  suffix: string; 
  label: string;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.5 });
  const { count, startAnimation } = useCountUp(value, 2000);

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  const displayValue = value % 1 !== 0 
    ? count.toFixed(1) 
    : count.toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <div className="w-12 h-12 rounded-xl bg-dark flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-coral" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">
        {displayValue}{suffix}
      </p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

export function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

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
            Why Choose Us
          </h2>
          <p className="text-coral text-lg font-medium mb-2">Why Everyshop?</p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We&apos;re committed to providing the highest quality digital assets with an exceptional customer experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="group"
              >
                <div className="h-full bg-dark rounded-2xl border border-border p-6 transition-all duration-300 hover:border-coral/50 hover:shadow-glow hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-coral" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-t border-border"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
