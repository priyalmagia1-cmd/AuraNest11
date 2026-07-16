import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { AuraSVG } from './AuraArt';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, finish: string, delta: number) => void;
  onRemoveItem: (productId: string, finish: string) => void;
  onViewCartPage: () => void;
  onCheckout: () => void;
  promoDiscount: number;
  promoCode: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onViewCartPage,
  onCheckout,
  promoDiscount,
  promoCode
}: CartDrawerProps) {
  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (promoDiscount / 100));
  const finalTotal = subtotal - discountAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-ivory shadow-2xl flex flex-col border-l border-[#E8DCCB]/40"
            id="cart-drawer-container"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E8DCCB]/50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-terracotta" />
                <h2 className="font-serif text-lg font-semibold text-charcoal">Your Styling Cart</h2>
                <span className="bg-beige text-charcoal text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#F8F6F2] text-charcoal/70 hover:text-charcoal transition-colors focus:outline-none"
                aria-label="Close cart drawer"
                id="close-cart-drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-beige/40 flex items-center justify-center mb-4 text-charcoal/40">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-charcoal mb-2">Your cart is empty</h3>
                  <p className="text-sm text-charcoal/60 font-sans max-w-xs mb-6">
                    Curate your space by adding beautiful wall arts, scented soy candles, or handcrafted ceramics.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onViewCartPage(); // Go to shop view
                    }}
                    className="bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-wider font-sans font-medium px-6 py-3 rounded-full transition-all cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedFinish}`}
                    className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E8DCCB]/30 shadow-sm"
                    id={`drawer-item-${item.product.id}`}
                  >
                    {/* SVG thumb */}
                    <div className="w-20 h-20 bg-beige/30 rounded-xl overflow-hidden p-2 flex items-center justify-center shrink-0">
                      <AuraSVG type={item.product.imageType} className="w-full h-full object-contain" />
                    </div>

                    {/* Meta info */}
                    <div className="flex-grow flex flex-col min-w-0">
                      <h4 className="font-serif text-sm font-medium text-charcoal truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-charcoal/50 font-sans mb-2">
                        Finish: <span className="font-medium text-charcoal/80">{item.selectedFinish}</span>
                      </p>

                      {/* Controls and Price row */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-[#E8DCCB] rounded-full px-1.5 py-0.5 bg-ivory">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedFinish, -1)}
                            className="p-1 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-[#E8DCCB]/30 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2.5 text-xs font-semibold font-mono text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedFinish, 1)}
                            className="p-1 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-[#E8DCCB]/30 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="font-sans text-xs font-semibold text-charcoal">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedFinish)}
                      className="text-charcoal/40 hover:text-terracotta transition-colors p-1 self-start"
                      aria-label="Remove item"
                      id={`remove-drawer-${item.product.id}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary (Sticky at bottom if cart not empty) */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#E8DCCB]/50 bg-white space-y-4">
                {/* Applied code banner */}
                {promoDiscount > 0 && (
                  <div className="bg-sage/10 text-charcoal border border-sage/20 rounded-xl p-2 px-3 flex items-center justify-between text-xs">
                    <span>Code <strong className="font-mono">{promoCode}</strong> applied ({promoDiscount}% Off)</span>
                    <span className="text-terracotta font-medium">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {/* Pricing summary details */}
                <div className="space-y-2 text-sm font-sans text-charcoal/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sage-dark">
                      <span>Promo Discount ({promoDiscount}%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Styling Shipping</span>
                    <span className="text-sage font-medium uppercase text-xs">Free Complimentary</span>
                  </div>
                  <div className="border-t border-[#E8DCCB]/30 pt-3 flex justify-between text-base font-semibold text-charcoal">
                    <span>Estimated Total</span>
                    <span className="text-terracotta">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Direct Checkout Button */}
                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold py-4 rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                  id="drawer-checkout-btn"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </button>

                {/* View Full Cart Page Button */}
                <button
                  onClick={() => {
                    onClose();
                    onViewCartPage();
                  }}
                  className="w-full bg-ivory hover:bg-beige text-charcoal text-xs uppercase tracking-widest font-sans font-semibold py-3 rounded-full transition-colors border border-charcoal/10"
                  id="drawer-view-cart-btn"
                >
                  View Styling Cart Detail
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
