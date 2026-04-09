export interface Product {
  id: string;
  slug?: string;
  title: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  subcategory: string;
  badge?: 'bestseller' | 'featured' | 'new' | 'sale';
  discount?: number;
  image: string;
  images?: string[];
  features?: string[];
  includes?: string[];
  license?: string;
  createdAt: string;
  salesCount: number;
  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  priceRange: string;
  icon: string;
  slug: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image?: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface PurchaseNotification {
  id: string;
  productName: string;
  buyerName: string;
  timestamp: Date;
  location: string;
}