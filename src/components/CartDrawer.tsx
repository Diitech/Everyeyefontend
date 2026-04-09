import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-100 border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-coral" />
                <h2 className="text-lg font-semibold text-white">Your Cart</h2>
                <span className="px-2.5 py-0.5 bg-coral/20 text-coral text-sm font-medium rounded-full">
                  {totalItems}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-dark-200 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 mb-6">Looks like you haven&apos;t added anything yet.</p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-coral hover:bg-coral-dark text-white"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-dark rounded-xl border border-border"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-200 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-medium text-white hover:text-coral transition-colors line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">{item.product.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-coral font-semibold">${item.product.price}</span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-dark-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-300 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-dark-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-300 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-dark-100">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-xl font-bold text-coral">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-coral hover:bg-coral-dark text-white h-12 text-base font-medium group">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
