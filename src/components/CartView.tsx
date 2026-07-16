import { useState, useMemo, FormEvent } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { AuraSVG } from './AuraArt';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, finish: string, delta: number) => void;
  onRemoveItem: (productId: string, finish: string) => void;
  onCheckout: () => void;
  onBackToShop: () => void;
  promoCode: string;
  promoDiscount: number;
  onApplyPromoCode: (code: string, discount: number) => void;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

export function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBackToShop,
  promoCode,
  promoDiscount,
  onApplyPromoCode,
  onSuccessToast,
  onErrorToast
}: CartViewProps) {
  const [couponInput, setCouponInput] = useState('');
  const [pincode, setPincode] = useState('');
  const [shippingEstimate, setShippingEstimate] = useState<string | null>(null);

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return Math.round(subtotal * (promoDiscount / 100));
  }, [subtotal, promoDiscount]);

  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'NEST20') {
      onApplyPromoCode('NEST20', 20);
      onSuccessToast('NEST20 Coupon applied! You saved 20% on your entire order.');
      setCouponInput('');
    } else if (code === 'AURA15') {
      onApplyPromoCode('AURA15', 15);
      onSuccessToast('AURA15 Coupon applied! You saved 15% on your entire order.');
      setCouponInput('');
    } else if (code === 'WELCOME10') {
      onApplyPromoCode('WELCOME10', 10);
      onSuccessToast('WELCOME10 Coupon applied! You saved 10% on your first order.');
      setCouponInput('');
    } else {
      onErrorToast('Invalid Promo Code. Try using "NEST20" or "AURA15" for testing!');
    }
  };

  const handlePincodeCheck = (e: FormEvent) => {
    e.preventDefault();
    const pin = pincode.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      // Simulate delivery estimates based on pin code regions
      const firstDigit = pin[0];
      let days = '3 business days';
      if (firstDigit === '4') days = '2 business days (Priority Mumbai Hub)';
      else if (firstDigit === '5') days = '2 business days (Priority Bengaluru Hub)';
      else if (firstDigit === '1' || firstDigit === '2') days = '3 business days (Priority Delhi Hub)';
      else days = '4-5 business days';

      setShippingEstimate(`Estimated Delivery to pincode ${pin}: within ${days}.`);
      onSuccessToast('Transit times estimated successfully.');
    } else {
      onErrorToast('Please enter a valid 6-digit numerical pincode (e.g., 560001).');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 font-sans text-left" id="cart-view-container">
      <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal mb-3">Your Styling Cart</h1>
      <p className="text-xs sm:text-sm text-charcoal/60 mb-10 leading-relaxed">
        Review your organic coordinates and select coupons before finalizing shipping details.
      </p>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DCCB]/40 shadow-sm max-w-xl mx-auto my-8">
          <div className="w-20 h-20 bg-beige/30 rounded-full flex items-center justify-center mx-auto mb-6 text-charcoal/30">
            <ShoppingBag size={32} />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Your cart is currently empty</h3>
          <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed max-w-xs mx-auto mb-8">
            You haven't added any home decor pieces yet. Browse our styled ceramics, mirrors, or block-prints to begin.
          </p>
          <button
            onClick={onBackToShop}
            className="bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold px-8 py-4 rounded-full shadow-md transition-colors cursor-pointer"
          >
            Browse Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Line Items Table (span 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-[#E8DCCB]/40 text-[10px] text-charcoal/40 font-mono uppercase tracking-wider font-semibold px-4">
              <span className="col-span-6">Product Coordinates</span>
              <span className="col-span-2 text-center">Style Finish</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Price Total</span>
            </div>

            {/* List Loop */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedFinish}`}
                  className="bg-white rounded-2xl p-4 border border-[#E8DCCB]/30 shadow-sm flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4"
                  id={`cart-item-row-${item.product.id}`}
                >
                  {/* Thumbnail & Title (col 6) */}
                  <div className="sm:col-span-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-beige/30 rounded-xl overflow-hidden p-1.5 flex items-center justify-center shrink-0">
                      <AuraSVG type={item.product.imageType} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-sm font-bold text-charcoal line-clamp-1">{item.product.name}</h3>
                      <p className="text-[10px] text-charcoal/50 font-sans mt-0.5 uppercase tracking-wider">{item.product.category.replace('-', ' ')}</p>
                    </div>
                  </div>

                  {/* Finish (col 2) */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center">
                    <span className="text-xs text-charcoal/70 bg-beige/40 px-3 py-1 rounded-full font-sans font-medium">
                      {item.selectedFinish}
                    </span>
                  </div>

                  {/* Quantity adjustment (col 2) */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center">
                    <div className="flex items-center border border-[#E8DCCB] rounded-full px-1.5 py-1 bg-ivory">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedFinish, -1)}
                        className="p-1 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-[#E8DCCB]/30 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-3 text-xs font-semibold font-mono text-charcoal">
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
                  </div>

                  {/* Price & Remove (col 2) */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-none border-charcoal/5">
                    <span className="sm:hidden text-xs text-charcoal/50">Total:</span>
                    <div className="text-right flex items-center gap-3">
                      <span className="font-sans text-xs sm:text-sm font-semibold text-charcoal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedFinish)}
                        className="text-charcoal/40 hover:text-terracotta transition-colors p-1"
                        aria-label="Remove item"
                        id={`remove-row-${item.product.id}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Back action */}
            <div className="pt-4 text-left">
              <button
                onClick={onBackToShop}
                className="text-xs font-semibold text-terracotta hover:text-charcoal uppercase tracking-wider transition-colors focus:outline-none"
              >
                ← Continue Adding Coordinates
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: Coupon & Summary Column (span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Promo Code coupon form */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DCCB]/40 shadow-sm space-y-4">
              <h3 className="font-serif text-sm font-bold text-charcoal uppercase tracking-wider">Stylist Promo Coupons</h3>
              
              {promoDiscount > 0 ? (
                <div className="bg-sage/10 text-charcoal border border-sage/20 rounded-xl p-3 flex items-center justify-between text-xs animate-fade-in-up">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C97C5D]" />
                    <span>Coupon <strong>{promoCode}</strong> applied ({promoDiscount}% Off!)</span>
                  </div>
                  <button
                    onClick={() => onApplyPromoCode('', 0)}
                    className="text-[10px] uppercase font-mono tracking-wider font-bold text-terracotta hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2" id="coupon-apply-form">
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEST20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow bg-[#F8F6F2] rounded-full px-4 py-2.5 text-xs text-charcoal uppercase tracking-wider font-mono outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                  />
                  <button
                    type="submit"
                    className="bg-charcoal hover:bg-terracotta text-white text-xs uppercase tracking-widest font-sans font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              <div className="bg-beige/25 rounded-xl p-3 text-[10px] text-charcoal/60 leading-relaxed font-sans space-y-1">
                <p>💡 Live Demo Coupons:</p>
                <p>· <strong className="font-mono text-charcoal">NEST20</strong> — Get 20% Off entire order</p>
                <p>· <strong className="font-mono text-charcoal">AURA15</strong> — Get 15% Off entire order</p>
              </div>
            </div>

            {/* 2. Pincode Transit Estimator */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DCCB]/40 shadow-sm space-y-4">
              <h3 className="font-serif text-sm font-bold text-charcoal uppercase tracking-wider">Transit Estimates</h3>
              <form onSubmit={handlePincodeCheck} className="flex gap-2" id="pincode-estimator-form">
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="Enter 6-digit PIN"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-grow bg-[#F8F6F2] rounded-full px-4 py-2.5 text-xs text-charcoal font-mono outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                />
                <button
                  type="submit"
                  className="bg-charcoal hover:bg-terracotta text-white text-xs uppercase tracking-widest font-sans font-semibold px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {shippingEstimate && (
                <p className="text-[11px] text-charcoal/70 bg-beige/35 border border-[#E8DCCB]/30 rounded-xl p-2.5 font-sans leading-relaxed animate-fade-in-up">
                  {shippingEstimate}
                </p>
              )}
            </div>

            {/* 3. Detailed order summary box */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DCCB]/40 shadow-sm space-y-4">
              <h3 className="font-serif text-sm font-bold text-charcoal uppercase tracking-wider">Order Summary</h3>
              
              <div className="space-y-3.5 text-xs font-sans text-charcoal/70">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-medium text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#C97C5D] font-medium">
                    <span>Promo Code ({promoCode})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span className="text-sage font-medium uppercase text-[10px] tracking-wider bg-sage/10 px-2 py-0.5 rounded-md">Complimentary</span>
                </div>

                <div className="border-t border-[#E8DCCB]/30 pt-4 flex justify-between text-base font-bold text-charcoal">
                  <span>Total Amount</span>
                  <span className="text-terracotta">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action trigger */}
              <button
                onClick={onCheckout}
                className="w-full bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-bold py-4 rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                id="cart-checkout-cta"
              >
                Secure Checkout
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-charcoal/40 uppercase tracking-widest font-mono">
                <Sparkles size={11} className="text-terracotta" />
                <span>GST Tax Included</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
