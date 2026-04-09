import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Globe, Award } from 'lucide-react';
import { SEO } from '@/components/SEO';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '500+', label: 'Digital Products' },
  { value: '100+', label: 'Expert Creators' },
  { value: '4.9', label: 'Average Rating' },
];

const values = [
  { 
    icon: Target, 
    title: 'Our Mission', 
    desc: 'To empower creators and entrepreneurs with the tools they need to build, learn, and grow. We believe everyone deserves access to high-quality digital resources.' 
  },
  { 
    icon: Eye, 
    title: 'Our Vision', 
    desc: 'To become the world&apos;s most trusted marketplace for digital assets, where creators can find everything they need to bring their ideas to life.' 
  },
  { 
    icon: Heart, 
    title: 'Our Values', 
    desc: 'Quality, accessibility, and community. We curate only the best products, make them affordable, and build a supportive ecosystem for creators.' 
  },
];

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Sarah Miller', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'James Wilson', role: 'Lead Designer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Emma Davis', role: 'Marketing Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

export function About() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Everytech's mission to empower creators with premium digital assets. Meet our team and discover our story."
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Empowering <span className="text-coral">Creators</span> Worldwide
              </h1>
              <p className="text-lg text-gray-400">
                Everytech was founded with a simple mission: to make high-quality digital assets 
                accessible to everyone. From templates to courses, we&apos;re here to help you create.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 -mt-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-dark-100 rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-3xl sm:text-4xl font-bold text-coral mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    Everytech started in 2023 when our founder, Alex Chen, noticed a gap in the market. 
                    Creators needed high-quality digital assets, but existing marketplaces were either 
                    too expensive or lacked curation.
                  </p>
                  <p>
                    We set out to build something different: a marketplace that puts creators first. 
                    Where every product is carefully vetted, prices are fair, and the community comes 
                    together to help each other succeed.
                  </p>
                  <p>
                    Today, Everytech is home to over 500 premium products from 100+ expert creators. 
                    We&apos;ve helped 50,000+ customers bring their projects to life, and we&apos;re just getting started.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-dark-100 rounded-xl p-6 border border-border">
                    <Globe className="w-8 h-8 text-coral mb-3" />
                    <p className="text-white font-semibold">Global Reach</p>
                    <p className="text-gray-400 text-sm">Customers in 120+ countries</p>
                  </div>
                  <div className="bg-dark-100 rounded-xl p-6 border border-border">
                    <Award className="w-8 h-8 text-coral mb-3" />
                    <p className="text-white font-semibold">Top Rated</p>
                    <p className="text-gray-400 text-sm">4.9/5 average rating</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-dark-100 rounded-xl p-6 border border-border">
                    <Users className="w-8 h-8 text-coral mb-3" />
                    <p className="text-white font-semibold">Growing Community</p>
                    <p className="text-gray-400 text-sm">100+ expert creators</p>
                  </div>
                  <div className="bg-dark-100 rounded-xl p-6 border border-border">
                    <Heart className="w-8 h-8 text-coral mb-3" />
                    <p className="text-white font-semibold">Creator First</p>
                    <p className="text-gray-400 text-sm">Fair revenue sharing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What We Stand For</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Our values guide everything we do at Everytech
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark rounded-xl p-8 border border-border text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-coral" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                The passionate people behind Everytech
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-coral/30">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
