import type { Product } from '@/types';

// Extended products with images and detailed info
export const extendedProducts: Product[] = [
  // Design Assets
  {
    id: '16',
    title: 'Icon Library Pro',
    description: '5000+ premium vector icons for web and mobile applications',
    price: 79,
    originalPrice: 159,
    rating: 4.8,
    reviewCount: 423,
    category: 'Creative Assets',
    subcategory: 'icons',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    ],
    features: [
      '5000+ unique icons',
      'Multiple styles (line, filled, duotone)',
      'SVG, PNG, and React components',
      'Figma library included',
      'Regular updates with new icons'
    ],
    includes: [
      '5000+ Icon Files',
      'Figma Library',
      'React Component Library',
      'Style Guide',
      'Usage Documentation'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-20',
    salesCount: 8930,
    downloadUrl: '#',
    fileSize: '850 MB',
    fileFormat: ['SVG', 'PNG', 'React', 'Figma']
  },
  {
    id: '17',
    title: 'Font Collection Bundle',
    description: '100 premium fonts for modern web and print design',
    price: 129,
    originalPrice: 259,
    rating: 4.9,
    reviewCount: 312,
    category: 'Creative Assets',
    subcategory: 'fonts',
    badge: 'featured',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
      'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80',
    ],
    features: [
      '100 premium fonts',
      'Web font files included',
      'Multiple weights and styles',
      'Commercial license',
      'Lifetime access'
    ],
    includes: [
      '100 Font Families',
      'Web Font Files (WOFF, WOFF2)',
      'Desktop Font Files (OTF, TTF)',
      'Font Specimen PDF',
      'Usage License'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-02-05',
    salesCount: 5670,
    downloadUrl: '#',
    fileSize: '1.2 GB',
    fileFormat: ['OTF', 'TTF', 'WOFF', 'WOFF2']
  },
  // Mockups
  {
    id: '18',
    title: 'Device Mockup Studio',
    description: '1000+ device mockups for showcasing your designs',
    price: 149,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 678,
    category: 'Creative Assets',
    subcategory: 'mockups',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    ],
    features: [
      '1000+ device mockups',
      'iPhone, iPad, MacBook, iMac',
      'Android devices included',
      'Smart objects for easy editing',
      '4K resolution'
    ],
    includes: [
      '1000+ PSD Mockup Files',
      'Smart Object Layers',
      'Background Collection',
      'Scene Creators',
      'Tutorial Videos'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-10',
    salesCount: 12340,
    downloadUrl: '#',
    fileSize: '35 GB',
    fileFormat: ['PSD', 'Sketch', 'Figma']
  },
  {
    id: '19',
    title: 'Packaging Mockup Pro',
    description: 'Professional packaging mockups for product presentations',
    price: 99,
    originalPrice: 199,
    rating: 4.7,
    reviewCount: 234,
    category: 'Creative Assets',
    subcategory: 'mockups',
    badge: 'new',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    ],
    features: [
      '500+ packaging mockups',
      'Boxes, bottles, bags, cans',
      'Customizable colors and labels',
      'High-resolution renders',
      'Multiple angles'
    ],
    includes: [
      '500+ Mockup Files',
      'Label Templates',
      'Texture Library',
      'Lighting Presets',
      'Video Tutorials'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-03-05',
    salesCount: 1890,
    downloadUrl: '#',
    fileSize: '18 GB',
    fileFormat: ['PSD', 'AI']
  },
  // Business Workflows
  {
    id: '20',
    title: 'Notion Business Hub',
    description: 'Complete business management system in Notion',
    price: 79,
    originalPrice: 159,
    rating: 4.9,
    reviewCount: 567,
    category: 'Business Systems',
    subcategory: 'workflows',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    ],
    features: [
      'Project management system',
      'Client CRM database',
      'Finance tracking',
      'Content calendar',
      'Team collaboration'
    ],
    includes: [
      'Business Hub Template',
      'Project Manager',
      'Client Database',
      'Finance Tracker',
      'Setup Guide'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-01-25',
    salesCount: 7890,
    downloadUrl: '#',
    fileSize: '45 MB',
    fileFormat: ['Notion']
  },
  {
    id: '21',
    title: 'Zapier Automation Pack',
    description: '50 pre-built Zapier workflows to automate your business',
    price: 97,
    originalPrice: 197,
    rating: 4.8,
    reviewCount: 445,
    category: 'Business Systems',
    subcategory: 'automation',
    badge: 'featured',
    discount: 51,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    ],
    features: [
      '50 ready-to-use Zaps',
      'Email automation',
      'Social media posting',
      'Lead management',
      'Data synchronization'
    ],
    includes: [
      '50 Zap Templates',
      'Setup Instructions',
      'Video Tutorials',
      'Troubleshooting Guide',
      'Support Community'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-02-10',
    salesCount: 5670,
    downloadUrl: '#',
    fileSize: '120 MB',
    fileFormat: ['Zapier', 'PDF']
  },
  // Sales & Marketing
  {
    id: '22',
    title: 'Sales Funnel Masterclass',
    description: 'Build high-converting sales funnels from scratch',
    price: 297,
    originalPrice: 597,
    rating: 4.9,
    reviewCount: 334,
    category: 'Online Courses',
    subcategory: 'sales',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    ],
    features: [
      '20+ hours of video content',
      'Real case studies',
      'Funnel templates',
      'Email sequences',
      'Facebook ad strategies'
    ],
    includes: [
      '20+ Video Lessons',
      'Funnel Templates',
      'Email Swipes',
      'Ad Templates',
      'Private Community'
    ],
    license: 'Personal Use License',
    createdAt: '2025-01-15',
    salesCount: 4560,
    downloadUrl: '#',
    fileSize: '8.5 GB',
    fileFormat: ['Video', 'PDF', 'Notion']
  },
  {
    id: '23',
    title: 'Analytics Dashboard Pro',
    description: 'Track all your business metrics in one beautiful dashboard',
    price: 149,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 289,
    category: 'Business Systems',
    subcategory: 'analytics',
    badge: 'new',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    ],
    features: [
      'Real-time data visualization',
      'Google Analytics integration',
      'Custom KPI tracking',
      'Automated reports',
      'Team sharing'
    ],
    includes: [
      'Dashboard Template',
      'Data Connectors',
      'Report Templates',
      'Setup Guide',
      'Video Tutorials'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-03-01',
    salesCount: 2340,
    downloadUrl: '#',
    fileSize: '890 MB',
    fileFormat: ['Notion', 'Google Sheets', 'Excel']
  },
  // Design Courses
  {
    id: '24',
    title: 'UI Design Masterclass',
    description: 'Master the art of user interface design',
    price: 197,
    originalPrice: 397,
    rating: 4.9,
    reviewCount: 567,
    category: 'Online Courses',
    subcategory: 'design',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80',
    ],
    features: [
      '30+ hours of content',
      'Figma mastery',
      'Design principles',
      'Portfolio projects',
      '1-on-1 feedback'
    ],
    includes: [
      '30+ Video Lessons',
      'Project Files',
      'Design Resources',
      'Certificate',
      'Community Access'
    ],
    license: 'Personal Use License',
    createdAt: '2025-01-20',
    salesCount: 6780,
    downloadUrl: '#',
    fileSize: '12 GB',
    fileFormat: ['Video', 'Figma']
  },
  // Development Courses
  {
    id: '25',
    title: 'React Advanced Patterns',
    description: 'Master advanced React patterns and best practices',
    price: 149,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 423,
    category: 'Online Courses',
    subcategory: 'development',
    badge: 'featured',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    ],
    features: [
      '25+ hours of content',
      'Real-world projects',
      'Performance optimization',
      'Testing strategies',
      'Code reviews'
    ],
    includes: [
      '25+ Video Lessons',
      'Project Code',
      'Cheat Sheets',
      'Certificate',
      'Discord Community'
    ],
    license: 'Personal Use License',
    createdAt: '2025-02-15',
    salesCount: 4560,
    downloadUrl: '#',
    fileSize: '10 GB',
    fileFormat: ['Video', 'Code']
  },
  // Business Courses
  {
    id: '26',
    title: 'Startup Launch Blueprint',
    description: 'Launch your startup from idea to first customers',
    price: 397,
    originalPrice: 797,
    rating: 4.9,
    reviewCount: 234,
    category: 'Online Courses',
    subcategory: 'business',
    badge: 'bestseller',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    ],
    features: [
      '40+ hours of content',
      'Idea validation framework',
      'MVP development',
      'Customer acquisition',
      'Pitch deck templates'
    ],
    includes: [
      '40+ Video Lessons',
      'Templates & Tools',
      'Investor Database',
      'Community Access',
      'Monthly Q&A Calls'
    ],
    license: 'Personal Use License',
    createdAt: '2025-01-05',
    salesCount: 3450,
    downloadUrl: '#',
    fileSize: '15 GB',
    fileFormat: ['Video', 'PDF', 'Notion']
  },
  // AI Automation
  {
    id: '27',
    title: 'AI Content Automation',
    description: 'Automate your content creation with AI workflows',
    price: 127,
    originalPrice: 257,
    rating: 4.8,
    reviewCount: 678,
    category: 'AI Tools & Prompts',
    subcategory: 'automation',
    badge: 'bestseller',
    discount: 51,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      'https://images.unsplash.com/photo-1686191128892-3b37add4a934?w=800&q=80',
    ],
    features: [
      '200+ content prompts',
      'Blog post automation',
      'Social media workflows',
      'Email sequences',
      'SEO optimization'
    ],
    includes: [
      '200+ AI Prompts',
      'Workflow Templates',
      'Content Calendar',
      'Video Tutorials',
      'Monthly Updates'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-02-20',
    salesCount: 7890,
    downloadUrl: '#',
    fileSize: '250 MB',
    fileFormat: ['Notion', 'PDF', 'ChatGPT']
  },
  {
    id: '28',
    title: 'AI Customer Support Bot',
    description: 'Build AI-powered customer support automation',
    price: 197,
    originalPrice: 397,
    rating: 4.7,
    reviewCount: 234,
    category: 'AI Tools & Prompts',
    subcategory: 'automation',
    badge: 'new',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    ],
    features: [
      'ChatGPT bot templates',
      'FAQ automation',
      'Ticket routing',
      'Multi-language support',
      'Analytics dashboard'
    ],
    includes: [
      'Bot Templates',
      'Training Data',
      'Integration Guides',
      'Video Tutorials',
      'Support Documentation'
    ],
    license: 'Commercial License - Use in unlimited projects',
    createdAt: '2025-03-08',
    salesCount: 1890,
    downloadUrl: '#',
    fileSize: '180 MB',
    fileFormat: ['Notion', 'JSON', 'ChatGPT']
  },
];

// Combine with existing products
import { products as existingProducts } from './index';
export const allProducts = [...existingProducts, ...extendedProducts];
