import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Map, Compass, ShieldCheck, CornerRightUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS, TESTIMONIALS } from '../data';
import { RoomCorner, AuraSVG } from './AuraArt';
import { ProductCard } from './ProductCard';

interface HomeViewProps {
  onNavigate: (view: 'shop' | 'product-detail', targetProduct?: Product) => void;
  onSelectCategory: (category: string) => void;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, finish: string) => void;
}

export function HomeView({
  onNavigate,
  onSelectCategory,
  wishlist,
  onToggleWishlist,
  onAddToCart
}: HomeViewProps) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);

  const roomCategories = [
    { name: 'The Living Corner', category: 'table-lamps', bg: 'bg-beige/40', desc: 'Warm ambient ceramics & statement wall art.' },
    { name: 'The Serene Bedroom', category: 'cushions', bg: 'bg-[#B8C9B1]/20', desc: 'Organic bouclé, block-prints & candles.' },
    { name: 'The Grand Entryway', category: 'mirrors', bg: 'bg-[#C97C5D]/10', desc: 'Arched brass mirrors & marble tray accents.' }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16 overflow-x-hidden font-sans" id="home-view-container">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-beige/20 via-ivory to-ivory py-12 md:py-20 border-b border-[#E8DCCB]/25">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-6 space-y-6 md:space-y-8 text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#B8C9B1]/30 text-charcoal px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold">
              <Sparkles size={11} className="text-terracotta" />
              <span>Autumn Styling Edit 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal leading-[1.15] tracking-tight">
              Spaces That Breathe <br />
              <span className="text-terracotta italic font-normal underline underline-offset-8 decoration-1 decoration-[#C97C5D]/50">Organic Warmth</span>
            </h1>

            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed max-w-lg font-sans">
              Hand-finished ceramic lamps, hand-block Indigo prints, and solid Banswara white marble. AuraNest curates ageless, premium home decor pieces designed for cozy, deliberate living.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-terracotta hover:bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                id="hero-shop-cta"
              >
                Shop the Collection
                <ArrowRight size={14} />
              </button>
              
              <button
                onClick={() => {
                  const elem = document.getElementById('shop-by-room-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent hover:bg-beige/35 text-charcoal text-xs uppercase tracking-widest font-semibold px-6 py-4 rounded-full border border-charcoal/15 transition-all cursor-pointer"
              >
                Shop By Room
              </button>
            </div>

            {/* Brand Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8DCCB]/40 max-w-md">
              <div className="text-left">
                <p className="font-serif text-lg font-bold text-charcoal">₹1,500+</p>
                <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold font-sans">Aspirational Price</p>
              </div>
              <div className="text-left">
                <p className="font-serif text-lg font-bold text-charcoal">Free</p>
                <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold font-sans">Complimentary Ship</p>
              </div>
              <div className="text-left">
                <p className="font-serif text-lg font-bold text-charcoal">FSC Wood</p>
                <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold font-sans">Sustainably Sourced</p>
              </div>
            </div>
          </div>

          {/* Hero Right Content - Animated Room Corner (Signature Moment) */}
          <div className="md:col-span-6 flex items-center justify-center">
            <RoomCorner />
          </div>

        </div>
      </section>

      {/* 2. CATEGORY MARQUEE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <span className="text-xs text-charcoal/40 uppercase tracking-widest font-mono font-bold">Curated Catalog</span>
        </div>
        
        {/* Horizontal Marquee / flex list */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {[
            { id: 'wall-art', name: 'Wall Art', type: 'botanical-art' },
            { id: 'mirrors', name: 'Mirrors', type: 'sunburst-mirror' },
            { id: 'table-lamps', name: 'Table Lamps', type: 'ceramic-lamp' },
            { id: 'floor-lamps', name: 'Floor Lamps', type: 'arc-lamp' },
            { id: 'cushions', name: 'Cushions', type: 'blockprint-cushion' },
            { id: 'candles', name: 'Candles & Oils', type: 'candle' },
            { id: 'accessories', name: 'Accessories', type: 'marble-tray' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('shop');
              }}
              className="flex items-center gap-3 bg-white hover:bg-beige/35 border border-[#E8DCCB]/40 py-2.5 px-4 rounded-full transition-all hover:scale-[1.03] cursor-pointer shadow-sm group focus:outline-none focus:ring-1 focus:ring-terracotta text-left"
              id={`marquee-cat-${cat.id}`}
            >
              <div className="w-8 h-8 rounded-full bg-beige/40 flex items-center justify-center shrink-0 overflow-hidden p-1.5 group-hover:bg-terracotta/20 transition-colors">
                <AuraSVG type={cat.type} className="w-full h-full object-contain text-charcoal" />
              </div>
              <span className="font-sans text-xs font-semibold text-charcoal uppercase tracking-wider">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED COLLECTION - BENTO GRID / PHILOSOPHY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-beige/30 rounded-3xl p-8 md:p-12 border border-[#E8DCCB]/40 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          <div className="md:col-span-5 space-y-5">
            <span className="text-[10px] text-terracotta uppercase tracking-widest font-mono font-bold">The Craft Philosophy</span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-charcoal leading-tight">
              The <span className="italic text-terracotta underline underline-offset-4 decoration-1 decoration-[#C97C5D]/50">Organic Sanctuary</span> Collection
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-sans">
              Designed around soothing sage greens, warm terracottas, and genuine textured slub cottons, this collection aims to restore sensory stillness. We omit plastic synthetics entirely in favor of hand-gathered driftwood, unbleached flax linens, and heavy textured ceramics.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectCategory('cushions');
                  onNavigate('shop');
                }}
                className="bg-charcoal hover:bg-terracotta text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Browse Cushions & Covers
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {/* Draw two illustrative cards representing sensory texture */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCB]/30 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-beige/20 rounded-full flex items-center justify-center p-3 mb-4">
                <AuraSVG type="blockprint-cushion" className="w-full h-full" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-charcoal">Jaipur Hand-Block</h4>
              <p className="text-[10px] text-charcoal/50 font-sans mt-1">Generational block prints carved out of real teak timber blocks.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#E8DCCB]/30 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#B8C9B1]/20 rounded-full flex items-center justify-center p-3 mb-4">
                <AuraSVG type="diffuser" className="w-full h-full" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-charcoal">Organic Scenting</h4>
              <p className="text-[10px] text-charcoal/50 font-sans mt-1">Slow diffused vetiver and sandalwood oils for sensory calm.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BEST SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="text-left">
            <span className="text-[10px] text-terracotta uppercase tracking-widest font-mono font-bold">Most Loved Pieces</span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-charcoal mt-1">
              AuraNest <span className="italic text-terracotta underline underline-offset-4 decoration-1 decoration-[#C97C5D]/50">Bestsellers</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs text-terracotta font-semibold uppercase tracking-wider hover:text-charcoal transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            See Entire Collection ({PRODUCTS.length} Items)
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onViewDetails={(prod) => onNavigate('product-detail', prod)}
            />
          ))}
        </div>
      </section>

      {/* 5. SHOP BY ROOM CONCEPT */}
      <section id="shop-by-room-section" className="bg-[#E8DCCB]/30 py-16 border-y border-[#E8DCCB]/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-[10px] text-terracotta uppercase tracking-widest font-mono font-bold">Styling Concepts</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-charcoal mt-1 mb-3">
            Shop By <span className="italic text-terracotta underline underline-offset-4 decoration-1 decoration-[#C97C5D]/50">Room Setting</span>
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/60 max-w-lg mx-auto mb-10 font-sans">
            Our styling team organized coordinates together so you can easily furnish complete room corners harmoniously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roomCategories.map((room, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectCategory(room.category);
                  onNavigate('shop');
                }}
                className={`group cursor-pointer rounded-2xl p-6 ${room.bg} border border-charcoal/5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-left flex flex-col justify-between aspect-[1.4] relative overflow-hidden`}
                id={`room-card-${idx}`}
              >
                <div className="space-y-2 relative z-10">
                  <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors">{room.name}</h3>
                  <p className="text-xs text-charcoal/60 leading-relaxed font-sans max-w-[200px]">{room.desc}</p>
                </div>
                
                {/* SVG background overlay or floating accent */}
                <div className="absolute right-2 bottom-2 w-28 h-28 opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all pointer-events-none p-2">
                  <AuraSVG type={room.category === 'table-lamps' ? 'ceramic-lamp' : room.category === 'cushions' ? 'blockprint-cushion' : 'floor-mirror'} />
                </div>

                <div className="relative z-10 pt-4 flex items-center gap-1 text-[11px] font-semibold text-terracotta uppercase tracking-wider font-mono">
                  <span>Explore Corner</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEW ARRIVALS HORIZONTAL SCROLLER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-left mb-8">
          <span className="text-[10px] text-terracotta uppercase tracking-widest font-mono font-bold font-semibold">Just Released</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-charcoal mt-1">
            New <span className="italic text-terracotta underline underline-offset-4 decoration-1 decoration-[#C97C5D]/50">Arrivals</span>
          </h2>
        </div>

        {/* Horizontal scrollable box */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x scrollbar-thin">
          {newArrivals.map((product) => (
            <div key={product.id} className="w-72 shrink-0 snap-start">
              <ProductCard
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onViewDetails={(prod) => onNavigate('product-detail', prod)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIAL CAROUSEL (Auto-rotating with Dot Nav) */}
      <section className="bg-charcoal text-ivory py-16 md:py-20 border-y border-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] text-terracotta uppercase tracking-widest font-mono font-bold">The Nest Community</span>
          
          <div className="relative h-44 sm:h-36 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-x-0"
              >
                <p className="font-serif text-lg sm:text-2xl italic leading-relaxed max-w-3xl mx-auto text-white">
                  “{TESTIMONIALS[testimonialIdx].quote}”
                </p>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                    {TESTIMONIALS[testimonialIdx].author}
                  </p>
                  <p className="text-[10px] text-white/40 font-mono mt-0.5">
                    {TESTIMONIALS[testimonialIdx].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots indicator */}
          <div className="flex justify-center gap-2.5 pt-4">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                  testimonialIdx === idx ? 'bg-terracotta w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial slide ${idx + 1}`}
                id={`testimonial-dot-${idx}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. REASSURANCE TRUST BANNER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pb-8">
        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-[#B8C9B1]/20 text-charcoal mx-auto flex items-center justify-center">
            <ShieldCheck size={22} className="text-terracotta" />
          </div>
          <h4 className="font-serif text-base font-bold text-charcoal">Secure & Solid Transit</h4>
          <p className="text-xs text-charcoal/60 leading-relaxed font-sans max-w-xs mx-auto">
            Heavy mirrors and clay lamps traveling inside wooden crates and multi-layered honeycomb cells.
          </p>
        </div>

        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-[#B8C9B1]/20 text-charcoal mx-auto flex items-center justify-center">
            <Compass size={22} className="text-terracotta" />
          </div>
          <h4 className="font-serif text-base font-bold text-charcoal">Design Integrity</h4>
          <p className="text-xs text-charcoal/60 leading-relaxed font-sans max-w-xs mx-auto">
            100% natural fibers, unbleached cotton blends, soy waxes, and pure solid white Banswara marbles.
          </p>
        </div>

        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-[#B8C9B1]/20 text-charcoal mx-auto flex items-center justify-center">
            <Map size={22} className="text-terracotta" />
          </div>
          <h4 className="font-serif text-base font-bold text-charcoal">Complimentary Shipping</h4>
          <p className="text-xs text-charcoal/60 leading-relaxed font-sans max-w-xs mx-auto">
            Complimentary, damage-insured shipping directly from our studio door to major Indian metropolitan homes.
          </p>
        </div>
      </section>

    </div>
  );
}
