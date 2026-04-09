import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

const defaultSEO = {
  title: 'Everytech - Premium Digital Marketplace',
  description: 'Templates, courses, and tools—curated for makers. Instant downloads with commercial license.',
  keywords: ['digital products', 'templates', 'courses', 'design assets', 'AI tools', 'business systems'],
  ogImage: 'https://everytech.com/og-image.jpg',
  ogType: 'website'
};

export function useSEO(options: SEOOptions = {}) {
  useEffect(() => {
    const {
      title = defaultSEO.title,
      description = defaultSEO.description,
      keywords = defaultSEO.keywords,
      ogImage = defaultSEO.ogImage,
      ogType = defaultSEO.ogType,
      canonical,
      noindex = false
    } = options;

    // Update title
    document.title = title === defaultSEO.title ? title : `${title} | Everytech`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Description
    updateMetaTag('description', description);
    updateMetaTag('og:description', description, true);

    // Keywords
    updateMetaTag('keywords', keywords.join(', '));

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Cleanup function
    return () => {
      // Meta tags are not removed on cleanup to prevent flickering
    };
  }, [options]);
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    } : undefined
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Everytech',
    url: 'https://everytech.com',
    logo: 'https://everytech.com/logo.png',
    sameAs: [
      'https://twitter.com/everytech',
      'https://instagram.com/everytech',
      'https://linkedin.com/company/everytech'
    ]
  };
}
