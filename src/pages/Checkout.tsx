import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CreditCard, Lock, Check, Mail, Loader2,
  Tag, X, ShieldCheck, RefreshCw, Zap, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEO } from '@/components/SEO';
import { useCart } from '@/hooks/useCart';
import { createCheckoutSession, validateDiscount } from '@/api/orders';
import { getSavedUser } from '@/api/auth';

export function Checkout() {
  const { items, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const savedUser = getSavedUser();
  const [email, setEmail] = useState(savedUser?.email || '');
  const [name, setName] = useState(savedUser?.name || '');
  const [discountCode, setDiscountCode] = useState('');
  const [discountInput, setDiscountInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalTotal = totalPrice - discountAmount;

  if (items.length === 0) {
    return (
      <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-dark-100 flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-6">Add some products to proceed with checkout.</p>
          <Link to="/products">
            <Button className="bg-coral hover:bg-coral-dark text-white">Browse Products</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) return;
    setDiscountLoading(true);
    setDiscountError('');
    try {
      const result = await validateDiscount(discountInput.trim());
      setDiscountPercent(result.percent);
      setDiscountCode(result.code);
      setDiscountInput('');
    } catch (err) {
      setDiscountError(err instanceof Error ? err.message : 'Invalid code');
      setDiscountPercent(0);
      setDiscountCode('');
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    setDiscountError('');
    setDiscountInput('');
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      const stripeItems = items.map(item => ({
        id: item.product.id,
        title: item.product.title,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
        images: item.product.images
      }));
      const { url } = await createCheckoutSession(stripeItems, email, discountCode || undefined);
      window.location.href = url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO title="Checkout" description="Complete your purchase securely." noindex />
      <main className="pt-[72px] min-h-screen bg-dark">
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-4 flex items-center justify-between">
            <Link to="/products" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />Continue Shopping
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3 text-green-400" />
              <span className="text-green-400 font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-12">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left - Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Complete Your Order</h1>
                <p className="text-gray-400">You'll be redirected to Stripe's secure payment page</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleCheckout} className="space-y-5">
                {/* Contact Info */}
                <div className="bg-dark-100 rounded-2xl p-6 border border-border">
                  <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-coral" />Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300 text-sm">Full Name</Label>
                      <Input id="name" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required className="bg-dark border-border text-white placeholder:text-gray-500 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300 text-sm">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="bg-dark border-border text-white placeholder:text-gray-500 mt-1" />
                      <p className="text-xs text-gray-500 mt-1">Your receipt and download link will be sent here</p>
                    </div>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="bg-dark-100 rounded-2xl p-6 border border-border">
                  <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-coral" />Discount Code
                  </h2>
                  {discountCode ? (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-mono font-bold">{discountCode}</span>
                        <span className="text-green-400 text-sm">— {discountPercent}% off applied!</span>
                      </div>
                      <button type="button" onClick={handleRemoveDiscount} className="text-gray-400 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={discountInput}
                          onChange={e => setDiscountInput(e.target.value.toUpperCase())}
                          placeholder="Enter discount code"
                          className="bg-dark border-border text-white placeholder:text-gray-500 font-mono"
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleApplyDiscount())}
                        />
                        <Button type="button" onClick={handleApplyDiscount} disabled={discountLoading || !discountInput} variant="outline" className="border-coral text-coral hover:bg-coral/10 whitespace-nowrap">
                          {discountLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                        </Button>
                      </div>
                      {discountError && <p className="text-red-400 text-xs">{discountError}</p>}
                      <p className="text-gray-500 text-xs">Try: SAVE10, SAVE20, or WELCOME</p>
                    </div>
                  )}
                </div>

                {/* Payment Info */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm mb-1">Powered by Stripe</p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      You'll be redirected to Stripe's secure checkout page where you can pay with credit card, debit card, Apple Pay, or Google Pay. We never store your payment details.
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      {['VISA', 'MC', 'AMEX', 'APPLE PAY', 'GOOGLE PAY'].map(m => (
                        <span key={m} className="text-xs bg-dark border border-border rounded px-2 py-0.5 text-gray-400 font-mono">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${agreeTerms ? 'bg-coral border-coral' : 'border-border bg-dark'}`}
                  >
                    {agreeTerms && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-gray-400 text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-coral hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-coral hover:underline">Privacy Policy</Link>.
                    I understand this is a digital product with instant delivery.
                  </p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isProcessing || !email || !name}
                  className="w-full bg-coral hover:bg-coral-dark text-white py-6 text-base font-semibold rounded-xl"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Redirecting to Stripe...</>
                  ) : (
                    <><Lock className="w-5 h-5 mr-2" />Pay ${finalTotal.toFixed(2)} Securely</>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" />SSL Encrypted</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />Stripe Secured</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" />30-Day Refund</span>
                </div>
              </form>
            </motion.div>

            {/* Right - Order Summary */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="bg-dark-100 rounded-2xl border border-border overflow-hidden sticky top-24">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-white">Order Summary</h2>
                  <p className="text-gray-400 text-sm mt-1">{items.length} item{items.length > 1 ? 's' : ''}</p>
                </div>

                {/* Items */}
                <div className="p-6 space-y-4 border-b border-border">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-dark flex-shrink-0">
                        <img
                          src={item.product.images?.[0] ?? item.product.image ?? '/placeholder.jpg'}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm line-clamp-2">{item.product.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Digital</span>
                        </div>
                      </div>
                      <p className="text-coral font-semibold text-sm whitespace-nowrap">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="p-6 space-y-3 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400 flex items-center gap-1">
                        <Tag className="w-3 h-3" />Discount ({discountPercent}%)
                      </span>
                      <span className="text-green-400">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-gray-400">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Delivery</span>
                    <span className="text-green-400 font-medium">FREE (Instant)</span>
                  </div>
                </div>

                <div className="p-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-lg">Total</span>
                    <div className="text-right">
                      {discountPercent > 0 && (
                        <p className="text-gray-500 text-sm line-through">${totalPrice.toFixed(2)}</p>
                      )}
                      <p className="text-2xl font-bold text-coral">${finalTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 text-center mb-5">
                    {[
                      { icon: Zap, label: 'Instant Download', color: 'text-amber-400', bg: 'bg-amber-500/20' },
                      { icon: Lock, label: 'Secure Payment', color: 'text-coral', bg: 'bg-coral/20' },
                      { icon: RefreshCw, label: '30-Day Refund', color: 'text-green-400', bg: 'bg-green-500/20' },
                    ].map(({ icon: Icon, label, color, bg }) => (
                      <div key={label} className="flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <p className="text-xs text-gray-400 leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-dark rounded-xl p-4 flex items-start gap-3">
                    <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-xs font-medium">What happens after payment?</p>
                      <ul className="text-gray-400 text-xs mt-1 space-y-1">
                        <li>✅ Instant access to your downloads</li>
                        <li>✅ Confirmation email sent immediately</li>
                        <li>✅ Lifetime access to updates</li>
                        <li>✅ Access via your account dashboard</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}