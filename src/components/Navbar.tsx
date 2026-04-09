import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LogIn,
  User,
  Package,
  Download,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { navItems } from '@/data';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar?: string } | null;
  onLogout: () => void;
}

export function Navbar({ onLoginClick, isLoggedIn, user, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setShowUserMenu(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/90 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Everytech"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-white">Everytech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-dark-100 border border-border rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchFocused ? 'w-64' : 'w-48'}`}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-100 border-border text-white placeholder:text-gray-500 focus:border-coral focus:ring-coral/20"
                />
              </div>
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              className="relative text-gray-300 hover:text-white hover:bg-white/5"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-coral text-white text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* User / Login - Desktop */}
            {isLoggedIn && user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center">
                      <span className="text-coral font-medium text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <span className="hidden sm:block text-sm text-white max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-dark-100 border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <Link to="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                          <User className="w-4 h-4" />My Account
                        </Link>
                        <Link to="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                          <Package className="w-4 h-4" />My Orders
                        </Link>
                        <Link to="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                          <Download className="w-4 h-4" />Downloads
                        </Link>
                        <div className="border-t border-border my-1" />
                        <button
                          onClick={onLogout}
                          className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLoginClick}
                className="hidden sm:flex text-gray-300 hover:text-white hover:bg-white/5"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white hover:bg-white/5"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-[72px] bg-dark z-40 overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2 min-h-full">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-100 border-border text-white placeholder:text-gray-500 text-base"
                />
              </div>

              {/* Nav Items */}
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="block px-4 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-border ml-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-6 mt-4 border-t border-border space-y-3">
                {isLoggedIn && user ? (
                  <>
                    {/* User Profile Card */}
                    <div className="flex items-center gap-3 px-4 py-4 bg-dark-100 rounded-2xl border border-border mb-4">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-coral font-bold text-lg">{user.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-semibold truncate">{user.name}</p>
                        <p className="text-gray-400 text-sm truncate">{user.email}</p>
                      </div>
                    </div>

                    <Link to="/account" className="flex items-center gap-3 px-4 py-3.5 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <User className="w-5 h-5 text-coral" />My Account
                    </Link>
                    <Link to="/account" className="flex items-center gap-3 px-4 py-3.5 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <Package className="w-5 h-5 text-blue-400" />My Orders
                    </Link>
                    <Link to="/account" className="flex items-center gap-3 px-4 py-3.5 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <Download className="w-5 h-5 text-green-400" />Downloads
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-base text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-5 h-5" />Logout
                    </button>
                  </>
                ) : (
                  <Button
                    onClick={onLoginClick}
                    className="w-full bg-coral hover:bg-coral-dark text-white py-6 text-base rounded-xl"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In / Create Account
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}