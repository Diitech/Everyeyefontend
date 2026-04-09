import { useState, useEffect } from 'react';
import { getSavedUser, clearAuth } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

export interface Order {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  status: 'completed' | 'processing' | 'refunded';
  orderDate: string;
  canRefund: boolean;
  refundDeadline: string;
  downloadUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
  joinedDate: string;
  membership?: {
    type: string;
    expiresAt: string;
  };
  orders: Order[];
}

export function useUser() {
  const navigate = useNavigate();
  const savedUser = getSavedUser();
  const isLoggedIn = !!savedUser;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
      if (!savedUser) {
        setLoading(false);
        return;
      }

    // Build user profile from saved data + mock orders
    const profile: UserProfile = {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      avatar: savedUser.avatar,
      isAdmin: savedUser.isAdmin,
      joinedDate: new Date().toISOString(),
      orders: [
        {
          id: 'ORD-1001',
          productName: 'ChatGPT Business Pack',
          productImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80',
          price: 97,
          status: 'completed',
          orderDate: new Date(Date.now() - 7 * 86400000).toISOString(),
          canRefund: true,
          refundDeadline: new Date(Date.now() + 23 * 86400000).toISOString(),
          downloadUrl: '#'
        },
        {
          id: 'ORD-1002',
          productName: 'Landing Page Pro Kit',
          productImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80',
          price: 149,
          status: 'completed',
          orderDate: new Date(Date.now() - 14 * 86400000).toISOString(),
          canRefund: false,
          refundDeadline: new Date(Date.now() - 16 * 86400000).toISOString(),
          downloadUrl: '#'
        },
        {
          id: 'ORD-1003',
          productName: 'SaaS Dashboard UI Kit',
          productImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80',
          price: 199,
          status: 'processing',
          orderDate: new Date(Date.now() - 1 * 86400000).toISOString(),
          canRefund: true,
          refundDeadline: new Date(Date.now() + 29 * 86400000).toISOString(),
        }
      ]
    };

   setUser(profile);
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    clearAuth();
    navigate('/');
    window.location.reload();
  };

 const requestRefund = async (orderId: string, reason: string): Promise<boolean> => {
    void reason; // suppress unused warning
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        orders: prev.orders.map(o =>
          o.id === orderId ? { ...o, status: 'refunded' as const, canRefund: false } : o
        )
      };
    });
    return true;
  };

  const downloadProduct = async (orderId: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `https://everytech.com/downloads/${orderId}`;
  };

  const updateProfile = async (data: { name?: string; email?: string }) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
    return true;
  };

  return {
    user,
    loading,
    isLoggedIn,
    logout,
    requestRefund,
    downloadProduct,
    updateProfile
  };
}