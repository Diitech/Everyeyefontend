import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Package, Download, Heart, CreditCard,
  LogOut, Check, RefreshCw, Clock, Shield, Bell,
  Settings, Edit, Save, X, Gift, Lock, Loader2, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEO } from '@/components/SEO';
import { useUser } from '@/hooks/useUser';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function Account() {
  const navigate = useNavigate();
  const { user, loading, isLoggedIn, logout, requestRefund, downloadProduct, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'downloads' | 'wishlist' | 'notifications' | 'settings'>('overview');
  const [refundOrder, setRefundOrder] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [isRefunding, setIsRefunding] = useState(false);
  const [showRefundSuccess, setShowRefundSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-dark-100 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Please Sign In</h1>
          <p className="text-gray-400 mb-6">Sign in to view your account</p>
          <Button onClick={() => navigate('/')} className="bg-coral hover:bg-coral-dark text-white">Go Home</Button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-coral animate-spin" />
      </main>
    );
  }

  const handleRefund = async () => {
    if (!refundOrder || !refundReason) return;
    setIsRefunding(true);
    const success = await requestRefund(refundOrder, refundReason);
    setIsRefunding(false);
    if (success) {
      setRefundOrder(null);
      setRefundReason('');
      setShowRefundSuccess(true);
    }
  };

  const handleDownload = async (orderId: string) => {
    setDownloadingId(orderId);
    const url = await downloadProduct(orderId);
    setDownloadingId(null);
    alert(`📧 Your download link has been sent to ${user?.email}. Check your inbox!\n\nDirect link: ${url}`);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    await updateProfile({ name: editName, email: editEmail });
    setSavingProfile(false);
    setIsEditing(false);
  };

  const completedOrders = user?.orders.filter(o => o.status === 'completed') || [];
  const totalSpent = user?.orders.reduce((sum, o) => sum + o.price, 0) || 0;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'refunded': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <>
      <SEO title="My Account" description="View your orders, downloads, and account settings." />
      <main className="pt-[72px] min-h-screen bg-dark">
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Home
            </Link>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <div className="grid lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-100 rounded-2xl border border-border p-6 mb-4">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-coral">{user?.name?.charAt(0)}</span>
                    )}
                  </div>
                  <h2 className="text-white font-semibold">{user?.name}</h2>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  {user?.isAdmin && (
                    <Link to="/admin">
                      <Badge className="mt-2 bg-coral/20 text-coral cursor-pointer hover:bg-coral/30">Admin Panel →</Badge>
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-white font-bold">{user?.orders.length || 0}</p>
                    <p className="text-gray-500 text-xs">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">{completedOrders.length}</p>
                    <p className="text-gray-500 text-xs">Downloads</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">${totalSpent}</p>
                    <p className="text-gray-500 text-xs">Spent</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                        activeTab === tab.id ? 'bg-coral text-white' : 'text-gray-400 hover:text-white hover:bg-dark-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  );
                })}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">

                {/* OVERVIEW */}
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Total Orders', value: user?.orders.length || 0, icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/20' },
                        { label: 'Downloads', value: completedOrders.length, icon: Download, color: 'text-green-400', bg: 'bg-green-500/20' },
                        { label: 'Total Spent', value: `$${totalSpent}`, icon: CreditCard, color: 'text-coral', bg: 'bg-coral/20' },
                        { label: 'Wishlist', value: 0, icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/20' },
                      ].map(({ label, value, icon: Icon, color, bg }) => (
                        <div key={label} className="bg-dark-100 rounded-2xl p-4 border border-border">
                          <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                          </div>
                          <p className="text-gray-400 text-xs">{label}</p>
                          <p className="text-xl font-bold text-white">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-dark-100 rounded-2xl border border-border p-5 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Recent Orders</h3>
                        <button onClick={() => setActiveTab('orders')} className="text-coral text-sm hover:underline">View all</button>
                      </div>
                      <div className="space-y-3">
                        {user?.orders.slice(0, 3).map(order => (
                          <div key={order.id} className="flex items-center gap-4 p-3 bg-dark rounded-xl">
                            <img src={order.productImage} alt={order.productName} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{order.productName}</p>
                              <p className="text-gray-500 text-xs">{new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white text-sm">${order.price}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>{order.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <button onClick={() => setActiveTab('downloads')} className="bg-dark-100 rounded-2xl border border-border p-5 text-left hover:border-coral transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                          <Download className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-white font-medium">My Downloads</p>
                        <p className="text-gray-400 text-sm">{completedOrders.length} files available</p>
                      </button>
                      <Link to="/products">
                        <div className="bg-dark-100 rounded-2xl border border-border p-5 text-left hover:border-coral transition-colors h-full">
                          <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center mb-3">
                            <Gift className="w-5 h-5 text-coral" />
                          </div>
                          <p className="text-white font-medium">Browse Products</p>
                          <p className="text-gray-400 text-sm">Discover new digital products</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* ORDERS */}
                {activeTab === 'orders' && (
                  <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>
                    <div className="space-y-4">
                      {user?.orders.map((order) => (
                        <div key={order.id} className="bg-dark-100 rounded-2xl border border-border p-5">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <img src={order.productImage} alt={order.productName} className="w-16 h-16 rounded-xl object-cover" />
                              <div>
                                <h3 className="text-white font-semibold">{order.productName}</h3>
                                <p className="text-gray-400 text-sm">Order #{order.id}</p>
                                <p className="text-gray-400 text-sm">{new Date(order.orderDate).toLocaleDateString()}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-coral font-medium">${order.price}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>{order.status}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {order.status === 'completed' && (
                                <Button size="sm" onClick={() => handleDownload(order.id)} disabled={downloadingId === order.id} className="bg-coral hover:bg-coral-dark text-white">
                                  {downloadingId === order.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                                  Download
                                </Button>
                              )}
                              {order.canRefund && order.status !== 'refunded' && (
                                <Button size="sm" variant="outline" onClick={() => setRefundOrder(order.id)} className="border-border text-gray-400 hover:text-white">
                                  <RefreshCw className="w-4 h-4 mr-2" />Refund
                                </Button>
                              )}
                            </div>
                          </div>
                          {order.canRefund && order.status !== 'refunded' && (
                            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-gray-400">
                              <Clock className="w-4 h-4" />
                              Refund available until {new Date(order.refundDeadline).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                      {user?.orders.length === 0 && (
                        <div className="text-center py-16">
                          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-white font-medium mb-2">No orders yet</p>
                          <Link to="/products"><Button className="bg-coral hover:bg-coral-dark text-white">Browse Products</Button></Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* DOWNLOADS */}
                {activeTab === 'downloads' && (
                  <motion.div key="downloads" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">My Downloads</h2>
                    {completedOrders.length === 0 ? (
                      <div className="text-center py-16">
                        <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">No downloads yet</p>
                        <p className="text-gray-400">Complete a purchase to access your downloads</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {completedOrders.map((order) => (
                          <div key={order.id} className="bg-dark-100 rounded-2xl border border-border p-5 hover:border-coral transition-colors">
                            <img src={order.productImage} alt={order.productName} className="w-full h-32 rounded-xl object-cover mb-4" />
                            <h3 className="text-white font-medium mb-1">{order.productName}</h3>
                            <p className="text-gray-400 text-sm mb-4">Purchased {new Date(order.orderDate).toLocaleDateString()}</p>
                            <Button onClick={() => handleDownload(order.id)} disabled={downloadingId === order.id} className="w-full bg-coral hover:bg-coral-dark text-white">
                              {downloadingId === order.id ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Preparing...</> : <><Download className="w-4 h-4 mr-2" />Download Now</>}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* WISHLIST */}
                {activeTab === 'wishlist' && (
                  <motion.div key="wishlist" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
                    <div className="text-center py-16">
                      <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Your wishlist is empty</p>
                      <p className="text-gray-400 mb-6">Save products you love for later</p>
                      <Link to="/products"><Button className="bg-coral hover:bg-coral-dark text-white">Browse Products</Button></Link>
                    </div>
                  </motion.div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === 'notifications' && (
                  <motion.div key="notifications" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
                    <div className="space-y-3">
                      {[
                        { icon: '✅', title: 'Order Confirmed', message: 'Your order for ChatGPT Business Pack has been confirmed.', time: '2 days ago', read: false },
                        { icon: '⬇️', title: 'Download Ready', message: 'Landing Page Pro Kit is ready to download.', time: '7 days ago', read: true },
                        { icon: '🎉', title: 'Welcome to Everytech!', message: 'Thanks for joining. Browse our premium digital products.', time: '14 days ago', read: true },
                      ].map((n, i) => (
                        <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${!n.read ? 'bg-coral/5 border-coral/20' : 'bg-dark-100 border-border'}`}>
                          <span className="text-2xl">{n.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-white font-medium text-sm">{n.title}</p>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-coral" />}
                            </div>
                            <p className="text-gray-400 text-sm">{n.message}</p>
                            <p className="text-gray-500 text-xs mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* SETTINGS */}
                {activeTab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                    <div className="space-y-6">

                      <div className="bg-dark-100 rounded-2xl border border-border p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-white font-semibold">Profile Information</h3>
                          {!isEditing ? (
                            <Button size="sm" variant="outline" onClick={() => { setIsEditing(true); setEditName(user?.name || ''); setEditEmail(user?.email || ''); }} className="border-border text-white">
                              <Edit className="w-4 h-4 mr-2" />Edit
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveProfile} disabled={savingProfile} className="bg-coral text-white">
                                {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="border-border text-white">
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-400 text-sm">Full Name</Label>
                              <Input value={editName} onChange={e => setEditName(e.target.value)} className="bg-dark border-border text-white mt-1" />
                            </div>
                            <div>
                              <Label className="text-gray-400 text-sm">Email</Label>
                              <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="bg-dark border-border text-white mt-1" />
                            </div>
                          </div>
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Full Name</p>
                              <p className="text-white font-medium">{user?.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Email</p>
                              <p className="text-white font-medium">{user?.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Member Since</p>
                              <p className="text-white font-medium">{new Date(user?.joinedDate || '').toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Account Type</p>
                              <p className="text-white font-medium">{user?.isAdmin ? '👑 Administrator' : '👤 Customer'}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-dark-100 rounded-2xl border border-border p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Lock className="w-5 h-5 text-coral" />Security
                        </h3>
                        <div className="space-y-3">
                          {[
                            { label: 'Password', sub: 'Last changed never', action: 'Change' },
                            { label: 'Two-Factor Authentication', sub: 'Not enabled', action: 'Enable' },
                          ].map(({ label, sub, action }) => (
                            <div key={label} className="flex items-center justify-between p-3 bg-dark rounded-xl">
                              <div>
                                <p className="text-white text-sm font-medium">{label}</p>
                                <p className="text-gray-400 text-xs">{sub}</p>
                              </div>
                              <Button size="sm" variant="outline" className="border-border text-white">{action}</Button>
                            </div>
                          ))}
                          <div className="flex items-center justify-between p-3 bg-dark rounded-xl">
                            <div>
                              <p className="text-white text-sm font-medium">Google Account</p>
                              <p className="text-gray-400 text-xs">{user?.email}</p>
                            </div>
                            <span className="text-green-400 text-xs flex items-center gap-1">
                              <Check className="w-3 h-3" />Connected
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-dark-100 rounded-2xl border border-border p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-coral" />Membership
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Current Plan</p>
                            <p className="text-white font-medium">Free Plan</p>
                          </div>
                          <Link to="/memberships">
                            <Button className="bg-coral hover:bg-coral-dark text-white">Upgrade to Pro</Button>
                          </Link>
                        </div>
                      </div>

                      <div className="bg-dark-100 rounded-2xl border border-border p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-coral" />Payment Methods
                        </h3>
                        <div className="flex items-center gap-3 p-3 bg-dark rounded-xl">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-white text-sm">Stripe (Secure Checkout)</p>
                            <p className="text-gray-400 text-xs">Payments processed securely via Stripe</p>
                          </div>
                          <Check className="w-4 h-4 text-green-400 ml-auto" />
                        </div>
                      </div>

                      <div className="bg-red-500/5 rounded-2xl border border-red-500/20 p-6">
                        <h3 className="text-red-400 font-semibold mb-4">Danger Zone</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm font-medium">Delete Account</p>
                            <p className="text-gray-400 text-xs">Permanently delete your account and all data</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Refund Dialog */}
        <Dialog open={!!refundOrder} onOpenChange={() => setRefundOrder(null)}>
          <DialogContent className="bg-dark-100 border-border text-white">
            <DialogHeader>
              <DialogTitle>Request Refund</DialogTitle>
              <DialogDescription className="text-gray-400">
                Provide a reason for your refund. We will process it within 24 hours.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Reason</label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Why would you like a refund?"
                  className="w-full bg-dark border border-border text-white rounded-lg px-3 py-2 h-24 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setRefundOrder(null)} className="flex-1 border-border text-white">Cancel</Button>
                <Button onClick={handleRefund} disabled={!refundReason || isRefunding} className="flex-1 bg-coral hover:bg-coral-dark text-white">
                  {isRefunding ? 'Processing...' : 'Submit Request'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Refund Success Dialog */}
        <Dialog open={showRefundSuccess} onOpenChange={setShowRefundSuccess}>
          <DialogContent className="bg-dark-100 border-border text-white text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <DialogTitle>Refund Requested!</DialogTitle>
            <DialogDescription className="text-gray-400">
              Your refund request has been submitted. You will receive an email within 24 hours.
            </DialogDescription>
            <Button onClick={() => setShowRefundSuccess(false)} className="mt-4 bg-coral hover:bg-coral-dark text-white">
              Got it
            </Button>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}