import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pricingPlans } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Pricing() {
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-coral" />
            <span className="text-coral font-medium">Membership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Get unlimited access to our entire library of premium digital assets.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="relative"
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-coral text-white border-0 px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? 'bg-dark border-coral/50 shadow-glow'
                  : 'bg-dark border-border hover:border-border-secondary'
              }`}>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  {plan.price === 0 && (
                    <span className="text-sm text-gray-500">forever free</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => {
                    const isAvailable = plan.price > 0 || i < 3;
                    return (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isAvailable ? 'bg-coral/20' : 'bg-gray-700'
                        }`}>
                          <Check className={`w-3 h-3 ${isAvailable ? 'text-coral' : 'text-gray-500'}`} />
                        </div>
                        <span className={`text-sm ${isAvailable ? 'text-gray-300' : 'text-gray-500'}`}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-coral hover:bg-coral-dark text-white'
                      : 'bg-dark-200 hover:bg-dark-300 text-white border border-border'
                  }`}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
