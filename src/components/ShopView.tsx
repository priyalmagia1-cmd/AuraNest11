import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Grid3X3, Filter, Search } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  initialCategory?: string;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, finish: string) => void;
  onViewDetails: (product: Product) => void;
}

export function ShopView({
  initialCategory = 'all',
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onViewDetails
}: ShopViewProps) {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(15000); // INR Max
  const [sortOption, setSortOption] = useState('popularity'); // popularity, price-asc, price-desc, rating
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if initialCategory changes from home nav
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(15000);
    setSearchQuery('');
    setSortOption('popularity');
  };

  // Perform combinable filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Max Price Filter
    result = result.filter(p => p.price <= maxPrice);

    // 3. Search text query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.shortDesc.toLowerCase().includes(q) ||
             p.material.toLowerCase().includes(q)
      );
    }

    // 4. Sorting logic
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // default: popularity / review count
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCategory, maxPrice, searchQuery, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 font-sans" id="shop-view-container">
      
      {/* Page Title & Search Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DCCB]/40">
        <div className="text-left">
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal">The <span className="italic text-terracotta underline underline-offset-4 decoration-1 decoration-[#C97C5D]/50">Styling</span> Catalogue</h1>
          <p className="text-xs sm:text-sm text-charcoal/60 mt-1 leading-relaxed">
            Filter by craft, refine by budget, and select the perfect finish coordinates.
          </p>
        </div>

        {/* Local Search input */}
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Search within listing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full pl-11 pr-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1 focus:ring-terracotta shadow-sm"
          />
          <Search size={14} className="absolute left-4 top-3.5 text-charcoal/40" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-[10px] uppercase text-charcoal/50 font-mono tracking-wider font-semibold hover:text-terracotta"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS (Visible on lg+) */}
        <aside className="hidden lg:block bg-white rounded-2xl p-6 border border-[#E8DCCB]/40 space-y-8 sticky top-32 shadow-sm" id="shop-desktop-sidebar">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]/20">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-terracotta" />
              <h3 className="font-serif text-base font-bold text-charcoal">Refine By</h3>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase font-mono tracking-wider font-semibold text-charcoal/50 hover:text-terracotta flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={10} />
              Reset
            </button>
          </div>

          {/* Categories Filter list */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Categories</h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-2 scrollbar-thin">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-beige/50 text-terracotta font-semibold' 
                      : 'text-charcoal/80 hover:bg-[#F8F6F2]'
                  }`}
                  id={`filter-cat-btn-${cat.id}`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4 pt-4 border-t border-[#E8DCCB]/20">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-semibold text-charcoal uppercase tracking-wider">Budget Limit</h4>
              <span className="font-mono font-medium text-terracotta bg-beige/30 px-2 py-0.5 rounded-md">
                Up to ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-[#E8DCCB]/40 rounded-lg appearance-none cursor-pointer accent-terracotta"
              id="desktop-price-slider"
            />
            <div className="flex justify-between text-[10px] text-charcoal/40 font-mono">
              <span>₹1,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Sourcing Promise info box */}
          <div className="p-4 bg-[#B8C9B1]/10 rounded-xl border border-[#B8C9B1]/30">
            <h5 className="font-serif text-xs font-bold text-charcoal">Stylist Choice Guarantee</h5>
            <p className="text-[10px] text-charcoal/60 leading-relaxed font-sans mt-1">
              Every lamp, basket, and mirror is checked for weave structural integrity and glass clarity at our Bangalore studio before shipping.
            </p>
          </div>

        </aside>

        {/* MOBILE FILTER & SORT TOGGLES PANEL (Visible below lg) */}
        <div className="lg:hidden flex items-center justify-between bg-white rounded-xl p-3 border border-[#E8DCCB]/40 shadow-sm mb-4" id="shop-mobile-toggles">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal uppercase tracking-wider py-1.5 px-3 rounded-lg hover:bg-[#F8F6F2] focus:outline-none"
            id="mobile-filter-open-btn"
          >
            <Filter size={14} className="text-terracotta" />
            Filters
            {selectedCategory !== 'all' || maxPrice < 15000 ? (
              <span className="w-2 h-2 rounded-full bg-terracotta" />
            ) : null}
          </button>

          {/* Sort selection inline */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal">
            <ArrowUpDown size={14} className="text-charcoal/40" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent font-semibold uppercase tracking-wider outline-none text-xs text-charcoal py-1 cursor-pointer"
            >
              <option value="popularity">Bestsellers</option>
              <option value="price-asc">Price: Low-High</option>
              <option value="price-desc">Price: High-Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* MAIN PRODUCT LISTING SECTION (span 3 on desktop) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* List stats & Desktop Sort Header */}
          <div className="hidden lg:flex items-center justify-between pb-3.5 border-b border-[#E8DCCB]/20 text-xs">
            <div className="text-charcoal/60 font-sans">
              Showing <strong className="text-charcoal">{filteredProducts.length}</strong> beautiful pieces
              {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
            </div>

            {/* Desktop Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-[10px]">Sort By:</span>
              <div className="flex gap-2">
                {[
                  { value: 'popularity', label: 'Bestselling' },
                  { value: 'price-asc', label: 'Price: Low' },
                  { value: 'price-desc', label: 'Price: High' },
                  { value: 'rating', label: 'Top Rated' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortOption(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-wider transition-colors ${
                      sortOption === opt.value
                        ? 'bg-charcoal text-white'
                        : 'bg-white hover:bg-beige/35 text-charcoal border border-charcoal/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Grid list */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DCCB]/40 shadow-sm max-w-xl mx-auto my-12" id="shop-empty-state">
              {/* Illustrative drawing */}
              <div className="w-32 h-32 bg-beige/30 rounded-full flex items-center justify-center p-4 mx-auto mb-6">
                <SlidersHorizontal size={40} className="text-charcoal/30 animate-pulse" />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-charcoal mb-2">No Matching Decor Found</h3>
              <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed font-sans max-w-sm mx-auto mb-6">
                We couldn't find items matching your combined parameters. Try sliding the budget range up or resetting filters to start over.
              </p>

              <button
                onClick={handleResetFilters}
                className="bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer"
                id="reset-filter-btn"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="shop-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER OVERLAY */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" id="mobile-filter-modal">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <div className="relative ml-0 mr-auto w-full max-w-xs bg-ivory h-full flex flex-col p-6 shadow-2xl border-r border-[#E8DCCB]/50 animate-slide-in-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCB]/30 mb-6">
              <h3 className="font-serif text-lg font-bold text-charcoal">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-xs font-mono text-charcoal/50 hover:text-terracotta uppercase font-bold"
              >
                Close
              </button>
            </div>

            {/* Content list */}
            <div className="flex-grow overflow-y-auto space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">Categories</h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left text-xs py-2 px-3 rounded-xl ${
                        selectedCategory === cat.id ? 'bg-beige text-terracotta font-semibold' : 'text-charcoal'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E8DCCB]/30">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-semibold text-charcoal uppercase tracking-wider">Max Price</h4>
                  <span className="font-mono text-terracotta font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terracotta h-1.5 bg-[#E8DCCB]/40 rounded-lg appearance-none cursor-pointer"
                  id="mobile-price-slider"
                />
              </div>
            </div>

            {/* Footer triggers */}
            <div className="pt-6 border-t border-[#E8DCCB]/30 space-y-2">
              <button
                onClick={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full bg-[#F8F6F2] hover:bg-beige text-charcoal text-xs uppercase tracking-wider font-semibold py-3 rounded-xl transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-wider font-semibold py-3.5 rounded-xl shadow-md transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
