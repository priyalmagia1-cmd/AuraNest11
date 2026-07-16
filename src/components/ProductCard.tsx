import { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { AuraSVG } from './AuraArt';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, finish: string) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onViewDetails
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percentage
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8DCCB]/60 hover:border-terracotta/30 transition-all duration-300 shadow-sm hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformOrigin: 'center bottom' }}
      whileHover={{ y: -6 }}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#E8DCCB]/15 overflow-hidden flex items-center justify-center p-6 cursor-pointer" onClick={() => onViewDetails(product)}>
        {/* SVG Drawing of Product with Hover Zoom */}
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
        </div>

        {/* Promo badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-charcoal text-ivory text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-sans font-medium">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-sage text-charcoal text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-sans font-medium">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-terracotta text-ivory text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-sans font-medium">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button (Heart) with subtle click bounce */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-ivory/80 backdrop-blur-md shadow-sm border border-charcoal/5 hover:bg-ivory hover:text-terracotta text-charcoal/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          id={`wishlist-btn-${product.id}`}
        >
          <motion.div whileTap={{ scale: 1.3 }}>
            <Heart
              size={18}
              fill={isWishlisted ? "#C97C5D" : "none"}
              stroke={isWishlisted ? "#C97C5D" : "currentColor"}
              className="transition-colors duration-200"
            />
          </motion.div>
        </button>

        {/* Quick Add Overlay Slide-up (Vanish/Appear based on Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pointer-events-none group-hover:pointer-events-auto">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, product.finishes[0]);
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full bg-ivory hover:bg-charcoal text-charcoal hover:text-ivory font-sans font-medium text-xs tracking-wider uppercase py-2.5 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-[1.03] transition-all cursor-pointer"
            id={`quick-add-${product.id}`}
          >
            <ShoppingBag size={14} />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Product Content info */}
      <div className="p-4 flex flex-col flex-grow bg-ivory">
        <span className="text-[10px] text-charcoal/50 uppercase tracking-widest font-sans font-semibold mb-1">
          {product.category.replace('-', ' ')}
        </span>
        <h3
          onClick={() => onViewDetails(product)}
          className="font-serif text-base text-charcoal group-hover:text-terracotta transition-colors line-clamp-1 cursor-pointer font-medium mb-1.5"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Star Rating & Reviews */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
              />
            ))}
          </div>
          <span className="text-[11px] text-charcoal/60 font-sans">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price Tag with layout-fill to push buttons */}
        <div className="mt-auto flex items-baseline gap-2 pt-2 border-t border-[#E8DCCB]/30">
          <span className="font-sans text-base font-semibold text-charcoal">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp > product.price && (
            <span className="font-sans text-xs text-charcoal/40 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
