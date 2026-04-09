import { motion } from 'framer-motion';
import { Globe, UserX, FileDown, Shield, Check, Mail } from 'lucide-react';
import { SEO } from '@/components/SEO';

const rights = [
  {
    icon: UserX,
    title: 'Right to be Forgotten',
    description: 'You can request the deletion of your personal data from our systems.',
  },
  {
    icon: FileDown,
    title: 'Right to Data Portability',
    description: 'Request a copy of your data in a machine-readable format.',
  },
  {
    icon: Shield,
    title: 'Right to Object',
    description: 'Object to the processing of your personal data for specific purposes.',
  },
  {
    icon: Check,
    title: 'Right to Rectification',
    description: 'Request correction of inaccurate or incomplete personal data.',
  },
];

export function GDPR() {
  return (
    <>
      <SEO 
        title="GDPR Compliance"
        description="Everytech is committed to GDPR compliance. Learn about your data protection rights and how we protect your privacy."
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
                <Globe className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                GDPR Compliance
              </h1>
              <p className="text-gray-400">
                Everytech is committed to protecting your data privacy rights under the General Data Protection Regulation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 border-b border-border">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <p className="text-gray-400 leading-relaxed">
              The General Data Protection Regulation (GDPR) is a comprehensive data protection law 
              that applies to all organizations operating in the EU and processing personal data of 
              EU residents. Everytech is fully committed to GDPR compliance and protecting your privacy rights.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Your GDPR Rights</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rights.map((right, index) => {
                const Icon = right.icon;
                return (
                  <motion.div
                    key={right.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{right.title}</h3>
                    <p className="text-gray-400 text-sm">{right.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Exercise Your Rights */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">How to Exercise Your Rights</h2>
            <div className="space-y-6">
              <div className="bg-dark rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-white mb-3">1. Access Your Data</h3>
                <p className="text-gray-400">
                  You can access most of your personal data through your account settings. 
                  For a complete copy of all data we hold about you, email us at{' '}
                  <a href="mailto:privacy@everytech.com" className="text-coral hover:underline">
                    privacy@everytech.com
                  </a>.
                </p>
              </div>

              <div className="bg-dark rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-white mb-3">2. Delete Your Account</h3>
                <p className="text-gray-400">
                  You can delete your account and all associated data from your account settings. 
                  Alternatively, you can request deletion by contacting us. Please note that some 
                  data may be retained for legal or legitimate business purposes.
                </p>
              </div>

              <div className="bg-dark rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-white mb-3">3. Update Your Information</h3>
                <p className="text-gray-400">
                  You can update your personal information at any time through your account settings. 
                  This includes your name, email address, and communication preferences.
                </p>
              </div>

              <div className="bg-dark rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-white mb-3">4. Opt Out of Marketing</h3>
                <p className="text-gray-400">
                  You can unsubscribe from marketing emails at any time by clicking the 
                  &quot;unsubscribe&quot; link at the bottom of any marketing email, or by updating 
                  your preferences in your account settings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Processing */}
        <section className="py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">How We Process Your Data</h2>
            <div className="bg-dark-100 rounded-xl p-8 border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Legal Basis for Processing</h3>
                  <p className="text-gray-400">
                    We process your personal data based on one or more of the following legal grounds:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                    <li>Performance of a contract (providing our services)</li>
                    <li>Your consent (for marketing communications)</li>
                    <li>Legal obligations (tax and accounting requirements)</li>
                    <li>Legitimate interests (improving our services)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Data Retention</h3>
                  <p className="text-gray-400">
                    We retain your personal data only for as long as necessary to fulfill the purposes 
                    for which it was collected, including legal, accounting, or reporting requirements. 
                    Typically, we retain account data for as long as your account is active, plus a 
                    reasonable period thereafter.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">International Transfers</h3>
                  <p className="text-gray-400">
                    Your data may be transferred to and processed in countries outside the European 
                    Economic Area (EEA). We ensure appropriate safeguards are in place to protect your 
                    data in accordance with GDPR requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
            <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-coral" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Data Protection Officer</h2>
            <p className="text-gray-400 mb-6">
              For any questions or concerns about your data privacy rights, please contact our 
              Data Protection Officer.
            </p>
            <a 
              href="mailto:dpo@everytech.com"
              className="inline-flex items-center gap-2 text-coral hover:underline"
            >
              <Mail className="w-4 h-4" />
              dpo@everytech.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
