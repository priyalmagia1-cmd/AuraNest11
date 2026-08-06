import { useState, FormEvent, useEffect } from 'react';
import { ShieldCheck, ArrowRight, CreditCard, CheckCircle2, Lock, Smartphone, Building2, Banknote, Download, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { AuraSVG } from './AuraArt';
import { OrderStatusTracker } from './OrderStatusTracker';

interface CheckoutViewProps {
  cartItems: CartItem[];
  promoDiscount: number;
  promoCode: string;
  onClearCart: () => void;
  onNavigateHome: () => void;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

type CheckoutStep = 'address' | 'payment' | 'review' | 'processing' | 'success';

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
  const [name, setName] = useState('Priyal Magia');
  const [email, setEmail] = useState('priyalmagia1@gmail.com');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Penthouse 4B, Whispering Palms, Lavelle Road');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560001');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  
  // Card details
  const [cardName, setCardName] = useState('Priyal Magia');
  const [cardNo, setCardNo] = useState('4111222233334444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // UPI details
  const [upiHandle, setUpiHandle] = useState('priyal@okaxis');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'custom'>('gpay');

  // Netbanking details
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Gateway Simulation State
  const [processingStage, setProcessingStage] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (promoDiscount / 100));
  const finalTotal = subtotal - discountAmount;

  // Auto-detect Card Type based on first digit
  const getCardType = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'Mastercard';
    if (clean.startsWith('6')) return 'RuPay';
    if (clean.startsWith('3')) return 'Amex';
    return 'Card';
  };

  // Format Card Number into 4-digit blocks
  const formatCardNumber = (num: string) => {
    const clean = num.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(.{4})/g, '$1 ').trim() || '•••• •••• •••• ••••';
  };

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && phone.trim() && address.trim() && city.trim() && pincode.trim().length === 6) {
      setStep('payment');
      onSuccessToast('Shipping address validated successfully.');
    } else {
      onErrorToast('Please fill out all required address fields correctly.');
    }
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      const cleanNo = cardNo.replace(/\D/g, '');
      if (cleanNo.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3) {
        onErrorToast('Please enter valid 16-digit card number, MM/YY expiry, and 3-digit CVV.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiHandle.includes('@')) {
        onErrorToast('Please enter a valid UPI ID (e.g., username@okaxis).');
        return;
      }
    }
    setStep('review');
    onSuccessToast('Payment method authorized. Please review your styling order.');
  };

  const handlePlaceOrder = () => {
    // Generate order ID & Gateway Ref
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const genId = `AN-2026-${randomNum}`;
    const txRef = `PAY_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    setOrderId(genId);
    setTransactionRef(txRef);
    setStep('processing');
    setProcessingStage(1);

    // Simulate multi-step 256-bit SSL payment gateway processing
    setTimeout(() => {
      setProcessingStage(2); // SSL verification
    }, 1000);

    setTimeout(() => {
      setProcessingStage(3); // Bank authorization
    }, 2200);

    setTimeout(() => {
      setProcessingStage(4); // Approved
    }, 3200);

    setTimeout(() => {
      setStep('success');
      onSuccessToast(`Payment Authorized! Order ${genId} placed successfully.`);
    }, 4000);
  };

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', handleSuffix: '@okaxis', icon: 'GPay' },
    { id: 'phonepe', name: 'PhonePe', handleSuffix: '@ybl', icon: 'PhonePe' },
    { id: 'paytm', name: 'Paytm', handleSuffix: '@paytm', icon: 'Paytm' },
    { id: 'bhim', name: 'BHIM UPI', handleSuffix: '@upi', icon: 'BHIM' },
  ];

  const popularBanks = [
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'Axis Bank', code: 'AXIS' },
    { name: 'Kotak Mahindra', code: 'KOTAK' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 font-sans text-left" id="checkout-view-container">
      
      {/* STEPPER HEADERS (Hide on Processing & Success) */}
      {step !== 'success' && step !== 'processing' && (
        <div className="flex items-center justify-between max-w-lg mx-auto mb-10 border-b border-[#E8DCCB]/40 pb-6 text-center text-xs sm:text-sm font-semibold text-charcoal/40">
          <button
            onClick={() => step !== 'address' && setStep('address')}
            className={`flex items-center gap-1.5 focus:outline-none cursor-pointer ${step === 'address' ? 'text-terracotta font-bold' : 'text-charcoal/80'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${step === 'address' ? 'bg-terracotta text-white' : 'bg-beige/50 text-charcoal'}`}>1</span>
            Shipping
          </button>
          <div className="flex-grow h-[1px] bg-[#E8DCCB] mx-3" />
          <button
            onClick={() => step === 'review' && setStep('payment')}
            className={`flex items-center gap-1.5 focus:outline-none cursor-pointer ${step === 'payment' ? 'text-terracotta font-bold' : step === 'review' ? 'text-charcoal/80' : ''}`}
            disabled={step === 'address'}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${step === 'payment' ? 'bg-terracotta text-white' : 'bg-beige/50 text-charcoal'}`}>2</span>
            Payment Gateway
          </button>
          <div className="flex-grow h-[1px] bg-[#E8DCCB] mx-3" />
          <span className={`flex items-center gap-1.5 ${step === 'review' ? 'text-terracotta font-bold' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${step === 'review' ? 'bg-terracotta text-white' : 'bg-beige/50 text-charcoal'}`}>3</span>
            Review
          </span>
        </div>
      )}

      {/* VIEW CONDITIONAL SPLITS */}
      {step === 'processing' ? (
        /* GATEWAY PROCESSING SCREEN */
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border border-charcoal/10 shadow-2xl space-y-6 my-12" id="gateway-processing-modal">
          <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto relative">
            <RefreshCw size={28} className="animate-spin text-terracotta" />
            <div className="absolute inset-0 rounded-full border-2 border-terracotta/30 animate-ping" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
              256-bit SSL Encrypted
            </span>
            <h2 className="font-serif text-2xl font-bold text-charcoal">Processing Payment</h2>
            <p className="text-xs text-charcoal/60 font-sans">
              Communicating with AuraNest Secure Gateway. Please do not close or refresh this window.
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="bg-beige/30 p-4 rounded-2xl border border-[#E8DCCB]/60 text-xs text-left space-y-3 font-sans">
            <div className={`flex items-center gap-2.5 transition-colors ${processingStage >= 1 ? 'text-charcoal font-semibold' : 'text-charcoal/30'}`}>
              <CheckCircle2 size={15} className={processingStage >= 1 ? 'text-sage' : 'text-charcoal/20'} />
              <span>1. Validating styling coordinates & items</span>
            </div>
            <div className={`flex items-center gap-2.5 transition-colors ${processingStage >= 2 ? 'text-charcoal font-semibold' : 'text-charcoal/30'}`}>
              <CheckCircle2 size={15} className={processingStage >= 2 ? 'text-sage' : 'text-charcoal/20'} />
              <span>2. Establishing secure bank handshake</span>
            </div>
            <div className={`flex items-center gap-2.5 transition-colors ${processingStage >= 3 ? 'text-charcoal font-semibold' : 'text-charcoal/30'}`}>
              <CheckCircle2 size={15} className={processingStage >= 3 ? 'text-sage' : 'text-charcoal/20'} />
              <span>3. Authorizing ₹{finalTotal.toLocaleString('en-IN')} payment token</span>
            </div>
            <div className={`flex items-center gap-2.5 transition-colors ${processingStage >= 4 ? 'text-charcoal font-semibold' : 'text-charcoal/30'}`}>
              <CheckCircle2 size={15} className={processingStage >= 4 ? 'text-sage' : 'text-charcoal/20'} />
              <span>4. Transaction approved & logged</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-charcoal/40 flex items-center justify-center gap-1.5">
            <Lock size={12} />
            <span>Ref: {transactionRef || 'PAY_PROCESSING...'}</span>
          </div>
        </div>
      ) : step !== 'success' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTAINER: Steps Form (span 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-[#E8DCCB]/50 shadow-sm">
            
            {/* STEP 1: ADDRESS */}
            {step === 'address' && (
              <form onSubmit={handleAddressSubmit} className="space-y-4" id="shipping-address-form">
                <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
                  <h2 className="font-serif text-xl font-bold text-charcoal">Shipping & Delivery Details</h2>
                  <span className="text-[10px] font-mono text-sage font-bold bg-sage/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Free Pan-India Delivery
                  </span>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="ship-name" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Recipient Name</label>
                  <input
                    id="ship-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priyal Magia"
                    className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1"
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
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1"
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
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1"
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
                    className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1"
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
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ship-state" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">State</label>
                    <select
                      id="ship-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#F8F6F2] rounded-xl px-3 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1 cursor-pointer"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ship-pin" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">6-Digit PIN Code</label>
                    <input
                      id="ship-pin"
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="560001"
                      className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta focus:ring-1 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-md"
                  id="checkout-step1-btn"
                >
                  <span>Proceed to Payment Gateway</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            {/* STEP 2: PAYMENT GATEWAY */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6" id="payment-details-form">
                <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-terracotta" />
                    <h2 className="font-serif text-xl font-bold text-charcoal">AuraNest Payment Gateway</h2>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-charcoal/60 bg-ivory border border-charcoal/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck size={12} className="text-sage" />
                    256-bit Encryption
                  </span>
                </div>
                
                {/* Payment Gateway Method selector tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', sub: 'Visa, MC, RuPay', icon: CreditCard },
                    { id: 'upi', label: 'BHIM UPI', sub: 'GPay, PhonePe', icon: Smartphone },
                    { id: 'netbanking', label: 'Net Banking', sub: 'Top 50+ Banks', icon: Building2 },
                    { id: 'cod', label: 'Pay on Delivery', sub: 'Cash / Scan QR', icon: Banknote }
                  ].map((m) => {
                    const IconComp = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`cursor-pointer rounded-2xl p-3 border text-left transition-all ${
                          isSelected
                            ? 'bg-terracotta/10 border-terracotta ring-1 ring-terracotta shadow-xs'
                            : 'bg-white border-charcoal/15 hover:border-charcoal/30'
                        }`}
                        id={`pay-method-${m.id}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <IconComp size={16} className={isSelected ? 'text-terracotta' : 'text-charcoal/60'} />
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-terracotta bg-terracotta' : 'border-charcoal/30'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-terracotta' : 'text-charcoal'}`}>{m.label}</p>
                        <p className="text-[9px] text-charcoal/50 font-mono mt-0.5">{m.sub}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Method Specific Fields */}
                <div className="bg-ivory/60 rounded-2xl p-5 border border-[#E8DCCB]/60 space-y-5">
                  
                  {/* OPTION 1: CREDIT / DEBIT CARD WITH LIVE CARD VISUALIZER */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-5">
                      
                      {/* Live Realistic Digital Card */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#1E1C1A] via-[#2B2825] to-[#3B3733] text-white p-5 shadow-xl border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-terracotta" />
                            <span className="font-serif italic font-bold text-sm tracking-wide text-white">AuraNest Privilege Card</span>
                          </div>
                          <span className="font-mono font-bold text-xs uppercase text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                            {getCardType(cardNo)}
                          </span>
                        </div>

                        <div className="pt-2 font-mono text-lg tracking-widest text-white/90">
                          {formatCardNumber(cardNo)}
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-white/10">
                          <div>
                            <p className="text-[9px] uppercase font-mono tracking-wider text-white/50">Cardholder Name</p>
                            <p className="text-xs font-bold font-mono tracking-wider text-white uppercase truncate max-w-[180px]">
                              {cardName.trim() || 'YOUR NAME'}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <p className="text-[9px] uppercase font-mono tracking-wider text-white/50">Expires</p>
                              <p className="text-xs font-bold font-mono text-white">{cardExpiry || 'MM/YY'}</p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase font-mono tracking-wider text-white/50">CVV</p>
                              <p className="text-xs font-bold font-mono text-amber-300">{cardCvv ? '•••' : '***'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label htmlFor="card-name" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Cardholder Name</label>
                          <input
                            id="card-name"
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Priyal Magia"
                            className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="card-num" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">16-Digit Card Number</label>
                          <div className="relative">
                            <input
                              id="card-num"
                              type="text"
                              maxLength={19}
                              required
                              value={cardNo}
                              onChange={(e) => setCardNo(e.target.value.replace(/\D/g, ''))}
                              placeholder="4111 2222 3333 4444"
                              className="w-full bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta font-mono"
                            />
                            <CreditCard size={15} className="absolute left-3.5 top-3.5 text-charcoal/40" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="card-exp" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">Expiry Date (MM/YY)</label>
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
                          <div className="space-y-1">
                            <label htmlFor="card-cvv" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">3-Digit CVV Security</label>
                            <input
                              id="card-cvv"
                              type="password"
                              maxLength={3}
                              required
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder="888"
                              className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta text-center font-mono"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* OPTION 2: BHIM UPI WITH QUICK APP SELECTORS */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">
                        Select Instant UPI App
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {upiApps.map((app) => (
                          <button
                            type="button"
                            key={app.id}
                            onClick={() => {
                              setSelectedUpiApp(app.id as any);
                              setUpiHandle(`priyal${app.handleSuffix}`);
                            }}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              selectedUpiApp === app.id
                                ? 'bg-terracotta text-white border-terracotta font-bold'
                                : 'bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30'
                            }`}
                          >
                            <p className="text-xs font-sans">{app.name}</p>
                            <p className={`text-[9px] font-mono mt-0.5 ${selectedUpiApp === app.id ? 'text-white/80' : 'text-charcoal/40'}`}>
                              {app.handleSuffix}
                            </p>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1 pt-2">
                        <label htmlFor="upi-id" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">
                          Virtual Payment Address (VPA / UPI ID)
                        </label>
                        <input
                          id="upi-id"
                          type="text"
                          required
                          value={upiHandle}
                          onChange={(e) => setUpiHandle(e.target.value)}
                          placeholder="username@okaxis"
                          className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta font-mono"
                        />
                        <p className="text-[10px] text-charcoal/60 font-sans italic pt-0.5">
                          A payment collect request will be sent to your UPI app instantly.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* OPTION 3: NET BANKING */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">
                        Popular Partner Banks
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {popularBanks.map((b) => (
                          <button
                            type="button"
                            key={b.code}
                            onClick={() => setSelectedBank(b.name)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              selectedBank === b.name
                                ? 'bg-terracotta/15 text-terracotta border-terracotta font-bold'
                                : 'bg-white text-charcoal border-charcoal/10 hover:border-charcoal/30'
                            }`}
                          >
                            <p className="text-xs font-bold">{b.name}</p>
                            <p className="text-[9px] font-mono text-charcoal/40 uppercase">{b.code}</p>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1 pt-2">
                        <label htmlFor="select-other-bank" className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider">
                          Or Select Other Bank
                        </label>
                        <select
                          id="select-other-bank"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full bg-white rounded-xl px-3 py-2.5 text-xs text-charcoal outline-none border border-charcoal/10 focus:border-terracotta cursor-pointer"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                          <option value="Bank of Baroda">Bank of Baroda</option>
                          <option value="Punjab National Bank">Punjab National Bank</option>
                          <option value="YES Bank">YES Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* OPTION 4: PAY ON DELIVERY */}
                  {paymentMethod === 'cod' && (
                    <div className="space-y-3 p-1">
                      <div className="flex items-start gap-3 bg-sage/10 border border-sage/20 p-3.5 rounded-2xl text-xs text-charcoal/80 leading-relaxed font-sans">
                        <CheckCircle2 size={18} className="text-sage shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-charcoal">Cash & Digital Payment on Delivery Available</p>
                          <p className="text-[11px] text-charcoal/70 mt-0.5">
                            Pay via Cash, UPI QR code scan, or credit card machine when our white-glove courier delivers your decor crate.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="w-1/3 bg-[#F8F6F2] hover:bg-beige text-charcoal text-xs uppercase tracking-wider font-semibold py-3.5 rounded-2xl transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-bold py-3.5 rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    id="checkout-step2-btn"
                  >
                    <span>Review Order (₹{finalTotal.toLocaleString('en-IN')})</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: REVIEW & AUTHORIZE */}
            {step === 'review' && (
              <div className="space-y-6" id="review-order-stage">
                <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
                  <h2 className="font-serif text-xl font-bold text-charcoal">Review & Authorize Order</h2>
                  <span className="text-[10px] font-mono text-terracotta font-bold uppercase tracking-wider">
                    Step 3 of 3
                  </span>
                </div>
                
                {/* Summary briefs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-charcoal/80">
                  <div className="bg-beige/35 p-4 rounded-2xl border border-[#E8DCCB]/60 space-y-1">
                    <p className="font-bold text-charcoal uppercase tracking-wider text-[10px] text-terracotta">Shipping Destination</p>
                    <p className="font-bold text-charcoal text-sm mt-1">{name}</p>
                    <p className="text-charcoal/70 leading-relaxed text-xs">{address}, {city}, {state} - {pincode}</p>
                    <p className="text-charcoal/60 mt-1 font-mono text-[11px]">Phone: {phone}</p>
                  </div>

                  <div className="bg-beige/35 p-4 rounded-2xl border border-[#E8DCCB]/60 space-y-1">
                    <p className="font-bold text-charcoal uppercase tracking-wider text-[10px] text-terracotta">Payment Method</p>
                    <p className="font-bold text-charcoal text-sm mt-1 uppercase">
                      {paymentMethod === 'card' 
                        ? `Card (ending ${cardNo.slice(-4) || '4444'})` 
                        : paymentMethod === 'upi' 
                          ? `UPI VPA (${upiHandle})` 
                          : paymentMethod === 'netbanking' 
                            ? `Netbanking (${selectedBank})` 
                            : 'Pay on Delivery (COD / QR)'
                      }
                    </p>
                    <p className="text-charcoal/60 text-[11px] leading-relaxed mt-1 font-sans">
                      Authorized via 256-bit SSL encrypted channel
                    </p>
                  </div>
                </div>

                {/* Secure pledge */}
                <div className="bg-sage/10 text-charcoal border border-sage/20 rounded-2xl p-4 flex items-center gap-3 text-xs leading-relaxed font-sans">
                  <ShieldCheck size={20} className="text-sage shrink-0" />
                  <div>
                    <p className="font-bold text-charcoal">Damage-Free Delivery Guarantee</p>
                    <p className="text-[11px] text-charcoal/70">
                      If any ceramic vase, mirror glass, or wood frame suffers transit damage, we issue instant replacements or full refunds within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep('payment')}
                    className="w-1/3 bg-[#F8F6F2] hover:bg-beige text-charcoal text-xs uppercase tracking-wider font-semibold py-4 rounded-2xl transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-bold py-4 rounded-2xl transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                    id="place-order-final-btn"
                  >
                    <Lock size={15} />
                    <span>Authorize Payment (₹{finalTotal.toLocaleString('en-IN')})</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT CONTAINER: Summary sidebar (span 5) */}
          <div className="lg:col-span-5 bg-beige/25 rounded-2xl p-6 border border-[#E8DCCB]/50 space-y-5">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E8DCCB]/50">
              <h3 className="font-serif text-sm font-bold text-charcoal uppercase tracking-wider">Styling Basket ({cartItems.length})</h3>
              <span className="text-[10px] font-mono text-terracotta font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-3.5 divide-y divide-[#E8DCCB]/25 pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className={`flex gap-3 pt-3 first:pt-0 items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl p-1 flex items-center justify-center shrink-0 border border-[#E8DCCB]/40 shadow-2xs">
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

            <div className="border-t border-[#E8DCCB]/50 pt-4 space-y-3 text-xs font-sans text-charcoal/70">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-charcoal font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-terracotta font-medium">
                  <span>Promo Voucher ({promoCode})</span>
                  <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Pan-India Transit</span>
                <span className="text-sage uppercase text-[10px] tracking-wider font-bold">Free</span>
              </div>

              <div className="border-t border-[#E8DCCB]/50 pt-4 flex justify-between text-base font-bold text-charcoal">
                <span>Total Amount Due</span>
                <span className="text-terracotta font-mono text-lg">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* STEP 4: SUCCESS CONFIRMATION & INVOICE RECEIPT */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 text-center border border-[#E8DCCB]/50 shadow-2xl space-y-8 animate-fade-in-up" id="order-success-screen">
          
          <div className="w-16 h-16 rounded-full bg-sage/20 text-sage flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={32} className="text-sage" />
          </div>

          <div className="space-y-2 text-center">
            <span className="text-[10px] text-sage uppercase tracking-widest font-mono font-bold bg-sage/10 px-3 py-1 rounded-full">
              Payment Successful & Order Insured
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">Thank You For Choosing AuraNest</h1>
            <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed font-sans max-w-md mx-auto">
              Your payment has been authorized. A confirmation receipt and live tracking link have been dispatched to <strong className="text-charcoal">{email}</strong>.
            </p>
          </div>

          {/* Interactive Live Order Tracking Status Bar Component */}
          <OrderStatusTracker
            orderId={orderId}
            email={email}
            customerCity={city}
          />

          {/* Official Invoice Card */}
          <div className="bg-ivory/60 rounded-3xl p-6 border border-[#E8DCCB]/60 text-xs sm:text-sm font-sans text-charcoal/80 space-y-4 max-w-md mx-auto text-left shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
              <span className="text-charcoal/40 font-mono uppercase tracking-wider text-[10px] font-bold">Order Styling Invoice</span>
              <strong className="text-charcoal font-mono tracking-wide text-xs bg-white px-2.5 py-1 rounded-md border border-charcoal/10">{orderId}</strong>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Transaction Reference:</span>
                <span className="font-mono text-charcoal font-bold">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Amount Paid:</span>
                <span className="font-mono text-terracotta font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Payment Mode:</span>
                <span className="font-bold text-charcoal uppercase text-[11px]">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Delivery Address:</span>
                <span className="font-medium text-charcoal text-right max-w-[200px] truncate">{address}, {city}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-charcoal/10 flex items-center justify-between text-[11px] text-charcoal/60 font-sans">
              <div className="flex items-center gap-1 text-sage font-bold">
                <ShieldCheck size={14} />
                <span>Damage-Free Transit Crate</span>
              </div>
              <span>Delivery within 3 business days</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                window.print();
              }}
              className="w-full sm:w-auto bg-ivory hover:bg-beige text-charcoal text-xs uppercase tracking-wider font-sans font-bold py-3.5 px-6 rounded-full border border-charcoal/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="print-invoice-btn"
            >
              <Download size={14} />
              <span>Download Invoice</span>
            </button>

            <button
              onClick={() => {
                onClearCart();
                onNavigateHome();
              }}
              className="w-full sm:w-auto bg-charcoal hover:bg-terracotta text-white text-xs uppercase tracking-widest font-sans font-bold py-3.5 px-8 rounded-full shadow-lg transition-all cursor-pointer"
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

