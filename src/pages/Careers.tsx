import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, Heart, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/SEO';

const benefits = [
  { icon: DollarSign, title: 'Competitive Salary', desc: 'Above-market compensation' },
  { icon: Heart, title: 'Health Benefits', desc: 'Medical, dental, and vision' },
  { icon: Clock, title: 'Flexible Hours', desc: 'Work when you\'re most productive' },
  { icon: Zap, title: 'Learning Budget', desc: '$2,000/year for courses and books' },
  { icon: Users, title: 'Team Retreats', desc: 'Annual company getaways' },
  { icon: MapPin, title: 'Remote First', desc: 'Work from anywhere' },
];

const openings = [
  {
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
  },
  {
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $180k',
  },
  {
    title: 'Content Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $120k',
  },
  {
    title: 'Customer Success Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60k - $80k',
  },
];

export function Careers() {
  return (
    <>
      <SEO 
        title="Careers"
        description="Join the Everytech team. We're hiring talented people who are passionate about empowering creators worldwide."
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
                Join Our <span className="text-coral">Team</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                We&apos;re building the future of digital assets. Come create with us.
              </p>
              <a 
                href="#openings"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
              >
                View Openings
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Why Work at Everytech?</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                We believe in creating an environment where talented people can do their best work
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Openings */}
        <section id="openings" className="py-16 bg-dark-100">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark rounded-xl p-6 border border-border hover:border-coral/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <Badge variant="outline" className="border-border text-gray-400">
                          {job.department}
                        </Badge>
                        <span className="flex items-center gap-1 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1 text-coral">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-coral hover:bg-coral-dark text-white">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="bg-gradient-to-r from-coral/20 to-coral/5 rounded-2xl p-8 md:p-12 text-center border border-coral/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Don&apos;t See the Right Fit?
              </h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
              </p>
              <a 
                href="mailto:careers@everytech.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-lg transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Send Resume
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
