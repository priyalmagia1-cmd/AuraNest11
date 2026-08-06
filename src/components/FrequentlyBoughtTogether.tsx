import { useState } from 'react';
import { Plus, Check, ShoppingBag, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { AuraSVG } from './AuraArt';

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
  onAddToCart: (product: Product, finish: string, quantity?: number) => void;
  onToastNotification?: (message: string, type?: 'success' | 'info') => void;
  onNavigateToProduct?: (product: Product) => void;
}

export function FrequentlyBoughtTogether({
  currentProduct,
  onAddToCart,
  onToastNotification,
  onNavigateToProduct
}: FrequentlyBoughtTogetherProps) {
  // Find 2 complementary products from different or complementary categories
  const bundleItems = [
    currentProduct,
    ...PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 2)
  ];

  // State of selected item IDs in bundle (default all 3 selected)
  const [selectedIds, setSelectedIds] = useState<string[]>(
    bundleItems.map(item => item.id)
  );

  const toggleItem = (id: string) => {
    // Keep at least the current product or any 1 item checked
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(itemId => itemId !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedProducts = bundleItems.filter(item => selectedIds.includes(item.id));
  
  // Base raw total
  const rawTotal = selectedProducts.reduce((acc, item) => acc + item.price, 0);
  
  // 15% Bundle Discount applied if 2 or more items are selected
  const hasBundleDiscount = selectedProducts.length >= 2;
  const bundleDiscountPercent = hasBundleDiscount ? 15 : 0;
  const bundleTotal = hasBundleDiscount 
    ? Math.round(rawTotal * 0.85) 
    : rawTotal;
  const savings = rawTotal - bundleTotal;

  const handleAddBundleToCart = () => {
    selectedProducts.forEach(product => {
      const defaultFinish = product.finishes[0] || 'Standard';
      onAddToCart(product, defaultFinish, 1);
    });

    if (onToastNotification) {
      if (hasBundleDiscount) {
        onToastNotification(
          `Added ${selectedProducts.length}-item styling bundle to cart! You saved ₹${savings.toLocaleString('en-IN')} (15% OFF)!`,
          'success'
        );
      } else {
        onToastNotification(`Added item to your cart!`, 'success');
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-ivory via-white to-beige/20 rounded-3xl p-6 md:p-8 border border-[#E8DCCB] shadow-sm font-sans text-left space-y-6" id="frequently-bought-together-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DCCB]/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse" />
            <h3 className="font-serif font-bold text-xl text-charcoal">Frequently Bought Together</h3>
          </div>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Hand-curated decor coordinates that pair effortlessly with {currentProduct.name}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 font-mono text-xs font-bold border border-amber-500/20 self-start sm:self-auto">
          <Sparkles size={13} className="text-amber-500" />
          Bundle & Save 15% OFF
        </span>
      </div>

      {/* Bundle Products Visual Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
          {bundleItems.map((product, idx) => {
            const isSelected = selectedIds.includes(product.id);
            const isMain = product.id === currentProduct.id;

            return (
              <div key={product.id} className="flex items-center gap-3">
                {/* Product Box */}
                <div
                  onClick={() => toggleItem(product.id)}
                  className={`group relative w-32 sm:w-36 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-white border-terracotta shadow-md ring-2 ring-terracotta/10'
                      : 'bg-ivory/60 border-charcoal/10 opacity-60 hover:opacity-100'
                  }`}
                  id={`bundle-item-${product.id}`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-terracotta text-white' : 'bg-white border border-charcoal/30'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  {/* Main Tag */}
                  {isMain && (
                    <span className="absolute top-2 right-2 bg-charcoal text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      This Item
                    </span>
                  )}

                  {/* Thumbnail */}
                  <div className="w-20 h-20 mx-auto bg-beige/30 rounded-xl p-2 flex items-center justify-center my-2">
                    <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
                  </div>

                  {/* Product Info */}
                  <div className="text-center space-y-0.5">
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigateToProduct) onNavigateToProduct(product);
                      }}
                      className="font-serif font-bold text-xs text-charcoal line-clamp-1 hover:text-terracotta transition-colors"
                    >
                      {product.name}
                    </p>
                    <p className="font-sans font-bold text-xs text-terracotta">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Plus Icon separator between items */}
                {idx < bundleItems.length - 1 && (
                  <div className="w-7 h-7 rounded-full bg-beige/60 text-charcoal/50 flex items-center justify-center shrink-0 font-bold text-xs">
                    <Plus size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pricing Summary & Add Bundle Button */}
        <div className="w-full md:w-64 bg-white p-5 rounded-2xl border border-[#E8DCCB] space-y-3 shrink-0 text-center md:text-left shadow-xs">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal/50">
              Bundle Total ({selectedProducts.length} items)
            </p>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="font-sans text-2xl font-bold text-charcoal">
                ₹{bundleTotal.toLocaleString('en-IN')}
              </span>
              {hasBundleDiscount && rawTotal > bundleTotal && (
                <span className="font-sans text-sm text-charcoal/40 line-through">
                  ₹{rawTotal.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {hasBundleDiscount && (
              <p className="text-xs font-bold text-sage flex items-center justify-center md:justify-start gap-1">
                <Tag size={12} /> Save ₹{savings.toLocaleString('en-IN')} (15% Bundle Discount)
              </p>
            )}
          </div>

          <button
            onClick={handleAddBundleToCart}
            disabled={selectedProducts.length === 0}
            className="w-full py-3 px-4 rounded-xl bg-terracotta hover:bg-charcoal text-white font-serif font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            id="add-bundle-to-cart-btn"
          >
            <ShoppingBag size={14} />
            <span>Add Bundle to Cart</span>
          </button>

          <p className="text-[10px] text-charcoal/50 font-sans text-center">
            Free White-Glove Shipping included for bundle orders
          </p>
        </div>
      </div>
    </div>
  );
}
