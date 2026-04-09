import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Check,
  ArrowLeft,
  Download,
  FileText,
  Package,
  Shield,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '@/components/SEO';
import { ProductCard } from '@/components/ProductCard';
import { ReviewSection } from '@/components/ReviewSection';
import { useCart } from '@/hooks/useCart';
import { getProductById, getProducts } from '@/api/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Product } from '@/types';

const mockBuyers = [
  { name: 'Alex M.', location: 'New York', time: '2 minutes ago' },
  { name: 'Sarah K.', location: 'London', time: '5 minutes ago' },
  { name: 'James L.', location: 'Tokyo', time: '8 minutes ago' },
  { name: 'Emma R.', location: 'Paris', time: '12 minutes ago' },
  { name: 'Michael T.', location: 'Sydney', time: '15 minutes ago' },
];

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [recentBuyers, setRecentBuyers] = useState(mockBuyers);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    getProductById(id).then(data => {
      if (cancelled) return;
      if (!data) { navigate('/products'); return; }
      setProduct(data);
      setLoading(false);
      window.scrollTo(0, 0);
    });
    return () => { cancelled = true; };
  }, [id, navigate]);

  useEffect(() => {
    if (!product) return;
    getProducts().then(all => {
      const related = all
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    });
  }, [product]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentBuyers(prev => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-lg">Loading product...</div>
      </main>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image ?? '/placeholder.jpg'];

  return (
    <>
      <SEO
        title={product.title}
        description={product.shortDescription || product.description?.slice(0, 160)}
        keywords={`${product.title}, ${product.category}, digital download`}
        ogType="product"
        ogImage={product.images?.[0] || product.image}
        product={{
          name: product.title,
          description: product.description,
          price: product.price,
          image: product.images?.[0] || product.image,
          rating: product.rating,
          reviewCount: product.reviewCount,
          sku: product.slug || product.id,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: product.title, url: `/product/${product.id}` }
        ]}
      />
      <main className="pt-[72px] min-h-screen bg-dark">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-4">
            <Link to="/products" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Products
            </Link>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-100 mb-4">
                  <img src={images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
                  {product.badge && (
                    <Badge className={`absolute top-4 left-4 ${
                      product.badge === 'bestseller' ? 'bg-amber-500/20 text-amber-400' :
                      product.badge === 'new' ? 'bg-green-500/20 text-green-400' :
                      'bg-coral/20 text-coral'
                    }`}>
                      {product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : 'Featured'}
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="absolute top-4 right-4 bg-red-500/90 text-white">Save {product.discount}%</Badge>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-coral' : 'border-transparent'}`}
                      >
                        <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Link to={`/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-coral text-sm font-medium hover:underline">
                  {product.category}
                </Link>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">{product.title}</h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-semibold text-white">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">{product.salesCount.toLocaleString()} sales</span>
                </div>

                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold text-coral">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  {product.discount && (
                    <Badge className="bg-red-500/20 text-red-400">Save {product.discount}%</Badge>
                  )}
                </div>

                <p className="text-gray-400 mb-8">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-coral" />
                    <div>
                      <p className="text-sm text-gray-500">File Size</p>
                      <p className="text-white font-medium">{product.fileSize ?? 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-coral" />
                    <div>
                      <p className="text-sm text-gray-500">Format</p>
                      <p className="text-white font-medium">{product.fileFormat?.join(', ') ?? 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-coral" />
                    <div>
                      <p className="text-sm text-gray-500">Includes</p>
                      <p className="text-white font-medium">{product.includes?.length ?? 0} items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-coral" />
                    <div>
                      <p className="text-sm text-gray-500">License</p>
                      <p className="text-white font-medium">Commercial</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    onClick={handleAddToCart}
                    className={`flex-1 py-6 text-base font-medium transition-all ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-coral hover:bg-coral-dark'} text-white`}
                  >
                    {isAdded ? <><Check className="w-5 h-5 mr-2" />Added to Cart</> : <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart</>}
                  </Button>
                  <Link to="/checkout" className="flex-1">
                    <Button variant="outline" className="w-full py-6 text-base font-medium border-coral text-coral hover:bg-coral/10">
                      Buy Now
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-400" />Instant Download</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-400" />30-Day Money Back</span>
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-400" />Lifetime Updates</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section ref={ref} className="py-12 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 mb-8 overflow-x-auto flex-nowrap">
                {['description', 'features', 'includes', 'license', 'reviews'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-coral data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 capitalize whitespace-nowrap flex-shrink-0"
                  >
                    {tab === 'reviews' ? `Reviews (${product.reviewCount || 0})` : tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-white mb-4">About this product</h3>
                  <p className="text-gray-400 leading-relaxed">{product.description}</p>
                  <p className="text-gray-400 leading-relaxed mt-4">
                    This premium {product.category.toLowerCase()} is designed to help you create
                    stunning projects with ease. With {product.salesCount.toLocaleString()} satisfied
                    customers, you can trust that you&apos;re getting a high-quality product.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  {product.features && product.features.length > 0 ? (
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                          <span className="text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No features listed for this product.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="includes" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-white mb-4">What&apos;s Included</h3>
                  {product.includes && product.includes.length > 0 ? (
                    <ul className="space-y-3">
                      {product.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Package className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                          <span className="text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No items listed.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="license" className="mt-0">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-white mb-4">License Information</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {product.license ?? 'Commercial License - Use in unlimited projects'}
                  </p>
                  <div className="bg-dark-100 rounded-xl p-6 border border-border">
                    <h4 className="font-medium text-white mb-3">You can:</h4>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-gray-400 text-sm">
                        <Check className="w-4 h-4 text-green-400" />Use in unlimited personal and commercial projects
                      </li>
                      <li className="flex items-center gap-2 text-gray-400 text-sm">
                        <Check className="w-4 h-4 text-green-400" />Use in client projects and end products
                      </li>
                      <li className="flex items-center gap-2 text-gray-400 text-sm">
                        <Check className="w-4 h-4 text-green-400" />Modify and create derivative works
                      </li>
                    </ul>
                    <h4 className="font-medium text-white mb-3">You cannot:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-400 text-sm">
                        <X className="w-4 h-4 text-red-400" />Resell or redistribute as-is
                      </li>
                      <li className="flex items-center gap-2 text-gray-400 text-sm">
                        <X className="w-4 h-4 text-red-400" />Include in stock asset libraries
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ReviewSection productId={product.id} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Recent Purchases */}
        <section className="py-12 border-t border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">People Also Bought</h2>
                <p className="text-gray-400">See what others purchased recently</p>
              </div>
              <div className="flex items-center gap-2 text-coral">
                <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                <span className="text-sm">Live purchases</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {recentBuyers.map((buyer, idx) => (
                <motion.div
                  key={buyer.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 bg-dark-100 rounded-xl p-4 border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center text-white font-semibold text-sm">
                    {buyer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{buyer.name}</p>
                    <p className="text-gray-500 text-xs">{buyer.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-coral text-sm font-medium">Just purchased</p>
                    <p className="text-gray-500 text-xs">{buyer.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 border-t border-border bg-dark-100">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
              <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={relatedProduct} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}