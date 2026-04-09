import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Twitter, Linkedin, Facebook, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/SEO';
import { blogPosts } from '@/data';
import { useEffect } from 'react';

// Extended blog content
const blogContent: Record<string, { content: string; tags: string[] }> = {
  'build-7-figure-digital-product-business': {
    content: `
      <p class="text-lg text-gray-300 mb-6">Building a successful digital product business isn't just about creating great products—it's about understanding your audience, marketing effectively, and building systems that scale. In this comprehensive guide, we'll walk you through the exact strategies used by top creators to build profitable digital product businesses from scratch.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">1. Find Your Niche</h2>
      <p class="text-gray-400 mb-4">The first step to building a successful digital product business is finding the right niche. You want to find a market that:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Has a specific problem that needs solving</li>
        <li>Is willing to pay for solutions</li>
        <li>Is large enough to sustain your business</li>
        <li>Aligns with your skills and interests</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">2. Validate Your Idea</h2>
      <p class="text-gray-400 mb-4">Before investing months into building a product, validate that people actually want it. Here are some ways to validate:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Create a landing page and measure interest</li>
        <li>Talk to potential customers</li>
        <li>Run a small paid ad campaign</li>
        <li>Build a minimum viable product (MVP)</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">3. Create High-Quality Products</h2>
      <p class="text-gray-400 mb-4">Quality is everything in the digital product space. Your products should:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Solve a real problem</li>
        <li>Be well-designed and professional</li>
        <li>Include clear documentation</li>
        <li>Be regularly updated</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">4. Build Your Audience</h2>
      <p class="text-gray-400 mb-4">An audience is your most valuable asset. Focus on:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Creating valuable free content</li>
        <li>Building an email list</li>
        <li>Engaging on social media</li>
        <li>Collaborating with others in your niche</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">5. Market Effectively</h2>
      <p class="text-gray-400 mb-4">Great products need great marketing. Consider:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Content marketing and SEO</li>
        <li>Social media marketing</li>
        <li>Paid advertising</li>
        <li>Affiliate partnerships</li>
        <li>Email marketing campaigns</li>
      </ul>
      
      <div class="bg-coral/10 border border-coral/30 rounded-xl p-6 my-8">
        <p class="text-white font-semibold mb-2">Key Takeaway</p>
        <p class="text-gray-400">Building a 7-figure digital product business takes time, but by following these strategies and staying consistent, you can create a sustainable income stream that grows year after year.</p>
      </div>
    `,
    tags: ['Business', 'Entrepreneurship', 'Digital Products', 'Marketing', 'Growth']
  },
  'complete-guide-design-systems-2026': {
    content: `
      <p class="text-lg text-gray-300 mb-6">Design systems have become essential for modern product teams. They ensure consistency, speed up development, and create better user experiences. This guide covers everything you need to know about creating, maintaining, and scaling design systems in 2026.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">What is a Design System?</h2>
      <p class="text-gray-400 mb-4">A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It includes:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>UI components and patterns</li>
        <li>Design tokens (colors, typography, spacing)</li>
        <li>Documentation and guidelines</li>
        <li>Code implementation</li>
        <li>Design tools and resources</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Why Design Systems Matter</h2>
      <p class="text-gray-400 mb-4">Design systems provide numerous benefits:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li><strong class="text-white">Consistency:</strong> Users have a predictable experience across all touchpoints</li>
        <li><strong class="text-white">Efficiency:</strong> Teams work faster with reusable components</li>
        <li><strong class="text-white">Scalability:</strong> Easy to add new features without reinventing the wheel</li>
        <li><strong class="text-white">Quality:</strong> Higher quality output with tested, proven components</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Building Your Design System</h2>
      <p class="text-gray-400 mb-4">Follow these steps to create a successful design system:</p>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">1. Audit Your Current State</h3>
      <p class="text-gray-400 mb-4">Start by documenting all existing UI elements across your products. Identify inconsistencies and opportunities for standardization.</p>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">2. Define Design Tokens</h3>
      <p class="text-gray-400 mb-4">Create a single source of truth for colors, typography, spacing, and other visual properties.</p>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">3. Build Core Components</h3>
      <p class="text-gray-400 mb-4">Start with the most frequently used components: buttons, inputs, cards, navigation.</p>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">4. Document Everything</h3>
      <p class="text-gray-400 mb-4">Good documentation is crucial for adoption. Include usage guidelines, code examples, and do's and don'ts.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Maintaining Your Design System</h2>
      <p class="text-gray-400 mb-4">A design system is a living product that needs ongoing care:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Establish a governance model</li>
        <li>Create a contribution process</li>
        <li>Regularly review and update components</li>
        <li>Gather feedback from users</li>
        <li>Measure adoption and impact</li>
      </ul>
    `,
    tags: ['Design', 'UI/UX', 'Design Systems', 'Product Design', 'Frontend']
  },
  'ai-tools-transform-creative-workflow': {
    content: `
      <p class="text-lg text-gray-300 mb-6">Artificial Intelligence is revolutionizing how creatives work. From generating images to writing copy, AI tools are becoming indispensable in the creative workflow. Here's how to integrate AI into your process for maximum efficiency.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">The AI Revolution in Creative Work</h2>
      <p class="text-gray-400 mb-4">AI isn't replacing creatives—it's empowering them. By automating repetitive tasks and providing new creative possibilities, AI tools allow creatives to focus on what they do best: creative thinking and strategic decision-making.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Essential AI Tools for Creatives</h2>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">Image Generation</h3>
      <p class="text-gray-400 mb-4">Tools like Midjourney, DALL-E, and Stable Diffusion can generate stunning visuals from text descriptions. Use them for:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Concept art and ideation</li>
        <li>Background images and textures</li>
        <li>Marketing visuals</li>
        <li>Social media content</li>
      </ul>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">Copywriting and Content</h3>
      <p class="text-gray-400 mb-4">ChatGPT and similar tools can help with:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Brainstorming ideas</li>
        <li>Writing first drafts</li>
        <li>Editing and improving copy</li>
        <li>Generating variations</li>
      </ul>
      
      <h3 class="text-xl font-semibold text-white mt-6 mb-3">Code Assistance</h3>
      <p class="text-gray-400 mb-4">AI coding assistants can:</p>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li>Write boilerplate code</li>
        <li>Debug issues</li>
        <li>Explain complex concepts</li>
        <li>Generate documentation</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Best Practices for Using AI</h2>
      <ul class="list-disc list-inside text-gray-400 mb-6 space-y-2">
        <li><strong class="text-white">Start with clear prompts:</strong> The quality of AI output depends on the quality of your input</li>
        <li><strong class="text-white">Iterate and refine:</strong> Use AI output as a starting point, not a final product</li>
        <li><strong class="text-white">Maintain creative control:</strong> AI is a tool, not a replacement for human creativity</li>
        <li><strong class="text-white">Stay ethical:</strong> Be transparent about AI usage and respect copyright</li>
      </ul>
      
      <div class="bg-coral/10 border border-coral/30 rounded-xl p-6 my-8">
        <p class="text-white font-semibold mb-2">The Future is AI-Assisted</p>
        <p class="text-gray-400">Creatives who learn to work with AI will have a significant advantage. Start experimenting with AI tools today to stay ahead of the curve.</p>
      </div>
    `,
    tags: ['AI', 'Technology', 'Creativity', 'Productivity', 'Tools']
  }
};

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);
  const extendedContent = slug ? blogContent[slug] : null;
  
  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Header */}
        <section className="py-12 border-b border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-16">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-16">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: extendedContent?.content || `<p class="text-gray-400">${post.excerpt}</p>` 
              }}
            />

            {/* Tags */}
            {extendedContent?.tags && (
              <div className="mt-10 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {extendedContent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-dark-100 text-gray-400 text-sm rounded-full border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-gray-400 text-sm mb-3">Share this article</p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-coral/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-coral/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-coral/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-coral/20 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-dark-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <h2 className="text-2xl font-bold text-white mb-8">More Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <div className="bg-dark rounded-xl overflow-hidden border border-border hover:border-coral/50 transition-colors">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold group-hover:text-coral transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
