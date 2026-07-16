import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveView, Product, CartItem } from './types';
import { PRODUCTS } from './data';

// Component imports
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { CategoryDrawer } from './components/CategoryDrawer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';

import {
  AboutUsView,
  BlogView,
  ContactUsView,
  FAQsView,
  PrivacyPolicyView,
  TermsOfServiceView
} from './components/StaticViews';
import { AuraSVG } from './components/AuraArt';

export default function App() {
  // Navigation & Product details state
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  
  // Coupon Promotion state
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Toast notifier helpers
  const triggerToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add item to cart
  const handleAddToCart = (product: Product, finish: string, quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedFinish === finish
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, selectedFinish: finish }];
      }
    });

    triggerToast(`Added ${quantity}x ${product.name} (${finish}) to styling cart.`);
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: string, finish: string) => {
    const item = cart.find((i) => i.product.id === productId && i.selectedFinish === finish);
    if (item) {
      setCart((prev) =>
        prev.filter((i) => !(i.product.id === productId && i.selectedFinish === finish))
      );
      triggerToast(`Removed ${item.product.name} (${finish}) from styling cart.`, 'info');
    }
  };

  // Sync / update quantity stepper
  const handleUpdateCartQuantity = (productId: string, finish: string, delta: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === productId && item.selectedFinish === finish
      );

      if (existingIdx === -1) return prev;

      const copy = [...prev];
      const newQty = copy[existingIdx].quantity + delta;

      if (newQty <= 0) {
        // Remove item if quantity falls to 0
        triggerToast(`Removed item from styling cart.`, 'info');
        return prev.filter((item) => !(item.product.id === productId && item.selectedFinish === finish));
      } else {
        copy[existingIdx].quantity = newQty;
        return copy;
      }
    });
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(product.id);
      if (isSaved) {
        triggerToast(`Removed ${product.name} from wishlist.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        triggerToast(`Saved ${product.name} to wishlist successfully.`);
        return [...prev, product.id];
      }
    });
  };

  // Move items from Wishlist to Cart
  const handleMoveWishToCart = (product: Product) => {
    // Add first finish as default
    handleAddToCart(product, product.finishes[0], 1);
    // Remove from wishlist
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  const handleApplyPromoCode = (code: string, discount: number) => {
    setPromoCode(code);
    setPromoDiscount(discount);
  };

  // Central SPA routing helper
  const handleNavigate = (view: ActiveView, targetProduct?: Product) => {
    if (targetProduct) {
      setSelectedProduct(targetProduct);
    }
    setCurrentView(view);
  };

  const handleSelectCategoryFromHome = (category: string) => {
    setSelectedCategory(category);
  };

  // Calculated totals
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal selection:bg-terracotta/25 selection:text-charcoal font-sans">
      
      {/* 1. Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenCategoryDrawer={() => setIsCategoryDrawerOpen(true)}
      />

      {/* 2. Main content view transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentView === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onSelectCategory={handleSelectCategoryFromHome}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(prod, fin) => handleAddToCart(prod, fin, 1)}
              />
            )}

            {currentView === 'shop' && (
              <ShopView
                initialCategory={selectedCategory}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(prod, fin) => handleAddToCart(prod, fin, 1)}
                onViewDetails={(prod) => handleNavigate('product-detail', prod)}
              />
            )}

            {currentView === 'product-detail' && selectedProduct && (
              <ProductDetailView
                product={selectedProduct}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onNavigate={handleNavigate}
                onBackToCatalogue={() => handleNavigate('shop')}
              />
            )}

            {currentView === 'cart-page' && (
              <CartView
                cartItems={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={() => handleNavigate('checkout')}
                onBackToShop={() => handleNavigate('shop')}
                promoCode={promoCode}
                promoDiscount={promoDiscount}
                onApplyPromoCode={handleApplyPromoCode}
                onSuccessToast={(msg) => triggerToast(msg, 'success')}
                onErrorToast={(msg) => triggerToast(msg, 'error')}
              />
            )}

            {currentView === 'wishlist' && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 text-left">
                <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal mb-3">Saved Coordinates</h1>
                <p className="text-xs sm:text-sm text-charcoal/60 mb-10 leading-relaxed">
                  Your curated Wishlist. Secure items you love before they sell out.
                </p>

                {wishlist.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DCCB]/40 shadow-sm max-w-xl mx-auto my-8">
                    <div className="w-20 h-20 bg-beige/30 rounded-full flex items-center justify-center mx-auto mb-6 text-charcoal/30">
                      <span className="text-2xl">♡</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Your Wishlist is Empty</h3>
                    <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed max-w-xs mx-auto mb-8">
                      Tap the heart icon on any product listing to save beautiful coordinates here.
                    </p>
                    <button
                      onClick={() => handleNavigate('shop')}
                      className="bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold px-8 py-4 rounded-full shadow-md transition-colors cursor-pointer"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCCB]/30 p-3 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="aspect-square bg-beige/20 rounded-xl overflow-hidden p-4 flex items-center justify-center relative">
                            <AuraSVG type={product.imageType} className="w-full h-full object-contain" />
                            <button
                              onClick={() => handleToggleWishlist(product)}
                              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-ivory hover:text-terracotta text-charcoal shadow-sm"
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="pt-3 pb-2 text-left">
                            <h3 className="font-serif text-base font-bold text-charcoal line-clamp-1">{product.name}</h3>
                            <p className="text-[10px] text-charcoal/50 uppercase tracking-wider">{product.category.replace('-', ' ')}</p>
                            <p className="text-sm font-semibold text-charcoal mt-2">₹{product.price.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMoveWishToCart(product)}
                          className="w-full bg-charcoal hover:bg-terracotta text-white text-[11px] uppercase tracking-widest font-sans font-semibold py-2.5 rounded-xl transition-colors mt-2"
                        >
                          Move To Styling Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentView === 'checkout' && (
              <CheckoutView
                cartItems={cart}
                promoDiscount={promoDiscount}
                promoCode={promoCode}
                onClearCart={() => setCart([])}
                onNavigateHome={() => handleNavigate('home')}
                onSuccessToast={(msg) => triggerToast(msg, 'success')}
                onErrorToast={(msg) => triggerToast(msg, 'error')}
              />
            )}

            {currentView === 'about-us' && <AboutUsView />}
            {currentView === 'blog' && <BlogView onNavigate={handleNavigate} />}
            {currentView === 'contact-us' && <ContactUsView onSuccessToast={(msg) => triggerToast(msg, 'success')} />}
            {currentView === 'faqs' && <FAQsView />}
            {currentView === 'privacy' && <PrivacyPolicyView />}
            {currentView === 'terms' && <TermsOfServiceView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSubscribeNotification={(email) => triggerToast(`Subscribed ${email} to AuraNest Interior Journal list!`)}
      />

      {/* 4. Slide-in Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onViewCartPage={() => handleNavigate('cart-page')}
        onCheckout={() => handleNavigate('checkout')}
        promoDiscount={promoDiscount}
        promoCode={promoCode}
      />

      {/* Slide-in Category Drawer Panel */}
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
        onSelectCategory={(categoryId) => {
          setSelectedCategory(categoryId);
          handleNavigate('shop');
        }}
      />

      {/* 5. Custom micro-toast snackbars */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
