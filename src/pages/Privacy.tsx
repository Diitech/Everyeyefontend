import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, Mail } from 'lucide-react';
import { SEO } from '@/components/SEO';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: `
      <p class="mb-4">We collect information that you provide directly to us, including:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Account information (name, email, password)</li>
        <li>Payment information (processed securely by Stripe)</li>
        <li>Purchase history and download records</li>
        <li>Communication preferences</li>
        <li>Support inquiries and feedback</li>
      </ul>
      <p>We also automatically collect certain information when you use our services, including:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>IP address and device information</li>
        <li>Browser type and operating system</li>
        <li>Usage data and analytics</li>
        <li>Cookies and similar technologies</li>
      </ul>
    `,
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: `
      <p class="mb-4">We use the information we collect to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Provide and maintain our services</li>
        <li>Process your transactions and purchases</li>
        <li>Send you order confirmations and updates</li>
        <li>Respond to your inquiries and support requests</li>
        <li>Improve our products and services</li>
        <li>Send marketing communications (with your consent)</li>
        <li>Prevent fraud and ensure security</li>
        <li>Comply with legal obligations</li>
      </ul>
    `,
  },
  {
    icon: Server,
    title: 'Data Storage and Security',
    content: `
      <p class="mb-4">We take the security of your data seriously:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>All data is encrypted in transit and at rest</li>
        <li>We use industry-standard security measures</li>
        <li>Payment information is processed by Stripe (PCI DSS compliant)</li>
        <li>We never store your full credit card details</li>
        <li>Regular security audits and updates</li>
        <li>Limited employee access to personal data</li>
      </ul>
    `,
  },
  {
    icon: Shield,
    title: 'Your Rights and Choices',
    content: `
      <p class="mb-4">You have the following rights regarding your personal data:</p>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Access:</strong> Request a copy of your personal data</li>
        <li><strong>Correction:</strong> Update or correct inaccurate information</li>
        <li><strong>Deletion:</strong> Request deletion of your personal data</li>
        <li><strong>Portability:</strong> Export your data in a standard format</li>
        <li><strong>Objection:</strong> Object to certain processing activities</li>
        <li><strong>Withdraw Consent:</strong> Opt out of marketing communications</li>
      </ul>
      <p class="mt-4">To exercise these rights, please contact us at privacy@everytech.com.</p>
    `,
  },
];

export function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Learn how Everytech collects, uses, and protects your personal information. Your privacy is important to us."
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
                <Shield className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Privacy Policy
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
              At Everytech, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our website and services. 
              Please read this policy carefully. By using Everytech, you agree to the collection and 
              use of information in accordance with this policy.
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-8 border border-border"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-coral" />
                      </div>
                      <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    </div>
                    <div 
                      className="text-gray-400 prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
            <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-coral" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-gray-400 mb-6">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <a 
              href="mailto:privacy@everytech.com"
              className="inline-flex items-center gap-2 text-coral hover:underline"
            >
              <Mail className="w-4 h-4" />
              privacy@everytech.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
