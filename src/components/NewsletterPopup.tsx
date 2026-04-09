import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Gift, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const hasInteracted = localStorage.getItem('newsletter-interacted');
    if (hasInteracted) return;

    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate submission
    setIsSubmitted(true);
    localStorage.setItem('newsletter-interacted', 'subscribed');
    
    // Hide after showing success
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('newsletter-interacted', 'dismissed');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[420px] z-50"
        >
          <div className="bg-dark-100 border border-border rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">You&apos;re in!</h3>
                <p className="text-gray-400">Check your inbox for your 20% off code.</p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-coral/20 flex items-center justify-center">
                      <Gift className="w-4 h-4 text-coral" />
                    </div>
                    <span className="text-sm font-medium text-coral">Special Offer</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Get 20% Off Your First Order
                  </h3>
                  <p className="text-sm text-gray-400">
                    Subscribe to our newsletter and receive exclusive deals, free resources, and early access to new products.
                  </p>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Zap className="w-3.5 h-3.5 text-coral" />
                    <span>Weekly deals</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Gift className="w-3.5 h-3.5 text-coral" />
                    <span>Free resources</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-coral" />
                    <span>Early access</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-dark border-border text-white placeholder:text-gray-500 focus:border-coral focus:ring-coral/20"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-coral hover:bg-coral-dark text-white px-4"
                  >
                    Get 20% Off
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
