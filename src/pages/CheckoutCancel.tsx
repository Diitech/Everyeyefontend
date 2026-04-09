import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ShoppingCart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutCancel() {
  return (
    <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto px-4"
      >
        <div className="bg-dark-100 border border-border rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-400 mb-8">
            Your payment was cancelled. Your cart items are still saved.
          </p>

          <div className="space-y-3">
            <Link to="/checkout">
              <Button className="w-full bg-coral hover:bg-coral-dark text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Return to Cart
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="w-full border-border text-white hover:bg-white/5"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
