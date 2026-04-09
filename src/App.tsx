import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { NewsletterPopup } from '@/components/NewsletterPopup';
import { PurchaseNotification } from '@/components/PurchaseNotification';
import { LoginModal } from '@/components/LoginModal';
import { AuthCallback } from '@/pages/AuthCallback';
import { getSavedUser, clearAuth } from '@/api/auth';
import './App.css';

// Lazy load all pages for better performance
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('@/pages/Products').then(m => ({ default: m.Products })));
const ProductDetail = lazy(() => import('@/pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Checkout = lazy(() => import('@/pages/Checkout').then(m => ({ default: m.Checkout })));
const CheckoutSuccess = lazy(() => import('@/pages/CheckoutSuccess').then(m => ({ default: m.CheckoutSuccess })));
const CheckoutCancel = lazy(() => import('@/pages/CheckoutCancel').then(m => ({ default: m.CheckoutCancel })));
const Admin = lazy(() => import('@/pages/Admin').then(m => ({ default: m.Admin })));
const Account = lazy(() => import('@/pages/Account').then(m => ({ default: m.Account })));
const CategoryPage = lazy(() => import('@/pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const Templates = lazy(() => import('@/pages/Templates').then(m => ({ default: m.Templates })));
const Courses = lazy(() => import('@/pages/Courses').then(m => ({ default: m.Courses })));
const AITools = lazy(() => import('@/pages/AITools').then(m => ({ default: m.AITools })));
const Memberships = lazy(() => import('@/pages/Memberships').then(m => ({ default: m.Memberships })));
const HelpCenter = lazy(() => import('@/pages/HelpCenter').then(m => ({ default: m.HelpCenter })));
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const License = lazy(() => import('@/pages/License').then(m => ({ default: m.License })));
const Refund = lazy(() => import('@/pages/Refund').then(m => ({ default: m.Refund })));
const FAQs = lazy(() => import('@/pages/FAQs').then(m => ({ default: m.FAQs })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Blog = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })));
const BlogDetail = lazy(() => import('@/pages/BlogDetail').then(m => ({ default: m.BlogDetail })));
const Careers = lazy(() => import('@/pages/Careers').then(m => ({ default: m.Careers })));
const Partners = lazy(() => import('@/pages/Partners').then(m => ({ default: m.Partners })));
const PressKit = lazy(() => import('@/pages/PressKit').then(m => ({ default: m.PressKit })));
const Privacy = lazy(() => import('@/pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('@/pages/Terms').then(m => ({ default: m.Terms })));
const Cookies = lazy(() => import('@/pages/Cookies').then(m => ({ default: m.Cookies })));
const GDPR = lazy(() => import('@/pages/GDPR').then(m => ({ default: m.GDPR })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getSavedUser());
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(
    () => getSavedUser()
  );

  const handleLogin = (userData: { name: string; email: string; avatar?: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    clearAuth();
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin - standalone, no navbar/footer */}
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <Admin />
            </Suspense>
          } />
          <Route path="/admin/*" element={
            <Suspense fallback={<PageLoader />}>
              <Admin />
            </Suspense>
          } />

          {/* All other pages - with navbar/footer */}
          <Route path="*" element={
            <div className="min-h-screen bg-dark">
              <Navbar
                onLoginClick={() => setIsLoginOpen(true)}
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
              />
              <CartDrawer />
              <PurchaseNotification />
              <NewsletterPopup />
              <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={handleLogin}
              />

              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                  <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                  <Route path="/auth/callback" element={<AuthCallback onLogin={handleLogin} />} />
                  <Route path="/account" element={<Account />} />

                  {/* Shop Pages */}
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/ai-tools" element={<AITools />} />
                  <Route path="/memberships" element={<Memberships />} />

                  {/* Navigation Pages */}
                  <Route path="/learn" element={
                    <CategoryPage
                      categorySlug="online-courses"
                      title="Learn"
                      description="Master new skills with our comprehensive courses"
                    />
                  } />
                  <Route path="/create" element={
                    <CategoryPage
                      categorySlug="templates-design"
                      title="Create"
                      description="Design assets and templates for your creative projects"
                    />
                  } />
                  <Route path="/automate" element={
                    <CategoryPage
                      categorySlug="business-systems"
                      title="Automate"
                      description="Streamline your workflow with automation tools"
                    />
                  } />
                  <Route path="/grow" element={
                    <CategoryPage
                      categorySlug="ai-tools"
                      title="Grow"
                      description="AI tools and resources to scale your business"
                    />
                  } />
                  <Route path="/deals" element={
                    <CategoryPage
                      title="Hot Deals"
                      description="Limited time offers on premium digital products"
                      filter="deals"
                    />
                  } />
                  <Route path="/new" element={
                    <CategoryPage
                      title="New Arrivals"
                      description="Fresh products just added to our marketplace"
                      filter="new"
                    />
                  } />

                  {/* Support Pages */}
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/license" element={<License />} />
                  <Route path="/refund" element={<Refund />} />
                  <Route path="/faqs" element={<FAQs />} />

                  {/* Company Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/press" element={<PressKit />} />

                  {/* Legal Pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/gdpr" element={<GDPR />} />

                  {/* Dynamic Category Route */}
                  <Route path="/:slug" element={<CategoryPage />} />
                </Routes>
              </Suspense>

              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;