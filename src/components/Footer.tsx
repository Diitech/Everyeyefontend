import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Templates', href: '/templates' },
    { label: 'Courses', href: '/courses' },
    { label: 'AI Tools', href: '/ai-tools' },
    { label: 'Memberships', href: '/memberships' }
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'License Info', href: '/license' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'FAQs', href: '/faqs' }
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Partners', href: '/partners' },
    { label: 'Press Kit', href: '/press' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' }
  ]
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/everytech', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/everytech', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/everytech', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/everytech', label: 'YouTube' }
];

export function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-border">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Everytech" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Everytech</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Premium digital assets for creators and entrepreneurs. Instant downloads, lifetime access.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-white mb-3">Get the drop first</h4>
              <p className="text-xs text-gray-400 mb-3">
                New products, limited deals, and free resources—once a week.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-dark border-border text-white placeholder:text-gray-500 text-sm"
                />
                <Button className="bg-coral hover:bg-coral-dark text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-dark flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-200 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Everytech. All rights reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">We accept:</span>
              <div className="flex gap-2">
                {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                  <div
                    key={method}
                    className="px-2 py-1 bg-dark rounded text-xs text-gray-400 border border-border"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
