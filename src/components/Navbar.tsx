import { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, CornerDownRight, Sparkles, TrendingUp, Tag, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ActiveView } from '../types';
import { PRODUCTS } from '../data';
import { AuraSVG } from './AuraArt';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView, targetProduct?: Product) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCartDrawer: () => void;
  onOpenCategoryDrawer: () => void;
  onOpenAIStudio?: () => void;
}

export function Navbar({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCartDrawer,
  onOpenCategoryDrawer,
  onOpenAIStudio
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for shadow trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products live as user types
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const q = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 5)); // Limit to top 5 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Click outside search container to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autofocus input when search panel opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navLinks: { label: string; view: ActiveView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop Catalogue', view: 'shop' },
    { label: 'About Us', view: 'about-us' },
    { label: 'Contact Us', view: 'contact-us' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-ivory/95 backdrop-blur-md shadow-md border-b border-[#E8DCCB]/50 py-3' 
            : 'bg-ivory border-b border-[#E8DCCB]/20 py-5'
        }`}
        id="auranest-header"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[#E8DCCB]/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Elegant Typographic Logo & Micro-navigation Stack */}
          <div className="flex flex-col items-start">
            <div 
              onClick={() => onNavigate('home')}
              className="flex flex-col cursor-pointer select-none group"
              id="logo-container"
            >
              <div className="flex items-center gap-1">
                <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-charcoal group-hover:text-terracotta transition-colors">
                  AuraNest
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2" />
              </div>
              <span className="text-xs md:text-sm text-terracotta font-serif font-extrabold italic tracking-[0.15em] whitespace-nowrap -mt-0.5 pl-0.5 transition-colors">
                Decór that lingers
              </span>
            </div>

            {/* Premium, elegant horizontal links right under the tagline */}
            <nav className="hidden md:flex items-center gap-6 mt-2 border-t border-charcoal/20 pt-1.5 w-full justify-start">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  className={`font-sans text-xs md:text-[13px] uppercase tracking-widest font-extrabold transition-all hover:text-terracotta relative py-0.5 focus:outline-none ${
                    currentView === link.view ? 'text-terracotta' : 'text-charcoal/85'
                  }`}
                >
                  {link.label}
                  {currentView === link.view && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-terracotta rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Desktop Navigation Links removed per request */}

          {/* Action icons (AI Studio, Search, Wishlist, Cart) */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* AI Image Studio Button */}
            {onOpenAIStudio && (
              <button
                onClick={onOpenAIStudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-terracotta to-amber-700 hover:from-charcoal hover:to-charcoal text-white font-serif font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer border border-amber-300/30 hover:scale-105"
                title="AI Décor Staging Studio (1K, 2K, 4K Resolution)"
                id="ai-studio-navbar-btn"
              >
                <Sparkles size={14} className="text-amber-200" />
                <span className="hidden sm:inline">AI Studio</span>
                <span className="bg-white/20 text-white text-[9px] font-mono px-1.5 py-0.2 rounded-full font-extrabold">4K</span>
              </button>
            )}

            {/* Search Icon button */}
            <div className="relative" ref={searchContainerRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-full hover:bg-[#E8DCCB]/30 text-charcoal focus:outline-none transition-colors ${
                  isSearchOpen ? 'bg-[#E8DCCB]/40 text-terracotta' : ''
                }`}
                aria-label="Search items"
                id="search-toggle-btn"
              >
                <Search size={20} />
              </button>

              {/* Inline Smart Search Dropdown Box */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3 w-80 md:w-[420px] bg-white rounded-3xl shadow-2xl border border-[#E8DCCB]/60 overflow-hidden z-50 p-4 space-y-4"
                    id="search-dropdown-box"
                  >
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search mirrors, table lamps, brass, vases..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-ivory rounded-2xl pl-10 pr-16 py-3 text-xs text-charcoal placeholder-charcoal/40 border border-charcoal/10 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none font-sans font-medium"
                        id="smart-search-input-field"
                      />
                      <Search size={16} className="absolute left-3.5 top-3.5 text-terracotta" />
                      {searchQuery ? (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="absolute right-3 top-2.5 text-[10px] text-charcoal/50 uppercase font-mono tracking-wider font-semibold hover:text-terracotta bg-beige/40 px-2 py-1 rounded-md"
                        >
                          Clear
                        </button>
                      ) : (
                        <span className="absolute right-3 top-3 text-[10px] text-charcoal/40 font-mono">
                          ESC
                        </span>
                      )}
                    </div>

                    {/* Zero State: Frequently Searched & Popular Categories Suggestions */}
                    {searchQuery.trim().length === 0 && (
                      <div className="space-y-4 pt-1 pb-2">
                        {/* Popular Searches */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-charcoal/50 uppercase tracking-wider">
                            <TrendingUp size={12} className="text-terracotta" />
                            <span>Trending Searches</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {['Arch Mirror', 'Terracotta Vase', 'Brass Sconce', 'Minimalist Lamp', 'Ceramic Tableware'].map((term) => (
                              <button
                                key={term}
                                onClick={() => setSearchQuery(term)}
                                className="text-xs bg-beige/40 hover:bg-terracotta hover:text-white text-charcoal/80 px-3 py-1.5 rounded-full border border-charcoal/10 transition-colors cursor-pointer"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick Filter Shortcuts */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-charcoal/50 uppercase tracking-wider">
                            <SlidersHorizontal size={12} className="text-terracotta" />
                            <span>Filter Shortcuts</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <button
                              onClick={() => {
                                setSearchQuery('Under ₹3000');
                                const under = PRODUCTS.filter(p => p.price <= 3000);
                                setSearchResults(under);
                              }}
                              className="p-2 rounded-xl bg-ivory hover:bg-beige/40 text-charcoal/80 border border-[#E8DCCB] text-left font-sans flex items-center justify-between"
                            >
                              <span>Under ₹3,000</span>
                              <Tag size={12} className="text-terracotta" />
                            </button>
                            <button
                              onClick={() => {
                                setSearchQuery('Lighting');
                              }}
                              className="p-2 rounded-xl bg-ivory hover:bg-beige/40 text-charcoal/80 border border-[#E8DCCB] text-left font-sans flex items-center justify-between"
                            >
                              <span>Lighting Collection</span>
                              <Sparkles size={12} className="text-amber-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Active Search Results with Category Smart Suggestions */}
                    {searchQuery.trim().length > 0 && (
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        
                        {/* Auto-suggest Tag Suggestions */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          <span className="text-[10px] font-mono text-charcoal/40 uppercase font-bold shrink-0">Matches:</span>
                          {['Ceramics', 'Brass Finish', 'Living Room', 'Artisanal'].map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="text-[10px] bg-sage/10 hover:bg-sage hover:text-white text-sage px-2.5 py-1 rounded-full border border-sage/20 shrink-0 font-bold transition-colors cursor-pointer"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>

                        {/* Product Results list */}
                        <div className="divide-y divide-[#E8DCCB]/30">
                          {searchResults.length === 0 ? (
                            <div className="p-6 text-center space-y-2">
                              <p className="text-xs text-charcoal/60 font-sans">
                                No decor pieces matching "<strong>{searchQuery}</strong>"
                              </p>
                              <button
                                onClick={() => setSearchQuery('')}
                                className="text-xs text-terracotta font-serif font-bold hover:underline"
                              >
                                View All Products
                              </button>
                            </div>
                          ) : (
                            searchResults.map((product) => (
                              <div
                                key={product.id}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                  setSearchResults([]);
                                  onNavigate('product-detail', product);
                                }}
                                className="p-2.5 flex items-center gap-3 hover:bg-beige/30 rounded-2xl cursor-pointer transition-colors group/item"
                                id={`search-result-${product.id}`}
                              >
                                <div className="w-12 h-12 bg-ivory rounded-xl border border-[#E8DCCB] p-1 flex items-center justify-center shrink-0">
                                  <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="font-serif text-xs font-bold text-charcoal truncate group-hover/item:text-terracotta transition-colors">
                                      {product.name}
                                    </h4>
                                    {product.price < 4000 && (
                                      <span className="bg-sage/15 text-sage text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                                        Value Pick
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-charcoal/60 truncate font-sans">
                                    {product.category.replace('-', ' ')} · <span className="font-bold text-charcoal">₹{product.price.toLocaleString('en-IN')}</span>
                                  </p>
                                </div>
                                <CornerDownRight size={14} className="text-charcoal/30 group-hover/item:text-terracotta group-hover/item:translate-x-1 transition-all shrink-0" />
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Icon with badge */}
            <button
              onClick={() => onNavigate('wishlist')}
              className={`p-2.5 rounded-full hover:bg-[#E8DCCB]/30 text-charcoal focus:outline-none transition-colors relative ${
                currentView === 'wishlist' ? 'text-terracotta bg-[#E8DCCB]/25' : ''
              }`}
              aria-label="View wishlist"
              id="wishlist-nav-btn"
            >
              <Heart size={20} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-terracotta text-ivory text-[9px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-ivory"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Cart Icon with badge */}
            <button
              onClick={onOpenCartDrawer}
              className="p-2.5 rounded-full hover:bg-[#E8DCCB]/30 text-charcoal focus:outline-none transition-colors relative"
              aria-label="Open cart"
              id="cart-nav-btn"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-sage text-charcoal text-[9px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-ivory"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Category Navigation Hamburger Menu Button */}
            <button
              onClick={onOpenCategoryDrawer}
              className="p-2.5 rounded-full hover:bg-[#E8DCCB]/30 text-charcoal focus:outline-none transition-colors relative"
              aria-label="Open category navigation"
              id="category-menu-btn"
            >
              <Menu size={20} />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-charcoal/40 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Nav Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed left-0 top-0 bottom-0 z-30 w-full max-w-xs bg-ivory shadow-2xl flex flex-col border-r border-[#E8DCCB]/40 md:hidden p-6"
              id="mobile-nav-panel"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DCCB]/40 mb-6 mt-4">
                <span className="font-serif text-xl font-bold tracking-tight text-charcoal">
                  AuraNest
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-beige/40 text-charcoal focus:outline-none"
                  aria-label="Close menu"
                  id="mobile-nav-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links List */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.view}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate(link.view);
                    }}
                    className={`flex items-center justify-between font-sans text-sm font-semibold tracking-wide py-3.5 px-4 rounded-xl text-left transition-colors focus:outline-none ${
                      currentView === link.view 
                        ? 'bg-beige/40 text-terracotta font-bold' 
                        : 'text-charcoal hover:bg-beige/25'
                    }`}
                  >
                    {link.label}
                    <ArrowRight size={14} className={currentView === link.view ? 'text-terracotta' : 'text-charcoal/30'} />
                  </button>
                ))}
              </div>

              {/* Tagline footer in drawer */}
              <div className="mt-auto pt-6 border-t border-[#E8DCCB]/40 text-center text-[10px] text-charcoal/40 font-serif italic">
                “Modern décor for warm, intentional living.”
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
