import { motion } from 'framer-motion';
import { Newspaper, Download, Image, FileText, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';

const pressAssets = [
  {
    title: 'Brand Logo',
    desc: 'PNG and SVG formats in various sizes',
    icon: Image,
    formats: ['PNG', 'SVG'],
  },
  {
    title: 'Brand Guidelines',
    desc: 'Colors, typography, and usage guidelines',
    icon: FileText,
    formats: ['PDF'],
  },
  {
    title: 'Product Screenshots',
    desc: 'High-resolution product images',
    icon: Image,
    formats: ['PNG'],
  },
  {
    title: 'Team Photos',
    desc: 'Executive team headshots',
    icon: Image,
    formats: ['JPG'],
  },
];

const pressReleases = [
  {
    date: 'March 1, 2026',
    title: 'Everytech Reaches 50,000 Customers Milestone',
    excerpt: 'Digital marketplace celebrates major growth milestone...',
  },
  {
    date: 'February 15, 2026',
    title: 'Everytech Launches New AI Tools Category',
    excerpt: 'Expanded offerings include ChatGPT prompts and AI workflows...',
  },
  {
    date: 'January 10, 2026',
    title: 'Everytech Announces $5M Series A Funding',
    excerpt: 'Investment will accelerate product development and team growth...',
  },
];

const mediaCoverage = [
  { outlet: 'TechCrunch', title: 'Everytech is changing how creators buy digital assets' },
  { outlet: 'Forbes', title: 'The rise of curated digital marketplaces' },
  { outlet: 'Product Hunt', title: 'Everytech: Premium digital assets for creators' },
];

export function PressKit() {
  return (
    <>
      <SEO 
        title="Press Kit"
        description="Download Everytech brand assets, read press releases, and find media coverage. For press inquiries, contact our team."
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
                <Newspaper className="w-8 h-8 text-coral" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Press <span className="text-coral">Kit</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Download brand assets, read our story, and get the latest news about Everytech.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-white mb-8">Brand Assets</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pressAssets.map((asset, index) => {
                const Icon = asset.icon;
                return (
                  <motion.div
                    key={asset.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{asset.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{asset.desc}</p>
                    <div className="flex gap-2 mb-4">
                      {asset.formats.map((format) => (
                        <span key={format} className="text-xs text-coral bg-coral/10 px-2 py-1 rounded">
                          {format}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-border text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">About Everytech</h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    Everytech is a premium digital marketplace that empowers creators and entrepreneurs 
                    with high-quality templates, courses, AI tools, and design assets.
                  </p>
                  <p>
                    Founded in 2023, we&apos;ve grown to serve over 50,000 customers worldwide, 
                    offering 500+ carefully curated products from 100+ expert creators.
                  </p>
                  <p>
                    Our mission is to make professional-grade digital assets accessible to everyone, 
                    helping creators bring their ideas to life faster and better.
                  </p>
                </div>
              </div>
              <div className="bg-dark rounded-xl p-8 border border-border">
                <h3 className="text-xl font-semibold text-white mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Founded', value: '2023' },
                    { label: 'Headquarters', value: 'San Francisco, CA' },
                    { label: 'Employees', value: '25+' },
                    { label: 'Customers', value: '50,000+' },
                    { label: 'Products', value: '500+' },
                    { label: 'Countries', value: '120+' },
                  ].map((fact) => (
                    <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-gray-400">{fact.label}</span>
                      <span className="text-white font-medium">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-white mb-8">Press Releases</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-100 rounded-xl p-6 border border-border hover:border-coral/50 transition-colors"
                >
                  <span className="text-coral text-sm">{release.date}</span>
                  <h3 className="text-white font-semibold text-lg mt-1 mb-2">{release.title}</h3>
                  <p className="text-gray-400 text-sm">{release.excerpt}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-white mb-8">Media Coverage</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaCoverage.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark rounded-xl p-6 border border-border"
                >
                  <span className="text-coral text-sm font-medium">{article.outlet}</span>
                  <h3 className="text-white font-semibold mt-2 mb-4">{article.title}</h3>
                  <a href="#" className="inline-flex items-center gap-1 text-gray-400 hover:text-coral text-sm">
                    Read Article
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-gradient-to-r from-coral/20 to-coral/5 rounded-2xl p-8 md:p-12 text-center border border-coral/20">
              <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-coral" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Press Inquiries
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                For press inquiries, interview requests, or additional information, 
                please contact our communications team.
              </p>
              <a 
                href="mailto:press@everytech.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                press@everytech.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
