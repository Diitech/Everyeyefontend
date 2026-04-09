import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';

interface Notification {
  id: string;
  productName: string;
  buyerName: string;
  location: string;
  timestamp: Date;
}

const mockNames = ['Alex', 'Maria', 'James', 'Emma', 'David', 'Sophie', 'Michael', 'Lisa'];
const mockLocations = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Toronto', 'Singapore'];
const mockProducts = [
  'Landing Page Pro Kit',
  'SaaS Dashboard UI Kit',
  'ChatGPT Business Pack',
  'Design System Masterclass',
  'Business Automation Suite'
];

export function PurchaseNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Show initial notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      addNotification();
    }, 5000);

    // Add new notification every 30-60 seconds
    const interval = setInterval(() => {
      const delay = Math.random() * 30000 + 30000; // 30-60 seconds
      setTimeout(addNotification, delay);
    }, 45000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const addNotification = () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      productName: mockProducts[Math.floor(Math.random() * mockProducts.length)],
      buyerName: mockNames[Math.floor(Math.random() * mockNames.length)],
      location: mockLocations[Math.floor(Math.random() * mockLocations.length)],
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <div className="bg-dark-100 border border-border rounded-xl p-4 shadow-xl max-w-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-5 h-5 text-coral" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">
                  <span className="font-medium">{notification.buyerName}</span> from{' '}
                  <span className="text-gray-400">{notification.location}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Just purchased <span className="text-coral">{notification.productName}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
