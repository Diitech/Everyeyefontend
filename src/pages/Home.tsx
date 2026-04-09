import { SEO } from '@/components/SEO';
import { Hero } from '@/sections/Hero';
import { Categories } from '@/sections/Categories';
import { Bestsellers } from '@/sections/Bestsellers';
import { NewArrivals } from '@/sections/NewArrivals';
import { Trending } from '@/sections/Trending';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Testimonials } from '@/sections/Testimonials';
import { Pricing } from '@/sections/Pricing';
import { Blog } from '@/sections/Blog';

export function Home() {
  return (
    <>
      <SEO
  title="Premium Digital Products Marketplace"
  description="Discover and download premium digital products — templates, courses, AI tools, business systems and more. Instant downloads, lifetime updates, 30-day guarantee."
  keywords="digital products marketplace, premium templates, online courses, AI tools, business systems, design assets"
  ogType="website"
/>
      <main>
        <Hero />
        <Categories />
        <Bestsellers />
        <NewArrivals />
        <Trending />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <Blog />
      </main>
    </>
  );
}
