import { useState, FormEvent } from 'react';
import { ShieldCheck, ArrowRight, CreditCard, CheckCircle2, ShoppingBag, Truck, Calendar } from 'lucide-react';
import { CartItem } from '../types';
import { AuraSVG } from './AuraArt';

interface CheckoutViewProps {
  cartItems: CartItem[];
  promoDiscount: number;
  promoCode: string;
  onClearCart: () => void;
  onNavigateHome: () => void;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

type CheckoutStep = 'address' | 'payment' | 'review' | 'success';

export function CheckoutView({
  cartItems,
  promoDiscount,
  promoCode,
  onClearCart,
  onNavigateHome,
  onSuccessToast,
  onErrorToast
}: CheckoutViewProps) {
  const [step, setStep] = useState<CheckoutStep>('address');

  // Address Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiHandle, setUpiHandle] = useState('');

  // Generated Order state
  const [orderId, setOrderId] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (promoDiscount / 100));
  const finalTotal = subtotal - discountAmount;

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && phone.trim() && address.trim() && city.trim() && pincode.trim().length === 6) {
      setStep('payment');
      onSuccessToast('Shipping address validated successfully.');
    } else {
      onErrorToast('Please fill out all address fields correctly.');
    }
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      if (cardNo.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3) {
        onErrorToast('Please enter complete mock card details (16 digit number, MM/YY, 3-digit CVV).');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiHandle.includes('@')) {
        onErrorToast('Please enter a valid mock UPI ID (e.g., name@okaxis).');
        return;
      }
    }
    setStep('review');
    onSuccessToast('Payment details logged. Please review your order.');
  };

  const handlePlaceOrder = () => {
    // Generate order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const genId = `AN-2026-${randomNum}`;
    setOrderId(genId);
    setStep('success');
    onSuccessToast(`Order ${genId} has been placed successfully!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 font-sans text-left" id="checkout-view-container">
      
      {/* STEPPER HEADERS (Only show if not success step) */}
      {step !== 'success' && (
        <div className="flex items-center justify-between max-w-lg mx-auto mb-10 border-b border-[#E8DCCB]/40 pb-6 text-center text-xs sm:text-sm font-semibold text-charcoal/40">
          <button
            onClick={() => step !== 'address' && setStep('address')}
            className={`flex items-center gap-1.5 focus:outline-none ${step === 'address' ? 'text-terracotta' : 'text-charcoal/80'}`}
          >
            <span className="w-5 h-5 rounded-full bg-beige/50 text-charcoal flex items-center justify-center text-[10px] font-mono">1</span>
            Shipping
          </button>
          <div className="flex-grow h-[1px] bg-[#E8DCCB] mx-4" />
          <button
            onClick={() => step === 'review' && setStep('payment')}
            className={`flex items-center gap-1.5 focus:outline-none ${step === 'payment' ? 'text-terracotta' : step === 'review' ? 'text-charcoal/80' : ''}`}
            disabled={step === 'address'}
          >
            <span className="w-5 h-5 rounded-full bg-beige/50 text-charcoal flex items-center justify-center text-[10px] font-mono">2</span>
            Payment
          </button>
          <div className="flex-grow h-[1px] bg-[#E8DCCB] mx-4" />
          <span className={`flex items-center gap-1.5 ${step === 'review' ? 'text-terracotta' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-beige/50 text-charcoal flex items-center justify-center text-[10px] font-mono">3</span>
            Review
          </span>
        </div>
      )}

      {/* VIEW CONDITIONAL SPLITS */}
      {step !== 'success' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTAINER: Steps Form (span 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E8DCCB]/40 shadow-sm">
            
            {/* STEP 1: ADDRESS */}
            {step === 'address' && (
              <form onSubmit={handleAddressSubmit} className="space-y-4" id="shipping-address-form">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-4">Shipping Information</h2>
                
                <div className="space-y-1.5">
                  <label htmlFor="ship-name" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Recipient Name</label>
                  <input
                    id="ship-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priyal Magia"
                    className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="ship-email" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Email Address</label>
                    <input
                      id="ship-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priyalmagia1@gmail.com"
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ship-phone" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Mobile Number</label>
                    <input
                      id="ship-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ship-address" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Delivery Flat / House / Street Address</label>
                  <input
                    id="ship-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Penthouse 4B, Whispering Palms, Lavelle Road"
                    className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="ship-city" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">City</label>
                    <input
                      id="ship-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ship-state" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">State</label>
                    <select
                      id="ship-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#F8F6F2] rounded-xl px-3 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1 cursor-pointer"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ship-pin" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">6-Digit PIN</label>
                    <input
                      id="ship-pin"
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="560001"
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-1.5 pt-4 cursor-pointer"
                  id="checkout-step1-btn"
                >
                  Continue to Payment
                  <ArrowRight size={13} />
                </button>
              </form>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6" id="payment-details-form">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-4">Select Payment Coordinate</h2>
                
                {/* Method selector cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'card', label: 'Credit Card', sub: 'Visa/MC' },
                    { id: 'upi', label: 'BHIM UPI', sub: 'Instant App' },
                    { id: 'netbanking', label: 'Net Banking', sub: 'Top Banks' },
                    { id: 'cod', label: 'COD (Cash)', sub: 'Pay at Door' }
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`cursor-pointer rounded-xl p-3 border text-center transition-all ${
                        paymentMethod === m.id
                          ? 'bg-beige/40 border-terracotta shadow-sm'
                          : 'bg-white border-charcoal/10 hover:border-charcoal/20'
                      }`}
                      id={`pay-method-${m.id}`}
                    >
                      <p className="text-xs font-semibold text-charcoal">{m.label}</p>
                      <p className="text-[9px] text-charcoal/40 font-mono font-medium mt-0.5">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Sub-form fields */}
                <div className="bg-ivory/50 rounded-2xl p-5 border border-[#E8DCCB]/40 space-y-4">
                  {paymentMethod === 'card' && (
                    <div className="space-y-3.5">
                      <div className="space-y-1.5">
                        <label htmlFor="card-num" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Card Number</label>
                        <div className="relative">
                          <input
                            id="card-num"
                            type="text"
                            maxLength={16}
                            required
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value.replace(/\D/g, ''))}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta"
                          />
                          <CreditCard size={14} className="absolute left-3.5 top-3.5 text-charcoal/40" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="card-exp" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Expiry (MM/YY)</label>
                          <input
                            id="card-exp"
                            type="text"
                            maxLength={5}
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta text-center font-mono"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="card-cvv" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">CVV Code</label>
                          <input
                            id="card-cvv"
                            type="password"
                            maxLength={3}
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            placeholder="***"
                            className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta text-center font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-1.5">
                      <label htmlFor="upi-id" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">UPI Address / ID</label>
                      <input
                        id="upi-id"
                        type="text"
                        required
                        value={upiHandle}
                        onChange={(e) => setUpiHandle(e.target.value)}
                        placeholder="priyal@okaxis"
                        className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta font-mono"
                      />
                      <p className="text-[9px] text-charcoal/50 font-sans italic">Enter any mock handle with @ to verify instantly.</p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2">
                      <p className="text-xs text-charcoal">Choose Bank Account:</p>
                      <select className="w-full bg-white rounded-xl px-3 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta cursor-pointer">
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-xs text-charcoal/70 leading-relaxed font-sans flex items-center gap-2.5 p-1">
                      <CheckCircle2 size={16} className="text-sage shrink-0" />
                      <span>Cash on Delivery is enabled for this pincode. Pay with cash or scan dynamic QR at door.</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="w-1/3 bg-[#F8F6F2] hover:bg-beige text-charcoal text-xs uppercase tracking-wider font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold py-3.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                    id="checkout-step2-btn"
                  >
                    Review Styling Order
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: REVIEW */}
            {step === 'review' && (
              <div className="space-y-6" id="review-order-stage">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-4">Review Your Styling Order</h2>
                
                {/* Summary briefs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-charcoal/80">
                  <div className="bg-beige/35 p-4 rounded-xl border border-[#E8DCCB]/40 space-y-1">
                    <p className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Shipping Destination</p>
                    <p className="font-medium text-charcoal mt-1">{name}</p>
                    <p className="text-charcoal/60 leading-relaxed">{address}, {city}, {state} - {pincode}</p>
                    <p className="text-charcoal/60 mt-1">Phone: {phone}</p>
                  </div>

                  <div className="bg-beige/35 p-4 rounded-xl border border-[#E8DCCB]/40 space-y-1">
                    <p className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Payment Selected</p>
                    <p className="font-semibold text-charcoal mt-2 uppercase tracking-wide">
                      {paymentMethod === 'card' 
                        ? `Credit Card (ending ${cardNo.slice(-4) || '1111'})` 
                        : paymentMethod === 'upi' 
                          ? `UPI ID (${upiHandle})` 
                          : paymentMethod === 'netbanking' 
                            ? 'Net Banking' 
                            : 'Cash on Delivery (COD)'
                      }
                    </p>
                    <p className="text-charcoal/50 text-[10px] leading-relaxed mt-2">Verified secure mock payment coordinate</p>
                  </div>
                </div>

                {/* Secure pledge */}
                <div className="bg-sage/10 text-charcoal border border-sage/20 rounded-xl p-3 flex items-center gap-3 text-xs leading-relaxed font-sans">
                  <ShieldCheck size={18} className="text-sage shrink-0" />
                  <span>AuraNest guarantees safe transit. If any glass mirror, clay pottery base, or clock suffers damage in transport, we replace it immediately at zero cost.</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep('payment')}
                    className="w-1/3 bg-[#F8F6F2] hover:bg-beige text-charcoal text-xs uppercase tracking-wider font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-bold py-3.5 rounded-xl transition-colors shadow-lg cursor-pointer"
                    id="place-order-final-btn"
                  >
                    Place Styling Order (₹{finalTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT CONTAINER: Summary sidebar (span 5) */}
          <div className="lg:col-span-5 bg-beige/25 rounded-2xl p-6 border border-[#E8DCCB]/40 space-y-5">
            <h3 className="font-serif text-sm font-bold text-charcoal uppercase tracking-wider pb-2.5 border-b border-[#E8DCCB]/40">Coordinates Summary</h3>
            
            <div className="max-h-60 overflow-y-auto space-y-3.5 divide-y divide-[#E8DCCB]/25 pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className={`flex gap-3 pt-3 first:pt-0 items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 border border-[#E8DCCB]/30">
                      <AuraSVG type={item.product.imageType} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-charcoal line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-charcoal/50 font-sans mt-0.5">Qty {item.quantity} · {item.selectedFinish}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold font-mono text-charcoal">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8DCCB]/40 pt-4 space-y-3.5 text-xs font-sans text-charcoal/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#C97C5D] font-medium">
                  <span>Promo Discount ({promoCode})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Complimentary Delivery</span>
                <span className="text-sage uppercase text-[10px] tracking-wider font-semibold">Free</span>
              </div>

              <div className="border-t border-[#E8DCCB]/40 pt-4 flex justify-between text-base font-bold text-charcoal">
                <span>Final Total</span>
                <span className="text-terracotta">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* STEP 4: SUCCESS CONFIRMATION PANEL */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 text-center border border-[#E8DCCB]/40 shadow-xl space-y-8 animate-fade-in-up" id="order-success-screen">
          {/* Decorative icons */}
          <div className="flex justify-center gap-3 items-center">
            <div className="w-16 h-16 rounded-full bg-sage/20 text-charcoal flex items-center justify-center">
              <CheckCircle2 size={28} className="text-charcoal" />
            </div>
          </div>

          <div className="space-y-3 text-center">
            <span className="text-[10px] text-sage uppercase tracking-widest font-mono font-bold bg-sage/10 px-3 py-1.5 rounded-full">Order Placed Insured</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">Thank You For Choosing AuraNest</h1>
            <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed font-sans max-w-md mx-auto">
              Your home styling coordinates have been logged! We have dispatched design confirmations and tracking information.
            </p>
          </div>

          {/* Core metadata table */}
          <div className="bg-ivory/50 rounded-2xl p-5 border border-[#E8DCCB]/40 text-xs sm:text-sm font-sans text-charcoal/80 space-y-3 max-w-md mx-auto">
            <div className="flex justify-between pb-2.5 border-b border-charcoal/5">
              <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-[10px]">Order Styling ID</span>
              <strong className="text-charcoal font-mono tracking-wide">{orderId}</strong>
            </div>

            <div className="flex justify-between pb-2.5 border-b border-charcoal/5 items-center">
              <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Truck size={12} className="text-terracotta" />
                Transit Status
              </span>
              <span className="text-sage font-semibold uppercase text-[10px] tracking-wider bg-sage/20 px-2 py-0.5 rounded-md">Insured Packing</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-charcoal/40 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Calendar size={12} className="text-terracotta" />
                Timeline Estimate
              </span>
              <span className="font-semibold text-charcoal text-xs">Within 3 business days</span>
            </div>
          </div>

          {/* Delivery Note */}
          <p className="text-[11px] text-charcoal/50 leading-relaxed font-sans italic max-w-sm mx-auto">
            “No physical payment is debited on this mock build. Our team will proceed to packet wrap your items securely.”
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                onClearCart();
                onNavigateHome();
              }}
              className="bg-charcoal hover:bg-terracotta text-white text-xs uppercase tracking-widest font-sans font-bold py-4 px-10 rounded-full shadow-lg transition-colors cursor-pointer"
              id="continue-home-btn"
            >
              Continue Styling Home
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
