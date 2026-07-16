import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, Plus, Minus, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Review } from '../types';
import { PRODUCTS, REVIEWS } from '../data';
import { AuraSVG } from './AuraArt';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onNavigate: (view: 'shop' | 'product-detail', targetProduct?: Product) => void;
  onBackToCatalogue: () => void;
}

export function ProductDetailView({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
  onBackToCatalogue
}: ProductDetailViewProps) {
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'reviews'>('desc');
  
  // Simulated gallery thumbnail swap using different background tint variables
  const tints = [
    { name: 'Warm Clay', bg: 'bg-beige/25', stroke: '#C97C5D' },
    { name: 'Soft Sage', bg: 'bg-[#B8C9B1]/25', stroke: '#B8C9B1' },
    { name: 'Ivory Studio', bg: 'bg-ivory', stroke: '#F8F6F2' }
  ];
  const [selectedTintIdx, setSelectedTintIdx] = useState(0);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedFinish(product.finishes[0]);
    setQuantity(1);
    setSelectedTintIdx(0);
  }, [product]);

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Get related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 font-sans text-left" id="product-detail-container">
      
      {/* Back button link */}
      <button
        onClick={onBackToCatalogue}
        className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal/60 hover:text-terracotta uppercase tracking-wider mb-8 focus:outline-none"
        id="back-to-shop-btn"
      >
        <ArrowLeft size={14} />
        Back To Catalogue
      </button>

      {/* Main product presentation layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
        
        {/* Left Column: Image Gallery swapper (span 6) */}
        <div className="md:col-span-6 space-y-4">
          <div className={`aspect-square w-full rounded-2xl ${tints[selectedTintIdx].bg} border border-[#E8DCCB]/40 flex items-center justify-center p-12 relative overflow-hidden shadow-sm transition-colors duration-300`}>
            {/* Main Product SVG Render */}
            <div className="w-full h-full max-w-sm flex items-center justify-center">
              <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
            </div>

            {/* Float badge */}
            <div className="absolute top-4 left-4 bg-charcoal text-ivory text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-mono font-bold">
              Angle: {tints[selectedTintIdx].name}
            </div>
          </div>

          {/* Alternate Gallery Thumbnails */}
          <div className="flex gap-3 justify-center">
            {tints.map((tint, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTintIdx(idx)}
                className={`w-16 h-16 rounded-xl ${tint.bg} border-2 transition-all p-1.5 flex items-center justify-center shrink-0 ${
                  selectedTintIdx === idx ? 'border-terracotta scale-[1.05]' : 'border-charcoal/5 hover:border-charcoal/20'
                }`}
                aria-label={`View product in ${tint.name} ambient light`}
                id={`thumb-${idx}`}
              >
                <div className="w-full h-full opacity-70">
                  <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Buying parameters (span 6) */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-charcoal/40 uppercase tracking-widest font-mono font-bold">
              {product.category.replace('-', ' ')} Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal leading-tight">
              {product.name}
            </h1>

            {/* Star ratings and review brief click to trigger Reviews tab */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                  />
                ))}
              </div>
              <span className="text-xs text-charcoal/60 font-sans font-medium">
                {product.rating} / 5.0 ({product.reviewsCount} verified reviews)
              </span>
            </div>
          </div>

          {/* Price tags panel */}
          <div className="p-4 bg-beige/35 rounded-2xl border border-[#E8DCCB]/40 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-charcoal/40 uppercase tracking-wider font-semibold font-sans">Complimentary Home Delivery Price</p>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl font-bold text-charcoal">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="font-sans text-sm text-charcoal/40 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {discountPercent > 0 && (
              <span className="bg-terracotta text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-xl font-sans">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-sm text-charcoal/70 leading-relaxed font-sans">
            {product.shortDesc} {product.description.split('.')[0]}.
          </p>

          {/* 1. Finishes/Variants radio block */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider">Select Style Finish</h3>
            <div className="flex flex-wrap gap-2.5">
              {product.finishes.map((finish) => (
                <button
                  key={finish}
                  onClick={() => setSelectedFinish(finish)}
                  className={`px-4 py-2.5 rounded-full text-xs font-medium font-sans border transition-all ${
                    selectedFinish === finish
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white text-charcoal/80 border-charcoal/10 hover:border-charcoal/20'
                  }`}
                  id={`finish-pill-${finish.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {finish}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Quantity & Add to Cart panel */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E8DCCB]/30">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#E8DCCB] rounded-full px-2 py-1.5 bg-white shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-[#F8F6F2] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="px-4 text-sm font-semibold font-mono text-charcoal min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-[#F8F6F2] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={() => onAddToCart(product, selectedFinish, quantity)}
              className="flex-grow bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold py-4 px-8 rounded-full shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="detail-add-to-cart-btn"
            >
              <ShoppingBag size={14} />
              Add To Styling Cart
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-3.5 rounded-full border border-charcoal/15 text-charcoal hover:text-terracotta hover:border-terracotta bg-white shadow-sm transition-all focus:outline-none"
              aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              id="detail-wishlist-toggle"
            >
              <Heart
                size={18}
                fill={wishlist.includes(product.id) ? "#C97C5D" : "none"}
                stroke={wishlist.includes(product.id) ? "#C97C5D" : "currentColor"}
              />
            </button>
          </div>

          {/* Styling reassurance badges */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#E8DCCB]/30 text-[11px] font-sans text-charcoal/60">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-sage" />
              <span>Free transit damage replacement</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-sage" />
              <span>Handcrafted in small batches</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Tabbed Information Panels */}
      <section className="border-t border-[#E8DCCB]/50 pt-10 mb-16">
        <div className="flex border-b border-[#E8DCCB]/25 mb-8">
          {[
            { id: 'desc', label: 'Stylist Notes' },
            { id: 'materials', label: 'Dimensions & Composition' },
            { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-serif text-sm md:text-base font-bold pb-3.5 px-6 relative -mb-[1px] focus:outline-none ${
                activeTab === tab.id ? 'text-terracotta border-b-2 border-terracotta' : 'text-charcoal/50 hover:text-charcoal'
              }`}
              id={`detail-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="min-h-[120px] bg-white rounded-2xl p-6 border border-[#E8DCCB]/30">
          {activeTab === 'desc' && (
            <div className="space-y-4 animate-fade-in-up">
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-sans">
                {product.description}
              </p>
              <div className="bg-ivory/40 rounded-xl p-4 text-xs font-sans text-charcoal/60 leading-relaxed italic">
                “Styling tip: Place this in high natural light zones. Mirrors bounce sunrise light beautifully, while our coarse ceramic table lamps work best layered beside abstract canvas prints in sienna/beige hues.”
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm animate-fade-in-up font-sans text-charcoal/70 leading-relaxed">
              <div className="space-y-2.5">
                <p><strong className="text-charcoal">Design Dimensions:</strong></p>
                <p className="bg-ivory/50 px-3 py-2 rounded-lg text-xs font-mono">{product.dimensions}</p>
              </div>
              <div className="space-y-2.5">
                <p><strong className="text-charcoal">Craft Composition:</strong></p>
                <p className="bg-ivory/50 px-3 py-2 rounded-lg text-xs">{product.material}</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in-up font-sans">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="pb-5 border-b border-[#E8DCCB]/25 last:border-none last:pb-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="text-xs font-semibold text-charcoal">{rev.author}</p>
                    <p className="text-[10px] text-charcoal/40 font-mono">{rev.date}</p>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill={i < rev.rating ? "currentColor" : "none"} stroke="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Related Products section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 border-t border-[#E8DCCB]/30 pt-12">
          <h2 className="font-serif text-2xl font-bold text-charcoal">Complementary Coordinates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={wishlist.includes(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={(p, f) => onAddToCart(p, f, 1)}
                onViewDetails={(p) => onNavigate('product-detail', p)}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
