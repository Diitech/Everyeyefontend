import type { Product, Category, Testimonial, BlogPost, PricingPlan, NavItem, Review } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Templates & Design',
    description: 'High-converting templates and design systems for your projects',
    productCount: 234,
    priceRange: '$39 - $299',
    icon: 'Layout',
    slug: 'templates-design'
  },
  {
    id: '2',
    name: 'Online Courses',
    description: 'Learn from industry experts with comprehensive courses',
    productCount: 89,
    priceRange: '$49 - $997',
    icon: 'GraduationCap',
    slug: 'online-courses'
  },
  {
    id: '3',
    name: 'Business Systems',
    description: 'Automate and streamline your business operations',
    productCount: 67,
    priceRange: '$29 - $497',
    icon: 'Briefcase',
    slug: 'business-systems'
  },
  {
    id: '4',
    name: 'Creative Assets',
    description: 'Icons, fonts, textures, and graphics to elevate your projects',
    productCount: 234,
    priceRange: '$39 - $299',
    icon: 'Palette',
    slug: 'creative-assets'
  },
  {
    id: '5',
    name: 'AI Tools & Prompts',
    description: 'Cutting-edge AI prompts and tools to supercharge your workflow',
    productCount: 89,
    priceRange: '$19 - $149',
    icon: 'Sparkles',
    slug: 'ai-tools'
  },
  {
    id: '6',
    name: 'Memberships',
    description: 'Exclusive access to our full library with new content monthly',
    productCount: 3,
    priceRange: '$29/month',
    icon: 'Crown',
    slug: 'memberships'
  }
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Landing Page Pro Kit',
    description: 'Convert visitors into customers with these high-converting landing page templates',
    price: 149,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 328,
    category: 'Templates & Design',
    subcategory: 'templates',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80'
    ],
    features: [
      '50+ landing page templates',
      'Figma + React + Next.js files',
      'Mobile responsive design',
      'Conversion-optimized layouts',
      'Lifetime updates'
    ],
    includes: [
      '50+ Landing Page Templates',
      'Design System File',
      'Component Library',
      'Documentation',
      'Video Tutorials'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-15',
    salesCount: 15420,
    downloadUrl: '#',
    fileSize: '2.4 GB',
    fileFormat: ['Figma', 'React', 'Next.js', 'HTML/CSS']
  },
  {
    id: '2',
    title: 'SaaS Dashboard UI Kit',
    description: 'Complete dashboard interface kit for SaaS applications',
    price: 199,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 256,
    category: 'Templates & Design',
    subcategory: 'templates',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    features: [
      '100+ dashboard components',
      'Dark & light themes',
      'Data visualization charts',
      'User management screens',
      'Settings panels'
    ],
    includes: [
      '100+ UI Components',
      'Chart Library',
      'Icon Set',
      'Color System',
      'Typography Guide'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-02-01',
    salesCount: 8930,
    downloadUrl: '#',
    fileSize: '1.8 GB',
    fileFormat: ['Figma', 'React', 'Vue', 'Angular']
  },
  {
    id: '3',
    title: 'Investor Pitch Deck Pro',
    description: 'Win over investors with professionally designed pitch deck templates',
    price: 129,
    originalPrice: 259,
    rating: 4.9,
    reviewCount: 412,
    category: 'Templates & Design',
    subcategory: 'templates',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    features: [
      '20+ pitch deck templates',
      'Investor-tested layouts',
      'Financial slide templates',
      'Team slide designs',
      'Exit strategy slides'
    ],
    includes: [
      '20+ Pitch Decks',
      'Financial Templates',
      'Icon Library',
      'Color Palettes',
      'Presentation Guide'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-20',
    salesCount: 12150,
    downloadUrl: '#',
    fileSize: '890 MB',
    fileFormat: ['PowerPoint', 'Keynote', 'Google Slides', 'Figma']
  },
  {
    id: '4',
    title: 'Design System Masterclass',
    description: 'Learn to build scalable design systems from scratch',
    price: 497,
    originalPrice: 997,
    rating: 4.9,
    reviewCount: 189,
    category: 'Online Courses',
    subcategory: 'courses',
    badge: 'featured',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    features: [
      '40+ hours of video content',
      'Real-world case studies',
      'Figma design files',
      'Component library',
      'Certificate of completion'
    ],
    includes: [
      '40+ Video Lessons',
      'Design System Files',
      'Exercise Files',
      'Community Access',
      '1-on-1 Mentorship'
    ],
    license: 'Personal Use License',
    createdAt: '2025-01-10',
    salesCount: 3240,
    downloadUrl: '#',
    fileSize: '12 GB',
    fileFormat: ['Video', 'Figma', 'PDF']
  },
  {
    id: '5',
    title: 'Course Creation Blueprint',
    description: 'Launch your own profitable online course from scratch',
    price: 697,
    originalPrice: 1297,
    rating: 4.9,
    reviewCount: 92,
    category: 'Online Courses',
    subcategory: 'courses',
    badge: 'featured',
    discount: 46,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    features: [
      'Complete course framework',
      'Marketing strategies',
      'Sales funnel templates',
      'Email sequences',
      'Launch checklist'
    ],
    includes: [
      '30+ Video Lessons',
      'Course Templates',
      'Marketing Scripts',
      'Sales Pages',
      'Email Swipes'
    ],
    license: 'Personal Use License',
    createdAt: '2025-02-05',
    salesCount: 1870,
    downloadUrl: '#',
    fileSize: '8.5 GB',
    fileFormat: ['Video', 'PDF', 'Notion']
  },
  {
    id: '6',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Become a full-stack developer in 12 weeks',
    price: 997,
    originalPrice: 1997,
    rating: 4.8,
    reviewCount: 156,
    category: 'Online Courses',
    subcategory: 'courses',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    features: [
      '12-week structured curriculum',
      'Real project building',
      'Code reviews',
      'Job placement support',
      'Lifetime access'
    ],
    includes: [
      '120+ Video Lessons',
      'Project Files',
      'Code Repository',
      'Certificate',
      'Career Support'
    ],
    license: 'Personal Use License',
    createdAt: '2025-01-05',
    salesCount: 4230,
    downloadUrl: '#',
    fileSize: '25 GB',
    fileFormat: ['Video', 'Code', 'PDF']
  },
  {
    id: '7',
    title: 'Business Automation Suite',
    description: 'Automate your workflows and save 10+ hours every week',
    price: 297,
    originalPrice: 597,
    rating: 4.9,
    reviewCount: 145,
    category: 'Business Systems',
    subcategory: 'automation',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    features: [
      '50+ automation templates',
      'Zapier workflows',
      'Make.com scenarios',
      'Notion systems',
      'Email automation'
    ],
    includes: [
      '50+ Automation Templates',
      'Workflow Library',
      'Setup Guides',
      'Video Tutorials',
      'Support Community'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-25',
    salesCount: 6780,
    downloadUrl: '#',
    fileSize: '1.2 GB',
    fileFormat: ['Notion', 'Zapier', 'Make', 'PDF']
  },
  {
    id: '8',
    title: 'Sales Funnel Blueprint',
    description: 'Complete sales funnel templates and automation workflows',
    price: 347,
    originalPrice: 697,
    rating: 4.9,
    reviewCount: 123,
    category: 'Business Systems',
    subcategory: 'automation',
    badge: 'featured',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800&q=80',
    features: [
      'High-converting funnel templates',
      'Landing page designs',
      'Email sequences',
      'Upsell pages',
      'Thank you pages'
    ],
    includes: [
      '20+ Funnel Templates',
      'Email Swipes',
      'Copy Templates',
      'Design Files',
      'Analytics Dashboard'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-02-10',
    salesCount: 3450,
    downloadUrl: '#',
    fileSize: '2.1 GB',
    fileFormat: ['Figma', 'HTML', 'Notion']
  },
  {
    id: '9',
    title: 'Complete Brand Identity Kit',
    description: 'Everything you need to create a professional brand identity',
    price: 249,
    originalPrice: 499,
    rating: 4.8,
    reviewCount: 234,
    category: 'Creative Assets',
    subcategory: 'assets',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    features: [
      'Logo templates',
      'Brand guidelines',
      'Business card designs',
      'Social media kit',
      'Letterhead templates'
    ],
    includes: [
      '100+ Logo Templates',
      'Brand Guidelines',
      'Social Media Kit',
      'Stationery Set',
      'Color Palettes'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-18',
    salesCount: 8920,
    downloadUrl: '#',
    fileSize: '3.5 GB',
    fileFormat: ['AI', 'PSD', 'Figma', 'PDF']
  },
  {
    id: '10',
    title: 'Mockup Mega Pack',
    description: '1000+ realistic mockups for showcasing your designs',
    price: 169,
    originalPrice: 339,
    rating: 4.8,
    reviewCount: 278,
    category: 'Creative Assets',
    subcategory: 'assets',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    features: [
      '1000+ mockup templates',
      'Device mockups',
      'Packaging mockups',
      'Apparel mockups',
      'Print mockups'
    ],
    includes: [
      '1000+ Mockup Files',
      'Smart Objects',
      'Scene Creators',
      'Texture Library',
      'Tutorial Videos'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-12',
    salesCount: 11230,
    downloadUrl: '#',
    fileSize: '45 GB',
    fileFormat: ['PSD', 'Sketch', 'Figma']
  },
  {
    id: '11',
    title: 'ChatGPT Business Pack',
    description: '1000+ prompts to automate your business with ChatGPT',
    price: 97,
    originalPrice: 197,
    rating: 4.9,
    reviewCount: 445,
    category: 'AI Tools & Prompts',
    subcategory: 'ai',
    badge: 'bestseller',
    discount: 51,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    features: [
      '1000+ curated prompts',
      'Business categories',
      'Marketing prompts',
      'Sales prompts',
      'Content creation prompts'
    ],
    includes: [
      '1000+ Prompts',
      'Category Guide',
      'Usage Examples',
      'Notion Template',
      'Update Access'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-08',
    salesCount: 15670,
    downloadUrl: '#',
    fileSize: '45 MB',
    fileFormat: ['Notion', 'PDF', 'CSV']
  },
  {
    id: '12',
    title: 'AI Image Generation Prompts',
    description: 'Master AI image generation with 500+ expert prompts',
    price: 79,
    originalPrice: 159,
    rating: 4.9,
    reviewCount: 567,
    category: 'AI Tools & Prompts',
    subcategory: 'ai',
    badge: 'featured',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1686191128892-3b37add4a934?w=800&q=80',
    features: [
      '500+ AI image prompts',
      'Midjourney optimized',
      'DALL-E prompts',
      'Stable Diffusion',
      'Style categories'
    ],
    includes: [
      '500+ Prompts',
      'Style Guide',
      'Parameter Guide',
      'Example Gallery',
      'Update Access'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-02-15',
    salesCount: 9870,
    downloadUrl: '#',
    fileSize: '120 MB',
    fileFormat: ['Notion', 'PDF']
  },
  {
    id: '13',
    title: 'E-Commerce Mega Kit',
    description: 'Everything you need to build a successful online store',
    price: 179,
    originalPrice: 359,
    rating: 4.8,
    reviewCount: 312,
    category: 'Templates & Design',
    subcategory: 'templates',
    badge: 'new',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    features: [
      'Shopify themes',
      'Product page templates',
      'Checkout optimizations',
      'Email templates',
      'Marketing assets'
    ],
    includes: [
      '10+ Shopify Themes',
      'Product Templates',
      'Email Sequences',
      'Ad Creatives',
      'Setup Guide'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-03-01',
    salesCount: 2340,
    downloadUrl: '#',
    fileSize: '4.2 GB',
    fileFormat: ['Shopify', 'Figma', 'HTML']
  },
  {
    id: '14',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of great user interface and experience design',
    price: 297,
    originalPrice: 597,
    rating: 4.8,
    reviewCount: 178,
    category: 'Online Courses',
    subcategory: 'courses',
    badge: 'new',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80',
    features: [
      '25+ hours of content',
      'Design principles',
      'Figma mastery',
      'Portfolio projects',
      'Industry insights'
    ],
    includes: [
      '25+ Video Lessons',
      'Project Files',
      'Design Resources',
      'Certificate',
      'Community Access'
    ],
    license: 'Personal Use License',
    createdAt: '2025-03-05',
    salesCount: 1560,
    downloadUrl: '#',
    fileSize: '6.8 GB',
    fileFormat: ['Video', 'Figma']
  },
  {
    id: '15',
    title: 'Finance Tracking Suite',
    description: 'Track income, expenses, and financial goals with ease',
    price: 127,
    originalPrice: 257,
    rating: 4.8,
    reviewCount: 201,
    category: 'Business Systems',
    subcategory: 'automation',
    badge: 'new',
    discount: 51,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    features: [
      'Budget templates',
      'Expense tracker',
      'Invoice system',
      'Financial dashboards',
      'Tax preparation'
    ],
    includes: [
      'Notion Finance Hub',
      'Spreadsheet Templates',
      'Invoice Generator',
      'Dashboard Views',
      'Video Guides'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-03-08',
    salesCount: 1890,
    downloadUrl: '#',
    fileSize: '890 MB',
    fileFormat: ['Notion', 'Excel', 'Google Sheets']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Everytech saves me half a day on every client site. The templates are incredibly well-designed and easy to customize.',
    author: 'Mina Chen',
    role: 'Freelance Designer'
  },
  {
    id: '2',
    quote: 'Clean, modern, and actually useful. I\'ve purchased over 20 products and every single one has delivered value.',
    author: 'Jared Miller',
    role: 'Founder, TechStart'
  },
  {
    id: '3',
    quote: 'Our go-to for quick client deliverables. The quality is consistently outstanding and the support is fantastic.',
    author: 'Sofia Rodriguez',
    role: 'Creative Lead'
  },
  {
    id: '4',
    quote: 'Worth it for the courses alone. The Design System Masterclass completely transformed how I approach my work.',
    author: 'Leo Park',
    role: 'Product Designer'
  },
  {
    id: '5',
    quote: 'The AI tools have revolutionized our content creation process. We\'ve cut our production time in half!',
    author: 'Emma Watson',
    role: 'Marketing Director'
  },
  {
    id: '6',
    quote: 'Best investment for my startup. The business automation suite paid for itself in the first week.',
    author: 'David Kim',
    role: 'Startup Founder'
  },
  {
    id: '7',
    quote: 'The icon system alone is worth the membership. Professional quality and always expanding.',
    author: 'Sarah Johnson',
    role: 'UI/UX Designer'
  },
  {
    id: '8',
    quote: 'My store conversion rate increased 40% after using their e-commerce templates. Highly recommend!',
    author: 'Michael Chen',
    role: 'E-commerce Owner'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Build a 7-Figure Digital Product Business',
    excerpt: 'Learn the exact strategies used by top creators to build profitable digital product businesses from scratch.',
    category: 'Business',
    author: 'Everytech Team',
    readTime: '8 min read',
    date: 'Feb 20, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    slug: 'build-7-figure-digital-product-business'
  },
  {
    id: '2',
    title: 'The Complete Guide to Design Systems in 2026',
    excerpt: 'Everything you need to know about creating, maintaining, and scaling design systems for modern products.',
    category: 'Design',
    author: 'Sarah Johnson',
    readTime: '12 min read',
    date: 'Feb 15, 2026',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    slug: 'complete-guide-design-systems-2026'
  },
  {
    id: '3',
    title: 'AI Tools That Will Transform Your Creative Workflow',
    excerpt: 'Discover the most powerful AI tools and how to integrate them into your creative process for maximum efficiency.',
    category: 'AI & Tech',
    author: 'Mike Chen',
    readTime: '6 min read',
    date: 'Feb 10, 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    slug: 'ai-tools-transform-creative-workflow'
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Starter',
    price: 0,
    period: 'month',
    description: 'Perfect for trying out our products',
    features: [
      'Access to free products',
      'Monthly newsletter',
      'Community access',
      'Premium products',
      'Commercial license',
      'Priority support'
    ],
    ctaText: 'Join Free'
  },
  {
    id: '2',
    name: 'Pro',
    price: 29,
    period: 'month',
    description: 'Best for individual creators',
    features: [
      'Everything in Starter',
      'Full product library access',
      'Commercial license',
      'New drops every month',
      'Priority support',
      'Exclusive discounts'
    ],
    highlighted: true,
    ctaText: 'Go Pro'
  },
  {
    id: '3',
    name: 'Team',
    price: 99,
    period: 'month',
    description: 'For agencies and teams',
    features: [
      'Everything in Pro',
      '5 team seats included',
      'Shared workspace',
      'Team analytics',
      'Dedicated account manager',
      'Custom licensing'
    ],
    ctaText: 'Contact Sales'
  }
];

export const navItems: NavItem[] = [
  {
    label: 'Learn',
    href: '/learn',
    children: [
      { label: 'All Courses', href: '/learn' },
      { label: 'Design', href: '/learn?category=design' },
      { label: 'Development', href: '/learn?category=development' },
      { label: 'Business', href: '/learn?category=business' }
    ]
  },
  {
    label: 'Create',
    href: '/create',
    children: [
      { label: 'Templates', href: '/create?category=templates' },
      { label: 'Design Assets', href: '/create?category=assets' },
      { label: 'Mockups', href: '/create?category=mockups' }
    ]
  },
  {
    label: 'Automate',
    href: '/automate',
    children: [
      { label: 'Business Systems', href: '/automate' },
      { label: 'Workflows', href: '/automate?category=workflows' },
      { label: 'Templates', href: '/automate?category=templates' }
    ]
  },
  {
    label: 'Grow',
    href: '/grow',
    children: [
      { label: 'Marketing', href: '/grow?category=marketing' },
      { label: 'Sales', href: '/grow?category=sales' },
      { label: 'Analytics', href: '/grow?category=analytics' }
    ]
  },
  { label: 'Deals', href: '/deals' },
  { label: 'New', href: '/new' }
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'Alex Thompson',
    rating: 5,
    comment: 'Absolutely incredible templates! Saved me weeks of work.',
    date: '2026-02-15',
    verified: true
  },
  {
    id: '2',
    productId: '1',
    author: 'Maria Garcia',
    rating: 5,
    comment: 'The quality is outstanding. Highly recommend!',
    date: '2026-02-10',
    verified: true
  },
  {
    id: '3',
    productId: '2',
    author: 'James Wilson',
    rating: 4,
    comment: 'Great dashboard components. Very well organized.',
    date: '2026-02-08',
    verified: true
  }
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return products.filter(p => p.category === category.name);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getBestsellers = (): Product[] => {
  return products.filter(p => p.badge === 'bestseller').slice(0, 6);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.badge === 'new').slice(0, 7);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.badge === 'featured').slice(0, 4);
};

export const getTrendingProducts = (): Product[] => {
  return products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 6);
};

export const getDeals = (): Product[] => {
  return products.filter(p => p.discount && p.discount > 30).slice(0, 8);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, 4);
};

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};
