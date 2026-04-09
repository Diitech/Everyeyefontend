import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'compact' | 'featured';
}

export function ProductCard({ product, index = 0, variant = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const getBadgeStyles = () => {
    switch (product.badge) {
      case 'bestseller': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'new': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'featured': return 'bg-coral/20 text-coral border-coral/30';
      case 'sale': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getBadgeText = () => {
    switch (product.badge) {
      case 'bestseller': return 'Bestseller';
      case 'new': return 'New';
      case 'featured': return 'Featured';
      case 'sale': return `Save ${product.discount}%`;
      default: return '';
    }
  };

  const image = product.images?.[0] ?? product.image ?? '/placeholder.jpg';

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to={`/product/${product.id}`} className="group block">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-dark-200 mb-3">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-dark-200 animate-pulse" />
            )}
            <img
              src={image}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {product.badge && (
              <Badge className={`absolute top-3 left-3 text-xs font-medium border ${getBadgeStyles()}`}>
                {getBadgeText()}
              </Badge>
            )}
            {product.discount && (
              <Badge className="absolute top-3 right-3 bg-red-500/90 text-white text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>
          <h3 className="text-sm font-medium text-white group-hover:text-coral transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-400">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-coral font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative bg-dark rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-border-secondary hover:shadow-lg hover:-translate-y-1">
        <Link
          to={`/product/${product.id}`}
          className="block relative aspect-[16/10] overflow-hidden bg-dark-200"
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-dark-200 animate-pulse" />
          )}
          <img
            src={image}
            alt={product.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <Badge className={`text-xs font-medium border ${getBadgeStyles()}`}>
                {getBadgeText()}
              </Badge>
            )}
          </div>
          {product.discount && (
            <Badge className="absolute top-4 right-4 bg-red-500/90 text-white text-xs">
              Save {product.discount}%
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={handleAddToCart}
              className={`transition-all duration-300 ${
                isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-coral hover:bg-coral-dark'
              } text-white`}
            >
              {isAdded ? (
                <><Check className="w-4 h-4 mr-2" />Added</>
              ) : (
                <><ShoppingCart className="w-4 h-4 mr-2" />Add to Cart</>
              )}
            </Button>
          </div>
        </Link>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-white">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-white group-hover:text-coral transition-colors line-clamp-1 mb-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {product.shortDescription ?? product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-coral">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className={`transition-all duration-300 ${
                isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-coral hover:bg-coral-dark'
              } text-white`}
            >
              {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}