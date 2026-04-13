import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-6"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <motion.path
              d="M10 20 L17 27 L30 13"
              stroke="#FF6B47"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-3">Payment successful!</h1>
          <p className="text-gray-400 mb-2 leading-relaxed">
            Thank you for purchasing <span className="text-coral font-medium">Everyshop</span>.
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            You will receive an email shortly with your download link and license details.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span className="w-5 h-5 rounded-full bg-coral/20 text-coral flex items-center justify-center text-xs flex-shrink-0">?</span>
              Payment confirmed
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span className="w-5 h-5 rounded-full bg-coral/20 text-coral flex items-center justify-center text-xs flex-shrink-0">?</span>
              Order received
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span className="w-5 h-5 rounded-full bg-coral/20 text-coral flex items-center justify-center text-xs flex-shrink-0">?</span>
              Confirmation email on its way
            </div>
          </div>
          <Link
            to="/"
            className="inline-block bg-coral text-white font-semibold px-8 py-3 rounded-xl hover:bg-coral/90 transition-colors"
          >
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CheckoutSuccess;
