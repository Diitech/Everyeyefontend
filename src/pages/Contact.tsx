import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, MapPin, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SEO } from '@/components/SEO';
import { GoogleMap } from '@/components/GoogleMap'; // ← ADD THIS LINE

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with our team. We're here to help with any questions or concerns."
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-coral/10 via-dark to-dark">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Get in <span className="text-coral">Touch</span>
              </h1>
              <p className="text-gray-400">
                Have a question or need help? We&apos;re here for you. 
                Reach out and we&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 -mt-10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Mail, title: 'Email Us', info: 'support@everytech.com', desc: 'For general inquiries' },
                { icon: MessageSquare, title: 'Live Chat', info: 'Available 9am-6pm EST', desc: 'Get instant help' },
                { icon: Clock, title: 'Response Time', info: 'Within 24 hours', desc: 'Usually much faster' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-100 rounded-xl p-6 border border-border text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-coral font-medium">{item.info}</p>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-dark-100 rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-1 bg-dark border-border text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1 bg-dark border-border text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="mt-1 bg-dark border-border text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-300">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="mt-1 bg-dark border-border text-white resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-coral hover:bg-coral-dark text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              {/* Info - UPDATED WITH MAP */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email Support</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        For general inquiries and support
                      </p>
                      <a href="mailto:support@everytech.com" className="text-coral hover:underline">
                        support@everytech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Office Location</h3>
                      <p className="text-gray-400 text-sm">
                        123 Tech Street, Suite 100<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>

                  {/* GOOGLE MAP SECTION - PASTE THIS */}
                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-3">Find Us on the Map</h3>
                    <GoogleMap 
                      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                      center={{ lat: 37.7749, lng: -122.4194 }}
                      zoom={15}
                      markerTitle="EveryTech Office"
                    />
                  </div>

                  <div className="bg-dark-100 rounded-xl p-6 border border-border mt-8">
                    <h3 className="text-white font-semibold mb-2">Business Inquiries</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      For partnerships, press, and business opportunities
                    </p>
                    <a href="mailto:business@everytech.com" className="text-coral hover:underline">
                      business@everytech.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}