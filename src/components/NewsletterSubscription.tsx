import { useState, FormEvent } from 'react';
import { Mail, ArrowRight, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterSubscriptionProps {
  onSubscribe: (email: string) => void;
  variant?: 'banner' | 'compact';
  idPrefix?: string;
}

export function NewsletterSubscription({ 
  onSubscribe, 
  variant = 'banner',
  idPrefix = 'newsletter' 
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (input: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(input.trim());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g., alex@example.com).');
      return;
    }

    setStatus('loading');

    // Simulate short network delay for smooth tactile feedback
    setTimeout(() => {
      setStatus('success');
      onSubscribe(email.trim());
      setEmail('');
    }, 600);
  };

  if (variant === 'compact') {
    return (
      <div className="space-y-3 font-sans" id={`${idPrefix}-compact-container`}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-sage/15 text-[#C3D9BD] border border-sage/30 rounded-2xl p-4 text-xs font-medium flex items-start gap-2.5"
            >
              <div className="w-5 h-5 rounded-full bg-sage/20 text-sage flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} />
              </div>
              <div>
                <p className="font-bold text-white text-xs">You're on the list!</p>
                <p className="text-white/70 text-[11px] mt-0.5 leading-relaxed">
                  Welcome to AuraNest. Check your inbox for your ₹500 welcome discount.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-[10px] uppercase font-mono tracking-wider text-terracotta underline hover:text-white transition-colors cursor-pointer"
                >
                  Subscribe another email
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2" id={`${idPrefix}-compact-form`}>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full bg-white/10 rounded-full pl-10 pr-12 py-3 text-xs text-white placeholder-white/40 border transition-all outline-none ${
                    status === 'error' 
                      ? 'border-terracotta focus:ring-1 focus:ring-terracotta' 
                      : 'border-white/15 focus:border-terracotta focus:ring-1 focus:ring-terracotta'
                  }`}
                  id={`${idPrefix}-compact-input`}
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-terracotta hover:bg-[#b0674c] active:scale-95 text-white rounded-full transition-all focus:outline-none cursor-pointer shadow-sm disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                  id={`${idPrefix}-compact-submit-btn`}
                >
                  {status === 'loading' ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={14} />
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-[11px] text-terracotta font-medium pl-3 animate-fade-in">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Banner variant (Full-width featured box inside the footer)
  return (
    <div 
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#242220] via-[#2D2A27] to-[#1E1C1A] border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl mb-12 font-sans"
      id={`${idPrefix}-banner-container`}
    >
      {/* Decorative background ambient glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Left Side: Copy and Perks */}
        <div className="max-w-xl space-y-3 text-left">
          <div className="inline-flex items-center gap-2 bg-terracotta/20 text-terracotta border border-terracotta/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Exclusive Interior Journal</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Join The AuraNest Circle & Enjoy <span className="text-terracotta italic font-serif">10% Off</span>
          </h3>

          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
            Subscribe for private collection drops, seasonal decor inspiration, and member-only styling guides delivered straight to your inbox.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-white/80">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-sage/20 text-sage flex items-center justify-center">
                <Check size={10} />
              </div>
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-sage/20 text-sage flex items-center justify-center">
                <Check size={10} />
              </div>
              <span>Instant ₹500 styling voucher</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-sage/20 text-sage flex items-center justify-center">
                <ShieldCheck size={10} />
              </div>
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form / Success Box */}
        <div className="w-full lg:w-auto lg:min-w-[380px]">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-sage/15 border border-sage/30 rounded-2xl p-6 text-center space-y-2 text-white"
              >
                <div className="w-10 h-10 rounded-full bg-sage/20 text-sage flex items-center justify-center mx-auto mb-1">
                  <Check size={20} />
                </div>
                <h4 className="font-serif text-lg font-bold">Welcome to AuraNest!</h4>
                <p className="text-xs text-white/75 leading-relaxed max-w-xs mx-auto">
                  Your email has been subscribed. Check your inbox shortly for your discount code and styling guide.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="pt-2 text-xs font-mono font-bold uppercase tracking-wider text-terracotta hover:underline cursor-pointer"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" id={`${idPrefix}-banner-form`}>
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your email address"
                      className={`w-full bg-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/40 border transition-all outline-none ${
                        status === 'error'
                          ? 'border-terracotta ring-1 ring-terracotta'
                          : 'border-white/20 focus:border-terracotta focus:ring-1 focus:ring-terracotta'
                      }`}
                      id={`${idPrefix}-banner-input`}
                      aria-label="Email address for newsletter banner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-terracotta hover:bg-[#b0674c] active:scale-98 text-white text-xs uppercase tracking-widest font-sans font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 shrink-0"
                    id={`${idPrefix}-banner-submit-btn`}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-terracotta font-medium pl-1 animate-fade-in text-left">
                    {errorMessage}
                  </p>
                )}

                <p className="text-[10px] text-white/40 text-left font-sans">
                  By subscribing, you agree to receive marketing emails from AuraNest. You may opt out at any time.
                </p>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
