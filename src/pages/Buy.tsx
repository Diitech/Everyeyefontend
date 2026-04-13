import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const features = [
  {
    icon: "🛍",
    title: "Complete frontend",
    desc: "Modern, responsive storefront built with React and Vite. Fast and mobile-ready.",
  },
  {
    icon: "⚙️",
    title: "Full backend",
    desc: "Node.js backend with API routes, authentication, and database integration.",
  },
  {
    icon: "💳",
    title: "Stripe payments",
    desc: "Secure checkout powered by Stripe. Accept cards from customers worldwide.",
  },
  {
    icon: "🚀",
    title: "Deploy-ready",
    desc: "Pre-configured for Vercel. Go live in minutes, not weeks.",
  },
  {
    icon: "🎨",
    title: "Fully customizable",
    desc: "Clean, well-structured codebase. Customize every part to fit your brand.",
  },
  {
    icon: "📦",
    title: "Source code included",
    desc: "You own it. Full source code with no recurring fees or subscriptions.",
  },
];

const includes = [
  "Full frontend + backend source code",
  "Stripe payment integration",
  "Vercel deploy configuration",
  "Commercial license included",
  "Documentation + setup guide",
];

const faqs = [
  {
    q: "What do I get after purchase?",
    a: "You get the complete source code — frontend and backend — along with a commercial license and documentation to help you get started.",
  },
  {
    q: "Do I need coding experience?",
    a: "Basic knowledge of JavaScript/React helps, but the project is well-documented and ready to deploy with minimal configuration.",
  },
  {
    q: "Can I use this for client projects?",
    a: "Yes. The commercial license allows you to use Everyshop for your own or client projects.",
  },
  {
    q: "Is there a refund policy?",
    a: "Since this is a digital product, all sales are final. Feel free to reach out before purchasing if you have any questions.",
  },
];

function Buy() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-dark to-dark pointer-events-none" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative"
        >
          <span className="inline-block bg-coral/10 text-coral text-sm px-4 py-1 rounded-full mb-6 border border-coral/20">
            Complete ecommerce solution
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            Launch your store with{" "}
            <span className="text-coral relative">
              Everyshop
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-coral/40 rounded-full" />
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            A full-stack ecommerce platform with frontend, backend, payments,
            and everything you need — ready to deploy out of the box.
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-coral text-white text-lg font-semibold px-10 py-4 rounded-xl hover:bg-coral/90 transition-colors shadow-lg shadow-coral/20"
          >
            Get Everyshop →
          </motion.a>
          <p className="text-gray-500 text-sm mt-4">
            One-time payment · Full source code included
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-center mb-12"
        >
          Everything included
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-coral/40 transition-colors group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-md mx-auto px-6 pb-24">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-center mb-12"
        >
          Pricing
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative bg-gradient-to-b from-white/10 to-white/5 border-2 border-coral rounded-3xl p-8 text-center shadow-2xl shadow-coral/10"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-coral text-white text-xs font-semibold px-4 py-1 rounded-full">
              Most popular
            </span>
          </div>
          <span className="inline-block bg-coral/10 text-coral text-sm px-4 py-1 rounded-full mb-4 border border-coral/20">
            One-time purchase
          </span>
          <div className="text-7xl font-bold text-white my-4">$799</div>
          <p className="text-gray-400 text-sm mb-8">Pay once, use forever</p>
          <ul className="text-left space-y-3 mb-8">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <span className="w-5 h-5 rounded-full bg-coral/20 text-coral flex items-center justify-center text-xs flex-shrink-0 font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <motion.a
            href="/checkout"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="block w-full bg-coral text-white text-lg font-semibold py-4 rounded-xl hover:bg-coral/90 transition-colors text-center shadow-lg shadow-coral/20"
          >
            Buy Everyshop now
          </motion.a>
          <p className="text-gray-500 text-xs mt-4">
            Secure payment · Instant delivery
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-28">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-center mb-12"
        >
          Common questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-coral/30 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-gradient-to-r from-coral/20 to-coral/5 border border-coral/20 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to launch your store?
          </h2>
          <p className="text-gray-400 mb-8">
            Join other entrepreneurs who already use Everyshop to sell online.
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-coral text-white text-lg font-semibold px-10 py-4 rounded-xl hover:bg-coral/90 transition-colors shadow-lg shadow-coral/20"
          >
            Get Everyshop →
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}

export default Buy;
