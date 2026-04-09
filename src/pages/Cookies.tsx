import { motion } from 'framer-motion';
import { Cookie, Info, Settings, CheckCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';

const cookieTypes = [
  {
    name: 'Essential Cookies',
    required: true,
    description: 'These cookies are necessary for the website to function properly. They enable core functionality like security, network management, and account access.',
    examples: ['Session cookies', 'Authentication cookies', 'Security cookies'],
  },
  {
    name: 'Analytics Cookies',
    required: false,
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    examples: ['Google Analytics', 'Page view tracking', 'User behavior analytics'],
  },
  {
    name: 'Marketing Cookies',
    required: false,
    description: 'These cookies are used to track visitors across websites to display relevant advertisements and measure their effectiveness.',
    examples: ['Ad tracking', 'Retargeting cookies', 'Social media pixels'],
  },
  {
    name: 'Preference Cookies',
    required: false,
    description: 'These cookies remember your preferences and settings to enhance your experience on our website.',
    examples: ['Language preferences', 'Theme settings', 'Notification preferences'],
  },
];

export function Cookies() {
  return (
    <>
      <SEO 
        title="Cookie Policy"
        description="Learn how Everytech uses cookies to improve your browsing experience. Manage your cookie preferences."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-coral/10 via-dark to-dark">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-coral/20 flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Cookie Policy
              </h1>
              <p className="text-gray-400">
                Last updated: March 1, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-b border-border">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <p className="text-gray-400 leading-relaxed">
              This Cookie Policy explains how Everytech uses cookies and similar technologies 
              to recognize you when you visit our website. It explains what these technologies 
              are and why we use them, as well as your rights to control our use of them.
            </p>
          </div>
        </section>

        {/* What are Cookies */}
        <section className="py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-dark-100 rounded-xl p-8 border border-border mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center">
                  <Info className="w-6 h-6 text-coral" />
                </div>
                <h2 className="text-xl font-semibold text-white">What Are Cookies?</h2>
              </div>
              <p className="text-gray-400">
                Cookies are small data files that are placed on your computer or mobile device when you 
                visit a website. Cookies are widely used by website owners to make their websites work, 
                or to work more efficiently, as well as to provide reporting information.
              </p>
            </div>

            {/* Cookie Types */}
            <h2 className="text-2xl font-bold text-white mb-8">Types of Cookies We Use</h2>
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-100 rounded-xl p-6 border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                    {type.required ? (
                      <span className="px-3 py-1 bg-coral/20 text-coral text-xs rounded-full">
                        Required
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                        Optional
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{type.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example) => (
                      <span 
                        key={example} 
                        className="px-3 py-1 bg-dark text-gray-400 text-sm rounded-lg border border-border"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center">
                <Settings className="w-6 h-6 text-coral" />
              </div>
              <h2 className="text-2xl font-bold text-white">Managing Your Cookies</h2>
            </div>
            <div className="text-gray-400 space-y-4">
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when 
                websites set or access cookies. If you disable or refuse cookies, please note that 
                some parts of this website may become inaccessible or not function properly.
              </p>
              <p>
                To learn more about how to manage cookies in your browser, visit the help pages of 
                your specific browser:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><a href="https://support.google.com/chrome" className="text-coral hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org" className="text-coral hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/safari" className="text-coral hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/edge" className="text-coral hover:underline">Microsoft Edge</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className="py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-dark-100 rounded-xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-coral" />
                </div>
                <h2 className="text-xl font-semibold text-white">Updates to This Policy</h2>
              </div>
              <p className="text-gray-400">
                We may update this Cookie Policy from time to time to reflect changes in the cookies 
                we use or for other operational, legal, or regulatory reasons. Please revisit this 
                policy regularly to stay informed about our use of cookies.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
