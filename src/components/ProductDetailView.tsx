import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, Plus, Minus, ArrowLeft, Shield, Sparkles, Share2, Copy, Check, MessageCircle, Mail, Facebook, Twitter, X, ExternalLink, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Review } from '../types';
import { PRODUCTS, REVIEWS } from '../data';
import { AuraSVG } from './AuraArt';
import { ProductCard } from './ProductCard';
import { FrequentlyBoughtTogether } from './FrequentlyBoughtTogether';

interface ProductDetailViewProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  onNavigate: (view: 'shop' | 'product-detail', targetProduct?: Product) => void;
  onBackToCatalogue: () => void;
  onShareNotification?: (message: string, type?: 'success' | 'info') => void;
  onOpenAIStudio?: (product: Product) => void;
}

export function ProductDetailView({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
  onBackToCatalogue,
  onShareNotification,
  onOpenAIStudio
}: ProductDetailViewProps) {
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'reviews'>('desc');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
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
    setIsShareModalOpen(false);
    setCopiedLink(false);
  }, [product]);

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Get related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Product share link & details
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname;
      return `${baseUrl}?product=${product.id}`;
    }
    return `https://auranest.app/product/${product.id}`;
  };

  const shareText = `Check out "${product.name}" (${selectedFinish} finish) for ₹${product.price.toLocaleString('en-IN')} on AuraNest Home Décor!`;

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    if (onShareNotification) {
      onShareNotification(`Link copied to clipboard! Share "${product.name}" with friends.`, 'success');
    }
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AuraNest — ${product.name}`,
          text: shareText,
          url: getShareUrl(),
        });
        if (onShareNotification) {
          onShareNotification(`Shared ${product.name} successfully!`, 'success');
        }
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const sharePlatforms = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] text-white hover:bg-[#1DA851]',
      action: () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + getShareUrl())}`;
        window.open(url, '_blank');
        if (onShareNotification) onShareNotification(`Opening WhatsApp to share ${product.name}`, 'info');
      }
    },
    {
      name: 'Pinterest',
      icon: ExternalLink,
      color: 'bg-[#E60023] text-white hover:bg-[#AD001A]',
      action: () => {
        const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(getShareUrl())}&description=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
        if (onShareNotification) onShareNotification(`Opening Pinterest to pin ${product.name}`, 'info');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] text-white hover:bg-[#0D65D9]',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
        window.open(url, '_blank');
        if (onShareNotification) onShareNotification(`Opening Facebook to share ${product.name}`, 'info');
      }
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-[#1DA1F2] text-white hover:bg-[#0C85D0]',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(getShareUrl())}`;
        window.open(url, '_blank');
        if (onShareNotification) onShareNotification(`Opening X / Twitter to tweet ${product.name}`, 'info');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-[#4A5568] text-white hover:bg-[#2D3748]',
      action: () => {
        const url = `mailto:?subject=${encodeURIComponent(`AuraNest Decor Idea: ${product.name}`)}&body=${encodeURIComponent(`${shareText}\n\nView item here: ${getShareUrl()}`)}`;
        window.open(url, '_self');
      }
    }
  ];

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

          {/* AI Room Staging Studio Banner */}
          <div className="bg-gradient-to-r from-ivory via-beige/40 to-ivory p-4 rounded-2xl border border-terracotta/30 flex items-center justify-between gap-3 shadow-xs mt-4" id="product-ai-staging-banner">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-1.5 text-terracotta font-mono text-[11px] font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>AI Room Staging Studio</span>
                <span className="bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full text-[9px] font-extrabold">1K • 2K • 4K</span>
              </div>
              <p className="text-xs font-bold text-charcoal font-serif">
                Generate Photorealistic 4K Photos
              </p>
              <p className="text-[11px] text-charcoal/60 font-sans">
                Stage <strong>{product.name}</strong> in custom interiors powered by gemini-3-pro-image-preview.
              </p>
            </div>
            <button
              onClick={() => onOpenAIStudio && onOpenAIStudio(product)}
              className="px-4 py-2.5 rounded-xl bg-terracotta hover:bg-charcoal text-white font-serif font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5 hover:scale-105"
              id="open-ai-studio-detail-btn"
            >
              <Wand2 size={14} />
              <span>Generate Photo</span>
            </button>
          </div>
        </div>

        {/* Right Column: Buying parameters (span 6) */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-charcoal/40 uppercase tracking-widest font-mono font-bold">
                {product.category.replace('-', ' ')} Collection
              </span>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal/60 hover:text-terracotta bg-beige/40 hover:bg-beige/80 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                id="quick-share-pill-btn"
              >
                <Share2 size={12} />
                <span>Share Decor</span>
              </button>
            </div>
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
              className="p-3.5 rounded-full border border-charcoal/15 text-charcoal hover:text-terracotta hover:border-terracotta bg-white shadow-sm transition-all focus:outline-none cursor-pointer"
              aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              id="detail-wishlist-toggle"
            >
              <Heart
                size={18}
                fill={wishlist.includes(product.id) ? "#C97C5D" : "none"}
                stroke={wishlist.includes(product.id) ? "#C97C5D" : "currentColor"}
              />
            </button>

            {/* Share button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-3.5 rounded-full border border-charcoal/15 text-charcoal hover:text-terracotta hover:border-terracotta bg-white shadow-sm transition-all focus:outline-none cursor-pointer"
              aria-label="Share product with friends and family"
              title="Share this item"
              id="detail-share-btn"
            >
              <Share2 size={18} />
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

      {/* Frequently Bought Together Bundle Recommendations */}
      <div className="my-12">
        <FrequentlyBoughtTogether
          currentProduct={product}
          onAddToCart={onAddToCart}
          onToastNotification={onShareNotification}
          onNavigateToProduct={(prod) => onNavigate('product-detail', prod)}
        />
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

      {/* 5. Social Sharing Modal Overlay */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="share-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-charcoal/10 font-sans space-y-5 text-left"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                    <Share2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-charcoal leading-snug">Share This Piece</h3>
                    <p className="text-[11px] text-charcoal/50 font-sans">Spread decor inspiration with friends & family</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close share modal"
                  id="close-share-modal-btn"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Product Preview Card */}
              <div className="p-3.5 bg-beige/25 rounded-2xl border border-[#E8DCCB]/60 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white border border-charcoal/10 p-1 shrink-0 flex items-center justify-center shadow-2xs">
                  <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-sm text-charcoal truncate">{product.name}</h4>
                  <p className="text-[11px] text-charcoal/60 font-sans truncate">Selected Finish: <span className="font-semibold text-charcoal">{selectedFinish}</span></p>
                  <p className="text-xs font-mono font-bold text-terracotta mt-0.5">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Social Networks Action Grid */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/50">
                  Select Social Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sharePlatforms.map((platform) => {
                    const IconComp = platform.icon;
                    return (
                      <button
                        key={platform.name}
                        onClick={platform.action}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all cursor-pointer shadow-2xs active:scale-98 ${platform.color}`}
                        id={`share-platform-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <IconComp size={15} />
                        <span>{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Copy Link Bar */}
              <div className="space-y-2 pt-2 border-t border-charcoal/10">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/50">
                  Or Copy Direct Item Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl()}
                    className="flex-1 bg-ivory/80 border border-charcoal/15 rounded-xl px-3 py-2 text-xs font-mono text-charcoal/70 outline-none select-all"
                    id="share-direct-url-input"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                      copiedLink 
                        ? 'bg-sage text-white' 
                        : 'bg-terracotta hover:bg-charcoal text-white'
                    }`}
                    id="share-copy-link-btn"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Native Mobile Device Share Button if supported */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2.5 rounded-xl bg-charcoal/5 hover:bg-charcoal/10 text-charcoal text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  id="native-device-share-btn"
                >
                  <Share2 size={14} />
                  <span>More Device Share Options</span>
                </button>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
