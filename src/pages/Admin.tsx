import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts";
import {
  Package, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, X,
  Loader2, LayoutDashboard, ShoppingBag, LogOut, Search, Shield,
  ExternalLink, RefreshCw, AlertCircle, Bell, ShoppingCart, BarChart2,
  ArrowUp, ArrowDown, Eye, Globe, Mail, Target, CheckCircle, Clock,
  XCircle, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('token') || localStorage.getItem('adminToken');

const clearAdminAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('user');
};

const getSavedUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (response.status === 401) {
    const data = await response.json().catch(() => ({}));
    if (data.error === 'TokenExpired' || data.message?.includes('expired')) {
      clearAdminAuth();
      window.location.href = '/?session=expired';
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(data.message || 'Unauthorized access');
  }
  if (response.status === 403) throw new Error('Admin access required');
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }
  return response.json();
};

const getStats = () => apiRequest('/api/admin/stats');
const getAdminProducts = (search?: string, category?: string) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  return apiRequest(`/api/admin/products?${params}`);
};
const createProduct = (data: object) => apiRequest('/api/admin/products', { method: 'POST', body: JSON.stringify(data) });
const updateProduct = (id: string, data: object) => apiRequest(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
const deleteProduct = (id: string) => apiRequest(`/api/admin/products/${id}`, { method: 'DELETE' });
const getAdminUsers = () => apiRequest('/api/admin/users');
const toggleAdmin = (id: string) => apiRequest(`/api/admin/users/${id}/toggle-admin`, { method: 'PUT' });
const deleteUser = (id: string) => apiRequest(`/api/admin/users/${id}`, { method: 'DELETE' });
const generateDiscount = (code: string, percentage: number, expiryDays: number) =>
  apiRequest('/api/admin/discounts', { method: 'POST', body: JSON.stringify({ code, percentage, expiryDays }) });
const sendAnnouncement = (title: string, message: string, type: string) =>
  apiRequest('/api/admin/announcement', { method: 'POST', body: JSON.stringify({ title, message, type }) });
const requestPayout = (amount: number, accountNumber: string, bankName: string, accountName: string) =>
  apiRequest('/api/admin/payout', { method: 'POST', body: JSON.stringify({ amount, accountNumber, bankName, accountName }) });
const postCampaign = (platform: string, data: object) =>
  apiRequest('/api/admin/campaign', { method: 'POST', body: JSON.stringify({ platform, ...data }) });
const getCampaignStatus = () => apiRequest('/api/admin/campaigns/status');
const sendNewsletter = (subject: string, content: string, cta?: string, ctaLink?: string) =>
  apiRequest('/api/admin/newsletter', { method: 'POST', body: JSON.stringify({ subject, content, cta, ctaLink }) });

interface Product {
  _id: string; title: string; category: string;
  pricing: { sale: number; original: number; discount: number };
  rating: { average: number; count: number };
  salesCount: number; tags: string[]; images: string[]; description: string;
}
interface User {
  _id: string; name: string; email: string; provider: string;
  isAdmin: boolean; createdAt: string;
}
interface Stats {
  totalProducts: number; totalUsers: number; totalRevenue: number;
  totalSales: number; avgOrderValue: number;
  salesByCategory: { name: string; sales: number; revenue: number }[];
  topProducts: { title: string; sales: number; revenue: number; rating: number }[];
  worstProducts: { title: string; sales: number; revenue: number }[];
  monthlyRevenue: { month: string; revenue: number; orders: number; customers: number }[];
  dailySales: { day: string; revenue: number; orders: number }[];
  trafficSources: { source: string; visitors: number; conversion: number }[];
  recentOrders: { id: string; product: string; customer: string; amount: number; status: string; date: string }[];
  notifications: { type: string; message: string; time: string; icon: string }[];
  financial: { revenue: number; expenses: number; netProfit: number; taxes: number; gatewayFees: number; refunds: number };
  customerAnalytics: { total: number; new: number; returning: number; avgLifetimeValue: number; topLocations: { country: string; users: number }[] };
  marketing: { totalVisitors: number; pageViews: number; bounceRate: number; sessionDuration: string; conversionRate: number; cartAbandonmentRate: number; emailOpenRate: number; emailClickRate: number; roiByChannel: { channel: string; roi: number; spend: number }[] };
}
interface PlatformStatus { name: string; connected: boolean; color: string; bg: string; icon: string }
interface CampaignResult { platform: string; success: boolean; message: string }
interface PayoutResult { transactionId: string; status: string; estimatedArrival: string }
interface NewsletterResult { sent: number; total: number }
interface DiscountCode { code: string; percentage: number; expiry: string }

const emptyForm = {
  title: "", slug: "", description: "", shortDescription: "",
  category: "Templates & Design",
  pricing: { original: 0, sale: 0, discount: 0 },
  images: [] as string[], tags: [] as string[], salesCount: 0,
  rating: { average: 4.9, count: 0 },
  features: [] as string[], includes: [] as string[],
  license: "Commercial License - Use in unlimited projects",
  fileSize: "", fileFormat: [] as string[],
};

const CATEGORIES = ["All", "Templates & Design", "Online Courses", "Business Systems", "Creative Assets", "AI Tools & Prompts"];
type TabType = "dashboard" | "sales" | "orders" | "products" | "customers" | "marketing" | "financial" | "users" | "notifications";

const statusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-500/20 text-green-400";
    case "processing": return "bg-blue-500/20 text-blue-400";
    case "cancelled": return "bg-red-500/20 text-red-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
};

const statusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle className="w-3 h-3" />;
    case "processing": return <Clock className="w-3 h-3" />;
    case "cancelled": return <XCircle className="w-3 h-3" />;
    default: return <Clock className="w-3 h-3" />;
  }
};

export function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [stats, setStats] = useState<Stats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; isAdmin: boolean } | null>(null);

  // Marketing states
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [discountExpiry, setDiscountExpiry] = useState(30);
  const [generatedCodes, setGeneratedCodes] = useState<DiscountCode[]>([]);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementType, setAnnouncementType] = useState("info");
  const [announcementSent, setAnnouncementSent] = useState(false);
  const [marketingLoading, setMarketingLoading] = useState(false);

  // Newsletter states
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [newsletterCta, setNewsletterCta] = useState("");
  const [newsletterCtaLink, setNewsletterCtaLink] = useState("");
  const [newsletterSent, setNewsletterSent] = useState<NewsletterResult | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Campaign states
  const [campaignMessage, setCampaignMessage] = useState("");
  const [campaignPlatforms, setCampaignPlatforms] = useState<string[]>([]);
  const [fbPageId, setFbPageId] = useState("");
  const [fbAccessToken, setFbAccessToken] = useState("");
  const [linkedinToken, setLinkedinToken] = useState("");
  const [platformStatuses, setPlatformStatuses] = useState<PlatformStatus[]>([]);
  const [campaignResults, setCampaignResults] = useState<CampaignResult[]>([]);
  const [campaignLoading, setCampaignLoading] = useState(false);

  // Financial states
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [payoutResult, setPayoutResult] = useState<PayoutResult | null>(null);
  const [payoutHistory] = useState([
    { id: "PAY-001", amount: 2500, status: "completed", date: "2026-02-01", bank: "GTBank" },
    { id: "PAY-002", amount: 4200, status: "completed", date: "2026-02-15", bank: "GTBank" },
    { id: "PAY-003", amount: 1800, status: "processing", date: "2026-03-01", bank: "GTBank" },
  ]);
  const [financialLoading, setFinancialLoading] = useState(false);

  // ===== AUTH CHECK — fetches fresh user from backend =====
  const checkAuth = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setAuthChecked(true);
      navigate('/');
      return;
    }

    // Use getSavedUser to load cached user immediately
    const savedUser = getSavedUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    try {
      // Fetch fresh user data from backend
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Auth failed');
      const data = await res.json();
      const freshUser = data.user;

      if (!freshUser?.isAdmin) {
        clearAdminAuth();
        setError('Admin access required. Your account does not have admin privileges.');
        setAuthChecked(true);
        return;
      }

      // Save fresh user to localStorage
      localStorage.setItem('user', JSON.stringify(freshUser));
      setCurrentUser(freshUser);
      setAuthChecked(true);
    } catch (err: unknown) {
      console.error('Auth check failed:', err);
      // If API fails but we have saved user, keep them logged in
      if (!savedUser) {
        clearAdminAuth();
        navigate('/');
      }
      setAuthChecked(true); // FIX: This was missing - prevents infinite loading
    }
  }, [navigate]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (["dashboard", "sales", "orders", "customers", "marketing", "financial", "notifications"].includes(activeTab)) {
        const s = await getStats();
        setStats(s);
      } else if (activeTab === "products") {
        const p = await getAdminProducts(searchQuery, categoryFilter === "all" ? "" : categoryFilter);
        setProducts(p);
      } else if (activeTab === "users") {
        const u = await getAdminUsers();
        setUsers(u);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery, categoryFilter]);

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => { if (authChecked && currentUser?.isAdmin) loadData(); }, [activeTab, authChecked, currentUser, loadData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getCampaignStatus()
        .then((data) => { if (Array.isArray(data)) setPlatformStatuses(data); })
        .catch(console.error);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const p = await getAdminProducts(searchQuery, categoryFilter === "all" ? "" : categoryFilter);
      setProducts(p);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.title.toLowerCase().replace(/\s+/g, "-"),
      description: product.description || "",
      shortDescription: "",
      category: product.category,
      pricing: product.pricing,
      images: product.images || [],
      tags: product.tags || [],
      salesCount: product.salesCount,
      rating: product.rating,
      features: [], includes: [],
      license: "Commercial License",
      fileSize: "", fileFormat: [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      setDeleteConfirm(null);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Delete failed"); }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
      setDeleteConfirm(null);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Delete failed"); }
  };

  const handleToggleAdmin = async (id: string) => {
    try {
      await toggleAdmin(id);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isAdmin: !u.isAdmin } : u));
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Toggle failed"); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, formData);
        setProducts(prev => prev.map(p => p._id === editingProduct._id ? updated : p));
      } else {
        const created = await createProduct(formData);
        setProducts(prev => [created, ...prev]);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData(emptyForm);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally { setSaving(false); }
  };

  const handleGenerateDiscount = async () => {
    if (!discountCode) return;
    setMarketingLoading(true);
    try {
      const result = await generateDiscount(discountCode, discountPercent, discountExpiry);
      setGeneratedCodes(prev => [result, ...prev]);
      setDiscountCode("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate discount");
    } finally { setMarketingLoading(false); }
  };

  const handleSendAnnouncement = async () => {
    if (!announcementTitle || !announcementMessage) return;
    setMarketingLoading(true);
    try {
      await sendAnnouncement(announcementTitle, announcementMessage, announcementType);
      setAnnouncementSent(true);
      setAnnouncementTitle(""); setAnnouncementMessage("");
      setTimeout(() => setAnnouncementSent(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send announcement");
    } finally { setMarketingLoading(false); }
  };

  const handleSendNewsletter = async () => {
    if (!newsletterSubject || !newsletterContent) return;
    setNewsletterLoading(true);
    try {
      const result = await sendNewsletter(newsletterSubject, newsletterContent, newsletterCta, newsletterCtaLink);
      setNewsletterSent(result);
      setNewsletterSubject(""); setNewsletterContent("");
      setNewsletterCta(""); setNewsletterCtaLink("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send newsletter");
    } finally { setNewsletterLoading(false); }
  };

  const handlePostCampaign = async () => {
    if (!campaignMessage || campaignPlatforms.length === 0) return;
    setCampaignLoading(true);
    setCampaignResults([]);
    const results: CampaignResult[] = [];
    for (const platform of campaignPlatforms) {
      try {
        let data: object = { message: campaignMessage };
        if (platform === "facebook") data = { message: campaignMessage, pageId: fbPageId, pageAccessToken: fbAccessToken };
        if (platform === "linkedin") data = { message: campaignMessage, accessToken: linkedinToken };
        const result = await postCampaign(platform, data);
        results.push({ platform, success: result.success, message: result.success ? "Posted successfully!" : result.message });
      } catch { results.push({ platform, success: false, message: "Failed to post" }); }
    }
    setCampaignResults(results);
    setCampaignLoading(false);
  };

  const handlePayout = async () => {
    if (!bankName || !accountNumber || !accountName || payoutAmount <= 0) return;
    setFinancialLoading(true);
    try {
      const result = await requestPayout(payoutAmount, accountNumber, bankName, accountName);
      setPayoutResult(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payout failed");
    } finally { setFinancialLoading(false); }
  };

  const handleLogout = () => { clearAdminAuth(); navigate('/'); };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "sales", label: "Sales Overview", icon: TrendingUp },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "customers", label: "Customers", icon: Users },
    { id: "marketing", label: "Marketing", icon: Target },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "users", label: "User Management", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-coral mx-auto mb-4" />
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show error if not admin
  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">{error || 'You do not have admin privileges.'}</p>
          <div className="space-y-3">
            <p className="text-gray-500 text-sm">Make sure your account has admin access, then log out and log back in.</p>
            <Link to="/" className="block px-6 py-3 bg-coral text-white rounded-xl hover:bg-coral-dark transition-colors">
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-dark-100 border-r border-border flex flex-col fixed h-full z-20 transition-all duration-300`}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          {sidebarOpen && (
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Everytech</h1>
              <p className="text-xs text-coral">Admin Panel</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1">
            <BarChart2 className="w-5 h-5" />
          </button>
        </div>

        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-border">
            <div className="bg-dark rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center text-white text-sm font-bold">
                {currentUser?.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{currentUser?.name}</p>
                <p className="text-xs text-coral">Administrator</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeTab === id ? "bg-coral text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">View Site</span>}
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-16"} flex-1 min-h-screen transition-all duration-300`}>
        <div className="bg-dark-100 border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-white">{navItems.find(n => n.id === activeTab)?.label}</h2>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadData} className="flex items-center gap-2 px-3 py-1.5 bg-dark border border-border rounded-lg text-gray-400 hover:text-white text-sm transition-colors">
              <RefreshCw className="w-3 h-3" />Refresh
            </button>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-coral rounded-full text-xs flex items-center justify-center text-white">
                {stats?.notifications?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
              <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-coral animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* DASHBOARD */}
              {activeTab === "dashboard" && stats && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: "+12.5%", up: true, icon: DollarSign, color: "text-coral", bg: "bg-coral/20" },
                      { label: "Total Orders", value: stats.totalSales.toLocaleString(), change: "+8.2%", up: true, icon: ShoppingCart, color: "text-green-400", bg: "bg-green-500/20" },
                      { label: "Avg Order Value", value: `$${stats.avgOrderValue.toFixed(0)}`, change: "+3.1%", up: true, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/20" },
                      { label: "Total Customers", value: stats.totalUsers, change: "+5 today", up: true, icon: Users, color: "text-amber-400", bg: "bg-amber-500/20" },
                    ].map(({ label, value, icon: Icon, color, bg, change, up }) => (
                      <div key={label} className="bg-dark-100 rounded-2xl p-5 border border-border">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                          </div>
                          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${up ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
                            {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{change}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                      <h3 className="text-base font-semibold text-white mb-4">Monthly Revenue</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={stats.monthlyRevenue}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="month" stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
                          <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
                          <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }} />
                          <Area type="monotone" dataKey="revenue" stroke="#FF6B6B" strokeWidth={2} fill="url(#colorRevenue)" name="Revenue ($)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                      <h3 className="text-base font-semibold text-white mb-4">Daily Sales (This Week)</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={stats.dailySales}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="day" stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
                          <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
                          <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }} />
                          <Bar dataKey="revenue" fill="#4ECDC4" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {stats.recentOrders?.length > 0 && (
                    <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                      <h3 className="text-base font-semibold text-white mb-4">Recent Orders</h3>
                      <div className="space-y-3">
                        {stats.recentOrders.map((order, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-dark rounded-xl">
                            <div>
                              <p className="text-white text-sm font-medium">{order.product}</p>
                              <p className="text-gray-400 text-xs">{order.customer} · {order.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-coral font-semibold">${order.amount}</span>
                              <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColor(order.status)}`}>
                                {statusIcon(order.status)}{order.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SALES */}
              {activeTab === "sales" && stats && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-coral", bg: "bg-coral/20" },
                      { label: "Total Orders", value: stats.totalSales.toLocaleString(), icon: ShoppingCart, color: "text-green-400", bg: "bg-green-500/20" },
                      { label: "Avg Order Value", value: `$${stats.avgOrderValue.toFixed(2)}`, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/20" },
                      { label: "Conversion Rate", value: `${stats.marketing?.conversionRate || 0}%`, icon: Target, color: "text-amber-400", bg: "bg-amber-500/20" },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                      <div key={label} className="bg-dark-100 rounded-2xl p-5 border border-border">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
                        <p className="text-gray-400 text-xs mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                    <h3 className="text-base font-semibold text-white mb-4">Revenue & Orders (12 Months)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={stats.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" stroke="#666" tick={{ fill: "#999" }} />
                        <YAxis stroke="#666" tick={{ fill: "#999" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#FF6B6B" strokeWidth={2} name="Revenue ($)" />
                        <Line type="monotone" dataKey="orders" stroke="#4ECDC4" strokeWidth={2} name="Orders" />
                        <Line type="monotone" dataKey="customers" stroke="#45B7D1" strokeWidth={2} name="Customers" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* PRODUCTS */}
              {activeTab === "products" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-3 flex-1">
                      <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} className="pl-10 bg-dark border-border text-white" />
                      </div>
                      <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-dark border border-border text-white rounded-lg px-3 py-2 text-sm">
                        {CATEGORIES.map(c => <option key={c} value={c === "All" ? "all" : c}>{c}</option>)}
                      </select>
                      <Button onClick={handleSearch} variant="outline" className="border-border text-white"><Search className="w-4 h-4" /></Button>
                    </div>
                    <Button onClick={() => { setEditingProduct(null); setFormData(emptyForm); setShowForm(true); }} className="bg-coral hover:bg-coral-dark text-white">
                      <Plus className="w-4 h-4 mr-2" />Add Product
                    </Button>
                  </div>
                  <div className="bg-dark-100 rounded-2xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border"><p className="text-gray-400 text-sm">{products.length} products</p></div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border bg-dark/50">
                            <th className="text-left p-4 text-gray-400 text-sm">Product</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Category</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Price</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Sales</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Revenue</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Rating</th>
                            <th className="text-right p-4 text-gray-400 text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product._id} className="border-b border-border hover:bg-dark-200">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark flex-shrink-0">
                                    {product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Package className="w-4 h-4 text-gray-500" /></div>}
                                  </div>
                                  <span className="text-white text-sm font-medium">{product.title}</span>
                                </div>
                              </td>
                              <td className="p-4"><span className="px-2 py-1 bg-dark rounded text-gray-400 text-xs">{product.category}</span></td>
                              <td className="p-4 text-coral font-medium">${product.pricing?.sale}</td>
                              <td className="p-4 text-gray-400">{product.salesCount?.toLocaleString()}</td>
                              <td className="p-4 text-green-400">${((product.salesCount || 0) * (product.pricing?.sale || 0)).toLocaleString()}</td>
                              <td className="p-4 text-amber-400">{product.rating?.average} ⭐</td>
                              <td className="p-4">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                  {deleteConfirm === product._id ? (
                                    <div className="flex gap-1">
                                      <button onClick={() => handleDelete(product._id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg">Confirm</button>
                                      <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-dark text-gray-400 text-xs rounded-lg">Cancel</button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm(product._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* USERS */}
              {activeTab === "users" && (
                <div className="space-y-6">
                  <div className="bg-dark-100 rounded-2xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border"><p className="text-gray-400 text-sm">{users.length} users</p></div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border bg-dark/50">
                            <th className="text-left p-4 text-gray-400 text-sm">User</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Email</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Provider</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Admin</th>
                            <th className="text-left p-4 text-gray-400 text-sm">Joined</th>
                            <th className="text-right p-4 text-gray-400 text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(u => (
                            <tr key={u._id} className="border-b border-border hover:bg-dark-200">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center text-white text-sm font-bold">{u.name?.charAt(0)}</div>
                                  <span className="text-white text-sm font-medium">{u.name}</span>
                                </div>
                              </td>
                              <td className="p-4 text-gray-400 text-sm">{u.email}</td>
                              <td className="p-4"><span className="px-2 py-1 bg-dark rounded text-gray-400 text-xs capitalize">{u.provider}</span></td>
                              <td className="p-4">{u.isAdmin ? <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Admin</span> : <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">User</span>}</td>
                              <td className="p-4 text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                              <td className="p-4">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleToggleAdmin(u._id)} className="p-2 text-gray-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-colors"><Shield className="w-4 h-4" /></button>
                                  {deleteConfirm === u._id ? (
                                    <div className="flex gap-1">
                                      <button onClick={() => handleDeleteUser(u._id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg">Confirm</button>
                                      <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-dark text-gray-400 text-xs rounded-lg">Cancel</button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm(u._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* MARKETING */}
              {activeTab === "marketing" && stats && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Visitors", value: (stats.marketing?.totalVisitors || 0).toLocaleString(), icon: Eye, color: "text-blue-400", bg: "bg-blue-500/20" },
                      { label: "Page Views", value: (stats.marketing?.pageViews || 0).toLocaleString(), icon: Globe, color: "text-green-400", bg: "bg-green-500/20" },
                      { label: "Bounce Rate", value: `${stats.marketing?.bounceRate || 0}%`, icon: ArrowDown, color: "text-red-400", bg: "bg-red-500/20" },
                      { label: "Conversion Rate", value: `${stats.marketing?.conversionRate || 0}%`, icon: Target, color: "text-coral", bg: "bg-coral/20" },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                      <div key={label} className="bg-dark-100 rounded-2xl p-5 border border-border">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
                        <p className="text-gray-400 text-xs mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Discount */}
                    <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                      <h3 className="text-base font-semibold text-white mb-4">Generate Discount Code</h3>
                      <div className="space-y-3">
                        <div><Label className="text-gray-300 text-sm">Code</Label><Input value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} placeholder="e.g. SAVE20" className="bg-dark border-border text-white mt-1 font-mono" /></div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><Label className="text-gray-300 text-sm">Discount %</Label><Input type="number" value={discountPercent} onChange={e => setDiscountPercent(Number(e.target.value))} className="bg-dark border-border text-white mt-1" /></div>
                          <div><Label className="text-gray-300 text-sm">Expires (days)</Label><Input type="number" value={discountExpiry} onChange={e => setDiscountExpiry(Number(e.target.value))} className="bg-dark border-border text-white mt-1" /></div>
                        </div>
                        <Button onClick={handleGenerateDiscount} disabled={marketingLoading || !discountCode} className="w-full bg-coral hover:bg-coral-dark text-white">
                          {marketingLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : 'Generate Code'}
                        </Button>
                        {generatedCodes.slice(0, 3).map((c, i) => (
                          <div key={i} className="flex items-center justify-between bg-dark rounded-lg p-3">
                            <span className="text-white font-mono font-bold">{c.code}</span>
                            <span className="text-green-400 text-sm">{c.percentage}% off</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Announcement */}
                    <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                      <h3 className="text-base font-semibold text-white mb-4">Send Announcement</h3>
                      <div className="space-y-3">
                        <div><Label className="text-gray-300 text-sm">Title</Label><Input value={announcementTitle} onChange={e => setAnnouncementTitle(e.target.value)} placeholder="Announcement title" className="bg-dark border-border text-white mt-1" /></div>
                        <div><Label className="text-gray-300 text-sm">Message</Label><textarea value={announcementMessage} onChange={e => setAnnouncementMessage(e.target.value)} className="w-full mt-1 bg-dark border border-border text-white rounded-lg px-3 py-2 h-20 resize-none text-sm" placeholder="Your announcement..." /></div>
                        <select value={announcementType} onChange={e => setAnnouncementType(e.target.value)} className="w-full bg-dark border border-border text-white rounded-lg px-3 py-2 text-sm">
                          <option value="info">Info</option><option value="success">Success</option><option value="warning">Warning</option>
                        </select>
                        <Button onClick={handleSendAnnouncement} disabled={marketingLoading || !announcementTitle || !announcementMessage} className="w-full bg-coral hover:bg-coral-dark text-white">
                          {announcementSent ? <><CheckCircle className="w-4 h-4 mr-2" />Sent!</> : marketingLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : 'Send Announcement'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                    <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-coral" />Newsletter Sender</h3>
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div><Label className="text-gray-300 text-sm">Subject</Label><Input value={newsletterSubject} onChange={e => setNewsletterSubject(e.target.value)} placeholder="Email subject..." className="bg-dark border-border text-white mt-1" /></div>
                        <div><Label className="text-gray-300 text-sm">CTA Text</Label><Input value={newsletterCta} onChange={e => setNewsletterCta(e.target.value)} placeholder="Shop Now" className="bg-dark border-border text-white mt-1" /></div>
                      </div>
                      <div><Label className="text-gray-300 text-sm">CTA Link</Label><Input value={newsletterCtaLink} onChange={e => setNewsletterCtaLink(e.target.value)} placeholder="https://everytech.com/products" className="bg-dark border-border text-white mt-1" /></div>
                      <div><Label className="text-gray-300 text-sm">Content</Label><textarea value={newsletterContent} onChange={e => setNewsletterContent(e.target.value)} className="w-full mt-1 bg-dark border border-border text-white rounded-lg px-3 py-2 h-28 resize-none text-sm" placeholder="Newsletter body..." /></div>
                      <Button onClick={handleSendNewsletter} disabled={newsletterLoading || !newsletterSubject || !newsletterContent} className="w-full bg-coral hover:bg-coral-dark text-white">
                        {newsletterLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : newsletterSent ? <><CheckCircle className="w-4 h-4 mr-2" />Sent to {newsletterSent.sent} subscribers!</> : 'Send Newsletter'}
                      </Button>
                    </div>
                  </div>

                  {/* Campaign */}
                  <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                    <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-coral" />Social Media Campaign Publisher</h3>
                    <div className="space-y-4">
                      <div><Label className="text-gray-300 text-sm">Campaign Message</Label><textarea value={campaignMessage} onChange={e => setCampaignMessage(e.target.value)} className="w-full mt-1 bg-dark border border-border text-white rounded-lg px-3 py-2 h-24 resize-none text-sm" placeholder="Write your campaign message..." /></div>
                      <div>
                        <Label className="text-gray-300 text-sm mb-2 block">Select Platforms</Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: "twitter", label: "Twitter/X", color: "border-sky-500/50 bg-sky-500/10 text-sky-400" },
                            { id: "facebook", label: "Facebook", color: "border-blue-500/50 bg-blue-500/10 text-blue-400" },
                            { id: "linkedin", label: "LinkedIn", color: "border-blue-700/50 bg-blue-700/10 text-blue-300" },
                            { id: "tiktok", label: "TikTok", color: "border-pink-500/50 bg-pink-500/10 text-pink-400" },
                          ].map(({ id, label, color }) => (
                            <button key={id} onClick={() => setCampaignPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${campaignPlatforms.includes(id) ? color : "border-border bg-dark text-gray-400"}`}>
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {campaignPlatforms.includes("facebook") && (
                        <div className="grid sm:grid-cols-2 gap-3 p-3 bg-dark rounded-xl border border-border">
                          <div><Label className="text-gray-300 text-xs">Page ID</Label><Input value={fbPageId} onChange={e => setFbPageId(e.target.value)} className="bg-dark-100 border-border text-white mt-1 text-sm" /></div>
                          <div><Label className="text-gray-300 text-xs">Access Token</Label><Input value={fbAccessToken} onChange={e => setFbAccessToken(e.target.value)} type="password" className="bg-dark-100 border-border text-white mt-1 text-sm" /></div>
                        </div>
                      )}
                      {campaignPlatforms.includes("linkedin") && (
                        <div className="p-3 bg-dark rounded-xl border border-border">
                          <Label className="text-gray-300 text-xs">LinkedIn Access Token</Label>
                          <Input value={linkedinToken} onChange={e => setLinkedinToken(e.target.value)} type="password" className="bg-dark-100 border-border text-white mt-1 text-sm" />
                        </div>
                      )}
                      <Button onClick={handlePostCampaign} disabled={campaignLoading || !campaignMessage || campaignPlatforms.length === 0} className="w-full bg-coral hover:bg-coral-dark text-white">
                        {campaignLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting...</> : <><Mail className="w-4 h-4 mr-2" />Post to {campaignPlatforms.length || "Selected"} Platform(s)</>}
                      </Button>
                      {campaignResults.map((r, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${r.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                          {r.success ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <span className="capitalize text-white text-sm font-medium">{r.platform}</span>
                          <span className={`text-sm ${r.success ? 'text-green-400' : 'text-red-400'}`}>{r.message}</span>
                        </div>
                      ))}
                      {platformStatuses.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {platformStatuses.map((ps, i) => (
                            <div key={i} className={`p-3 rounded-xl border text-center text-sm ${ps.connected ? 'border-green-500/30 bg-green-500/10' : 'border-border bg-dark'}`}>
                              <p className="text-white font-medium">{ps.name}</p>
                              <p className={`text-xs ${ps.connected ? 'text-green-400' : 'text-gray-500'}`}>{ps.connected ? 'Connected' : 'Not connected'}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FINANCIAL */}
              {activeTab === "financial" && stats && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Revenue", value: `$${(stats.financial?.revenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-coral", bg: "bg-coral/20" },
                      { label: "Net Profit", value: `$${(stats.financial?.netProfit || 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/20" },
                      { label: "Expenses", value: `$${(stats.financial?.expenses || 0).toLocaleString()}`, icon: ArrowDown, color: "text-red-400", bg: "bg-red-500/20" },
                      { label: "Taxes", value: `$${(stats.financial?.taxes || 0).toLocaleString()}`, icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/20" },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                      <div key={label} className="bg-dark-100 rounded-2xl p-5 border border-border">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
                        <p className="text-gray-400 text-xs mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                    <h3 className="text-base font-semibold text-white mb-4">Request Payout</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><Label className="text-gray-300 text-sm">Bank Name</Label><Input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g. GTBank" className="bg-dark border-border text-white mt-1" /></div>
                      <div><Label className="text-gray-300 text-sm">Account Number</Label><Input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="0123456789" className="bg-dark border-border text-white mt-1" /></div>
                      <div><Label className="text-gray-300 text-sm">Account Name</Label><Input value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="Your full name" className="bg-dark border-border text-white mt-1" /></div>
                      <div><Label className="text-gray-300 text-sm">Amount ($)</Label><Input type="number" value={payoutAmount} onChange={e => setPayoutAmount(Number(e.target.value))} className="bg-dark border-border text-white mt-1" /></div>
                    </div>
                    <Button onClick={handlePayout} disabled={financialLoading || !bankName || !accountNumber || !accountName || payoutAmount <= 0} className="mt-4 bg-coral hover:bg-coral-dark text-white">
                      {financialLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</> : 'Request Payout'}
                    </Button>
                    {payoutResult && (
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <p className="text-green-400 font-medium">✅ Payout requested!</p>
                        <p className="text-gray-400 text-sm mt-1">ID: {payoutResult.transactionId} · ETA: {payoutResult.estimatedArrival}</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-dark-100 rounded-2xl p-5 border border-border">
                    <h3 className="text-base font-semibold text-white mb-4">Payout History</h3>
                    <div className="space-y-3">
                      {payoutHistory.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-dark rounded-xl">
                          <div><p className="text-white text-sm font-medium">{p.id}</p><p className="text-gray-400 text-xs">{p.bank} · {p.date}</p></div>
                          <div className="flex items-center gap-3">
                            <span className="text-coral font-semibold">${p.amount.toLocaleString()}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColor(p.status)}`}>{p.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ORDERS */}
              {activeTab === "orders" && stats && (
                <div className="bg-dark-100 rounded-2xl border border-border overflow-hidden">
                  <div className="p-4 border-b border-border"><p className="text-gray-400 text-sm">{stats.recentOrders?.length || 0} recent orders</p></div>
                  <div className="divide-y divide-border">
                    {stats.recentOrders?.map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-dark-200">
                        <div><p className="text-white text-sm font-medium">{order.product}</p><p className="text-gray-400 text-xs">{order.customer} · {order.date}</p></div>
                        <div className="flex items-center gap-3">
                          <span className="text-coral font-semibold">${order.amount}</span>
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColor(order.status)}`}>{statusIcon(order.status)}{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOMERS */}
              {activeTab === "customers" && stats && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Customers", value: (stats.customerAnalytics?.total || 0).toLocaleString(), icon: Users, color: "text-coral", bg: "bg-coral/20" },
                      { label: "New Customers", value: (stats.customerAnalytics?.new || 0).toLocaleString(), icon: ArrowUp, color: "text-green-400", bg: "bg-green-500/20" },
                      { label: "Returning", value: (stats.customerAnalytics?.returning || 0).toLocaleString(), icon: RefreshCw, color: "text-blue-400", bg: "bg-blue-500/20" },
                      { label: "Avg Lifetime Value", value: `$${(stats.customerAnalytics?.avgLifetimeValue || 0).toFixed(0)}`, icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/20" },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                      <div key={label} className="bg-dark-100 rounded-2xl p-5 border border-border">
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
                        <p className="text-gray-400 text-xs mb-1">{label}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && stats && (
                <div className="space-y-4">
                  {stats.notifications?.length > 0 ? stats.notifications.map((n, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-dark-100 rounded-2xl border border-border">
                      <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center flex-shrink-0"><Bell className="w-5 h-5 text-coral" /></div>
                      <div><p className="text-white text-sm">{n.message}</p><p className="text-gray-400 text-xs mt-1">{n.time}</p></div>
                    </div>
                  )) : (
                    <div className="text-center py-20"><Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" /><p className="text-gray-400">No notifications</p></div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-100 rounded-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{editingProduct ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><Label className="text-gray-300">Title</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-dark border-border text-white mt-1" placeholder="Product title" /></div>
              <div>
                <Label className="text-gray-300">Category</Label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-dark border border-border text-white rounded-lg px-3 py-2 mt-1">
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-gray-300">Sale Price</Label><Input type="number" value={formData.pricing.sale} onChange={e => setFormData({ ...formData, pricing: { ...formData.pricing, sale: Number(e.target.value) } })} className="bg-dark border-border text-white mt-1" /></div>
                <div><Label className="text-gray-300">Original Price</Label><Input type="number" value={formData.pricing.original} onChange={e => setFormData({ ...formData, pricing: { ...formData.pricing, original: Number(e.target.value) } })} className="bg-dark border-border text-white mt-1" /></div>
              </div>
              <div><Label className="text-gray-300">Description</Label><textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-dark border border-border text-white rounded-lg px-3 py-2 mt-1 h-24 resize-none" placeholder="Product description..." /></div>
              <div><Label className="text-gray-300">Image URL</Label><Input value={formData.images[0] || ''} onChange={e => setFormData({ ...formData, images: [e.target.value] })} className="bg-dark border-border text-white mt-1" placeholder="https://..." /></div>
              <div><Label className="text-gray-300">Tags (comma separated)</Label><Input value={formData.tags.join(', ')} onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} className="bg-dark border-border text-white mt-1" placeholder="Bestseller, New, Featured" /></div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)} className="border-border text-white">Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-coral hover:bg-coral-dark text-white">
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Plus className="w-4 h-4 mr-2" />Save Product</>}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;