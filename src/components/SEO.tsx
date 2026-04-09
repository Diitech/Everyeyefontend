import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Everytech';
const SITE_URL = 'https://everytech.com';
const DEFAULT_DESCRIPTION = 'Discover and download premium digital products — templates, courses, AI tools, business systems and more. Instant downloads, lifetime updates.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_KEYWORDS = 'digital products, templates, online courses, AI tools, business systems, design assets, digital marketplace';

interface ProductSchema {
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  sku?: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  canonical?: string;
  noindex?: boolean;
  product?: ProductSchema;
  breadcrumbs?: { name: string; url: string }[];
}

const setMeta = (name: string, content: string, isProperty = false) => {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  canonical,
  noindex = false,
  product,
  breadcrumbs,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Premium Digital Products Marketplace`;
  const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Basic meta
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('author', SITE_NAME);

    // Open Graph
    setMeta('og:type', ogType, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:site_name', SITE_NAME, true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:site', '@everytech');

    // Canonical
    setLink('canonical', canonicalUrl);

    // Structured data
    const schemas: object[] = [];

    // Organization schema (always)
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      sameAs: [
        'https://twitter.com/everytech',
        'https://facebook.com/everytech',
        'https://linkedin.com/company/everytech',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@everytech.com',
      }
    });

    // Website schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/products?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });

    // Product schema
    if (product) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image || DEFAULT_IMAGE,
        sku: product.sku || product.name.toLowerCase().replace(/\s+/g, '-'),
        brand: {
          '@type': 'Brand',
          name: SITE_NAME
        },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
          seller: {
            '@type': 'Organization',
            name: SITE_NAME
          }
        },
        ...(product.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 1,
            bestRating: 5,
            worstRating: 1
          }
        })
      });
    }

    // Breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.url}`
        }))
      });
    }

    // Inject structured data
    const existing = document.getElementById('structured-data');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('structured-data');
      if (s) s.remove();
    };
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl, noindex, product, breadcrumbs]);

  return null;
}