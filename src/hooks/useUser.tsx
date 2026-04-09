import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  orderDate: string;
  status: 'completed' | 'pending' | 'refunded';
  downloadUrl?: string;
  canRefund: boolean;
  refundDeadline: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  orders: Order[];
  downloads: string[];
  wishlist: string[];
  membership?: {
    type: 'starter' | 'pro' | 'team';
    expiresAt: string;
  };
}

interface UserContextType {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestRefund: (orderId: string, reason: string) => Promise<boolean>;
  downloadProduct: (orderId: string) => Promise<string>;
  trackUserActivity: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data
const mockUser: UserData = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  joinedDate: '2025-01-15',
  orders: [
    {
      id: 'order-001',
      productId: '1',
      productName: 'Landing Page Pro Kit',
      productImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80',
      price: 149,
      orderDate: '2025-03-01',
      status: 'completed',
      downloadUrl: '#',
      canRefund: true,
      refundDeadline: '2025-03-31',
    },
    {
      id: 'order-002',
      productId: '4',
      productName: 'Design System Masterclass',
      productImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80',
      price: 497,
      orderDate: '2025-02-15',
      status: 'completed',
      downloadUrl: '#',
      canRefund: false,
      refundDeadline: '2025-03-17',
    },
    {
      id: 'order-003',
      productId: '11',
      productName: 'ChatGPT Business Pack',
      productImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80',
      price: 97,
      orderDate: '2025-03-08',
      status: 'completed',
      downloadUrl: '#',
      canRefund: true,
      refundDeadline: '2025-04-07',
    },
  ],
  downloads: ['1', '4', '11'],
  wishlist: ['2', '5', '9'],
  membership: {
    type: 'pro',
    expiresAt: '2026-03-01',
  },
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Track user activity (IP, system info)
  const trackUserActivity = useCallback(() => {
    if (!isLoggedIn) return;
    
    const trackingData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      page: window.location.pathname,
    };
    
    // Store in localStorage for demo purposes
    const existing = JSON.parse(localStorage.getItem('userActivity') || '[]');
    existing.push(trackingData);
    localStorage.setItem('userActivity', JSON.stringify(existing.slice(-100))); // Keep last 100 entries
    
    console.log('User activity tracked:', trackingData);
  }, [isLoggedIn]);

  // Track on page changes
  useEffect(() => {
    if (isLoggedIn) {
      trackUserActivity();
    }
  }, [isLoggedIn, trackUserActivity]);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    setIsLoggedIn(true);
    trackUserActivity();
  }, [trackUserActivity]);

  const loginWithGoogle = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ ...mockUser, name: 'Google User', email: 'user@gmail.com' });
    setIsLoggedIn(true);
    trackUserActivity();
  }, [trackUserActivity]);

  const loginWithGithub = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ ...mockUser, name: 'GitHub User', email: 'user@github.com' });
    setIsLoggedIn(true);
    trackUserActivity();
  }, [trackUserActivity]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ ...mockUser, name, email });
    setIsLoggedIn(true);
    trackUserActivity();
  }, [trackUserActivity]);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const requestRefund = useCallback(async (orderId: string, reason: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        orders: prev.orders.map(order =>
          order.id === orderId
            ? { ...order, status: 'refunded' as const, canRefund: false }
            : order
        ),
      };
    });
    
    return true;
  }, []);

  const downloadProduct = useCallback(async (orderId: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `https://downloads.everytech.com/${orderId}`;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        loginWithGoogle,
        loginWithGithub,
        register,
        logout,
        requestRefund,
        downloadProduct,
        trackUserActivity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
