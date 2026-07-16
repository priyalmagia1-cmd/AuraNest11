import { useState, FormEvent } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Heart } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
  onSubscribeNotification: (email: string) => void;
}

export function Footer({ onNavigate, onSubscribeNotification }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onSubscribeNotification(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-charcoal text-ivory border-t border-charcoal/80 pt-16 pb-8 font-sans" id="auranest-footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Pitch (span 4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-1">
              <span 
                onClick={() => onNavigate('home')}
                className="font-serif text-2xl font-bold tracking-tight text-white hover:text-terracotta transition-colors cursor-pointer"
              >
                AuraNest
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2" />
            </div>
            <p className="text-xs text-white/70 font-sans leading-relaxed max-w-sm">
              We curate styled, high-comfort home accessories that blend modern minimalism with organic warmth. Every piece is crafted to turn your house into an intentional, peaceful sanctuary.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="p-2 bg-white/5 hover:bg-white/10 rounded-full hover:text-terracotta transition-colors text-white/80" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#facebook" className="p-2 bg-white/5 hover:bg-white/10 rounded-full hover:text-terracotta transition-colors text-white/80" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#pinterest" className="p-2 bg-white/5 hover:bg-white/10 rounded-full hover:text-terracotta transition-colors text-white/80" aria-label="Pinterest">
                <span className="font-bold text-xs">P</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">Navigate</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home Studio</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">Shop Catalogue</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-us')} className="hover:text-white transition-colors">About Our Brand</button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Interior Journal</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy & Support (span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">Service & Support</h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors">FAQs & Shipping</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact-us')} className="hover:text-white transition-colors">Contact Styling team</button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box (span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">Join The Nest</h4>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Subscribe to receive interior styling advice, private collection previews, and ₹500 off your first styling order.
            </p>

            {subscribed ? (
              <div className="bg-sage/10 text-[#B8C9B1] border border-sage/20 rounded-xl p-3 text-center text-xs animate-fade-in-up">
                ✓ You have joined our list! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative mt-2" id="footer-newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 rounded-full pl-4 pr-10 py-3 text-xs text-white placeholder-white/40 border border-white/10 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 p-2 bg-terracotta hover:bg-[#b0674c] text-white rounded-full transition-colors focus:outline-none"
                  aria-label="Submit email newsletter"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom row: copyright and design tag */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 AuraNest Interiors Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-1 font-serif text-white/30">
            <span>Crafted with</span>
            <Heart size={10} fill="currentColor" className="text-terracotta" />
            <span>for warm, intentional spaces in India.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
