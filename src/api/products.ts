import type { Product } from '@/types';
import { getCached, setCache } from '@/hooks/useCache';

const API_URL = 'https://everyeye-server.onrender.com/api';

interface BackendRating {
  average: number;
  count: number;
}

interface BackendPricing {
  sale: number;
  original: number;
  discount: number;
}

interface BackendProduct {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  pricing?: BackendPricing;
  rating?: BackendRating | number;
  reviewCount?: number;
  category?: string;
  subcategory?: string;
  tags?: string[];
  image?: string;
  images?: string[];
  salesCount?: number;
  createdAt?: string;
  fileSize?: string;
  fileFormat?: string[];
  downloadUrl?: string;
  features?: string[];
  includes?: string[];
  license?: string;
}

function getRating(rating?: BackendRating | number): number {
  if (typeof rating === 'object') return rating.average ?? 0;
  return rating ?? 0;
}

function getReviewCount(rating?: BackendRating | number, reviewCount?: number): number {
  if (typeof rating === 'object') return rating.count ?? 0;
  return reviewCount ?? 0;
}

function getBadge(tags?: string[]): Product['badge'] {
  if (!tags) return undefined;
  if (tags.includes('Bestseller')) return 'bestseller';
  if (tags.includes('New')) return 'new';
  if (tags.includes('Featured')) return 'featured';
  return undefined;
}

function transformProduct(p: BackendProduct): Product {
  return {
    id: p._id ?? p.id ?? '',
    title: p.title ?? '',
    description: p.description ?? '',
    shortDescription: p.shortDescription,
    price: p.pricing?.sale ?? p.price ?? 0,
    originalPrice: p.pricing?.original ?? p.originalPrice,
    discount: p.pricing?.discount ?? p.discount,
    rating: getRating(p.rating),
    reviewCount: getReviewCount(p.rating, p.reviewCount),
    category: p.category ?? '',
    subcategory: p.subcategory ?? p.category ?? '',
    badge: getBadge(p.tags),
    image: p.images?.[0] ?? p.image ?? '/placeholder.jpg',
    images: p.images ?? [],
    salesCount: p.salesCount ?? 0,
    createdAt: p.createdAt ?? new Date().toISOString(),
    fileSize: p.fileSize,
    fileFormat: p.fileFormat,
    downloadUrl: p.downloadUrl,
    features: p.features,
    includes: p.includes,
    license: p.license,
  };
}

export async function getProducts(): Promise<Product[]> {
  const cached = getCached<Product[]>('products');
  if (cached) return cached;

  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data: BackendProduct[] = await response.json();
    const products = data.map(transformProduct);
    setCache('products', products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const cached = getCached<Product>(`product-${id}`);
  if (cached) return cached;

  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    const data: BackendProduct = await response.json();
    const product = transformProduct(data);
    setCache(`product-${id}`, product);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}