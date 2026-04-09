import { motion } from 'framer-motion';
import { FileText, AlertCircle, Mail } from 'lucide-react';
import { SEO } from '@/components/SEO';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `
      <p class="mb-4">By accessing or using Everytech, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
      <p>We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our services after any changes constitutes acceptance of the new terms.</p>
    `,
  },
  {
    title: 'Account Registration',
    content: `
      <p class="mb-4">To use certain features of our services, you must register for an account. You agree to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Notify us immediately of any unauthorized access</li>
        <li>Accept responsibility for all activities under your account</li>
        <li>Be at least 18 years old or have parental consent</li>
      </ul>
    `,
  },
  {
    title: 'Purchases and Payments',
    content: `
      <p class="mb-4">When you make a purchase on Everytech:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>You agree to pay all fees and charges associated with your purchase</li>
        <li>All prices are in USD unless otherwise stated</li>
        <li>Payments are processed securely through Stripe</li>
        <li>You receive a license to use the product according to our licensing terms</li>
        <li>Digital products are non-refundable except as stated in our refund policy</li>
      </ul>
    `,
  },
  {
    title: 'Intellectual Property',
    content: `
      <p class="mb-4">All content on Everytech, including but not limited to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Text, graphics, logos, and images</li>
        <li>Software and code</li>
        <li>Product designs and templates</li>
        <li>Trademarks and trade names</li>
      </ul>
      <p class="mt-4">is the property of Everytech or our licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
    `,
  },
  {
    title: 'User Content',
    content: `
      <p class="mb-4">If you submit content to Everytech (such as reviews or comments):</p>
      <ul class="list-disc list-inside space-y-2">
        <li>You retain ownership of your content</li>
        <li>You grant us a license to use, display, and distribute your content</li>
        <li>Your content must not violate any laws or infringe on others' rights</li>
        <li>We reserve the right to remove any content at our discretion</li>
      </ul>
    `,
  },
  {
    title: 'Prohibited Activities',
    content: `
      <p class="mb-4">You agree not to:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Use our services for any illegal purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with other users' access to our services</li>
        <li>Resell or redistribute products without proper licensing</li>
        <li>Use our services to distribute malware or harmful content</li>
        <li>Engage in any activity that disrupts our services</li>
      </ul>
    `,
  },
  {
    title: 'Termination',
    content: `
      <p class="mb-4">We may terminate or suspend your account and access to our services:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>If you violate these terms</li>
        <li>If we suspect fraudulent activity</li>
        <li>If required by law</li>
        <li>At our sole discretion for any reason</li>
      </ul>
      <p class="mt-4">Upon termination, your right to use our services will immediately cease.</p>
    `,
  },
  {
    title: 'Limitation of Liability',
    content: `
      <p class="mb-4">To the maximum extent permitted by law:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Everytech shall not be liable for any indirect, incidental, or consequential damages</li>
        <li>Our total liability shall not exceed the amount you paid for the specific product or service</li>
        <li>We do not guarantee that our services will be uninterrupted or error-free</li>
        <li>We are not responsible for third-party content or services</li>
      </ul>
    `,
  },
];

export function Terms() {
  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Read Everytech's Terms of Service. By using our services, you agree to these terms and conditions."
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
                <FileText className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Terms of Service
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
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  Please read these Terms of Service carefully before using Everytech. 
                  By using our services, you agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border pb-8 last:border-0"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                  <div 
                    className="text-gray-400 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
            <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-coral" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
            <p className="text-gray-400 mb-6">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <a 
              href="mailto:legal@everytech.com"
              className="inline-flex items-center gap-2 text-coral hover:underline"
            >
              <Mail className="w-4 h-4" />
              legal@everytech.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
