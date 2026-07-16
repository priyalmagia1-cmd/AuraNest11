import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BLOGS } from '../data';
import { AuraSVG } from './AuraArt';
import { ActiveView } from '../types';

interface ContactFormProps {
  onSuccessToast: (msg: string) => void;
}

export function ContactUsView({ onSuccessToast }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      onSuccessToast(`Thank you, ${name}! Our styling team will get back to you shortly.`);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal mb-4">Contact Our Stylists</h1>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          Need advice on choosing the right mirror? Or have a question about delivery timelines? Write to us, and an AuraNest styling expert will guide you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact info column (span 5) */}
        <div className="md:col-span-5 bg-beige/35 rounded-2xl p-6 md:p-8 space-y-6 border border-[#E8DCCB]/50">
          <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Our Styling Office</h3>
          <p className="text-xs text-charcoal/60 leading-relaxed">
            While we operate online across major cities in India, our design studio is based in the heart of Bengaluru.
          </p>

          <div className="space-y-4 pt-4 text-xs text-charcoal/80">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-terracotta shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal">The AuraNest Studio</p>
                <p className="text-charcoal/60 leading-relaxed">45, Lavelle Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-terracotta shrink-0" />
              <div>
                <p className="font-semibold text-charcoal">Call Us</p>
                <p className="text-charcoal/60">+91 (80) 4920 1837 (Mon-Sat, 10 AM - 6 PM)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-terracotta shrink-0" />
              <div>
                <p className="font-semibold text-charcoal">Email Support</p>
                <p className="text-charcoal/60">curate@auranest.in</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8DCCB]/50 text-[10px] uppercase tracking-widest text-charcoal/50 font-mono">
            Free shipping on orders above ₹2,500
          </div>
        </div>

        {/* Contact Form column (span 7) */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8DCCB]/30">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-sage/20 text-charcoal mx-auto flex items-center justify-center">
                <Send size={24} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">Message Sent Successfully</h3>
              <p className="text-sm text-charcoal/60 max-w-sm mx-auto">
                We have registered your query. A designated styling advisor will reach out to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-stylist-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priyal Sharma"
                    className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priyal@gmail.com"
                    className="w-full bg-[#F8F6F2] rounded-xl px-4 py-2.5 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-msg" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider">Message or Query</label>
                <textarea
                  id="contact-msg"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are styling. e.g. I have a 12-foot wall painted in olive sage, and want to choose between the Arched brass mirror or the Botanical set..."
                  className="w-full bg-[#F8F6F2] rounded-xl px-4 py-3 text-xs text-charcoal outline-none border border-charcoal/5 focus:border-terracotta focus:ring-1 focus:ring-terracotta resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-terracotta hover:bg-charcoal text-white text-xs uppercase tracking-widest font-sans font-semibold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Send Message
                <Send size={12} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function FAQsView() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you deliver across India? What are the delivery times?',
      a: 'Yes! AuraNest delivers to over 18,000 pin codes across India, with active express channels to Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, and Chennai. Delivery usually takes 3 to 5 business days for major metropolitan hubs, and 5 to 7 days for tier-2 cities.'
    },
    {
      q: 'Are your table lamps and floor lamps pre-wired for Indian sockets?',
      a: 'Absolutely. All our electrical fixtures, bedside touch lamps, and sweeping arc lamps are fully compatible with Indian standards (220-240V AC, 50Hz, standard 2-pin or 3-pin plug heads). All bedside lamps include warm LED bulbs inside the box so they are ready to glow on arrival.'
    },
    {
      q: 'How securely are mirrors and heavy framed wall arts packed?',
      a: 'Safety in transit is our top priority. Our mirrors and framed artworks are layered in high-density honeycomb structural cardboard, thick thermocol molds, bubble wrap, and shipped in durable wooden crating for safe, damage-free transit.'
    },
    {
      q: 'Do you support Cash on Delivery (COD) or returns?',
      a: 'Yes, we support COD for order values up to ₹15,000. We also offer a complimentary 7-day return policy for any damaged or defective products on arrival. Just email calibrate@auranest.in with brief unpackaging photos, and we will initiate a priority pickup and full refund.'
    },
    {
      q: 'Can I purchase cushion inserts separately from covers?',
      a: 'Yes! In our Cushions catalog, we sell both integrated cushion sets and standalone premium microfiber inserts. We recommend buying our Aura Comfort Microfiber Insert if you prefer a plump, firm-looking bounce.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <HelpCircle className="text-terracotta size-8 mx-auto mb-3" />
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal mb-4">Frequently Asked Questions</h1>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          Quick details on shipping, custom packaging, product materials, and styling support.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8DCCB]/40 overflow-hidden transition-all duration-200"
              id={`faq-item-${idx}`}
            >
              <button
                onClick={() => setActiveIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base font-semibold text-charcoal hover:text-terracotta transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp size={18} className="text-terracotta shrink-0" /> : <ChevronDown size={18} className="text-charcoal/40 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs text-charcoal/70 leading-relaxed font-sans border-t border-[#E8DCCB]/15 bg-ivory/20 animate-fade-in-up">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AboutUsView() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-16">
        <div className="md:col-span-6 space-y-5">
          <span className="text-terracotta text-[10px] tracking-widest font-mono font-semibold uppercase">The AuraNest Story</span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal leading-tight">Modern Living, Organic Harmony</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            AuraNest was founded in 2025 out of a simple, personal frustration: the design gap between cold mass-manufactured plastics and hyper-luxury, exclusive pricing. Our founders wanted to craft a store where homes could feel editorial, cozy, and high-quality without compromise.
          </p>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            By collaborating directly with traditional block-printing communities in Rajasthan and master wood-turners in Karnataka, we combine generational craftsmanship with clean modern silhouettes. The result is home accessories that feel warm, elegant, and uniquely personal.
          </p>
        </div>
        <div className="md:col-span-6">
          <div className="p-8 bg-beige/30 rounded-3xl border border-[#E8DCCB]/40 flex items-center justify-center">
            {/* Draw custom geometric abstract art representation */}
            <div className="w-full max-w-sm aspect-[4/3] flex items-center justify-center p-4">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="150" cy="150" r="80" fill="#C97C5D" fillOpacity="0.1" />
                <rect x="180" y="80" width="120" height="150" rx="6" fill="#B8C9B1" fillOpacity="0.3" stroke="#3F3F3F" strokeWidth="2" />
                <path d="M 80 250 Q 150 120 220 250 Z" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="2.5" />
                <circle cx="270" cy="120" r="25" fill="#C97C5D" />
                {/* Minimalist branch */}
                <path d="M 180 220 Q 220 160 250 140" stroke="#3F3F3F" strokeWidth="2" strokeLinecap="round" />
                <circle cx="220" cy="180" r="4" fill="#3F3F3F" />
                <circle cx="238" cy="160" r="4" fill="#3F3F3F" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Bento */}
      <div className="bg-beige/25 rounded-3xl p-8 md:p-10 border border-[#E8DCCB]/30 mb-16">
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-charcoal text-center mb-8">Our Core Curations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8DCCB]/20">
            <div className="w-10 h-10 rounded-full bg-sage/20 text-charcoal flex items-center justify-center font-bold text-base mb-4 font-mono">01</div>
            <h4 className="font-serif text-base font-semibold text-charcoal mb-2">Artisanal Heritage</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-sans">
              We source raw seagrass, pure white Banswara marbles, and fine-combed cottons directly from regional craft houses, preserving local livelihoods.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E8DCCB]/20">
            <div className="w-10 h-10 rounded-full bg-sage/20 text-charcoal flex items-center justify-center font-bold text-base mb-4 font-mono">02</div>
            <h4 className="font-serif text-base font-semibold text-charcoal mb-2">Minimalist Design</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-sans">
              Clean arches, soothing earth tones, and functional geometry ensure each product remains ageless even as trend cycles shift.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E8DCCB]/20">
            <div className="w-10 h-10 rounded-full bg-sage/20 text-charcoal flex items-center justify-center font-bold text-base mb-4 font-mono">03</div>
            <h4 className="font-serif text-base font-semibold text-charcoal mb-2">Sustainable Sourcing</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-sans">
              We focus on premium lead-free brasses, FSC-certified solid oak and teak wood blocks, and unbleached organic soy waxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogView({ onNavigate }: { onNavigate: (view: ActiveView) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-terracotta text-[10px] tracking-widest font-mono font-semibold uppercase">The AuraNest Journal</span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-charcoal mb-4">Interior Styling Blog</h1>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          A collection of design insights, guides to layering light, and tips on maintaining natural fibers in your home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS.map((blog) => (
          <article
            key={blog.id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8DCCB]/40 shadow-sm hover:shadow-md transition-all group"
            id={`blog-card-${blog.id}`}
          >
            {/* Blog Image */}
            <div className="aspect-[16/9] w-full bg-[#E8DCCB]/20 overflow-hidden flex items-center justify-center p-4 border-b border-[#E8DCCB]/30">
              <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500">
                <AuraSVG type={blog.imageType} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold mb-2">
                <span>{blog.category}</span>
                <span>·</span>
                <span>{blog.readTime}</span>
              </div>

              <h3 className="font-serif text-base font-bold text-charcoal group-hover:text-terracotta transition-colors mb-3 leading-snug line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-xs text-charcoal/60 font-sans leading-relaxed line-clamp-3 mb-5">
                {blog.excerpt}
              </p>

              <button
                onClick={() => onNavigate('shop')}
                className="mt-auto text-xs text-terracotta font-semibold hover:text-charcoal transition-colors flex items-center gap-1 hover:translate-x-1 duration-200"
              >
                Explore Featured Collection →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPolicyView() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 font-sans text-xs text-charcoal/80 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-charcoal text-center mb-8">Privacy Policy</h1>
      <p className="leading-relaxed">
        <strong>Effective Date: July 15, 2026</strong>
      </p>
      <p className="leading-relaxed">
        At AuraNest, operated under AuraNest Interiors Private Limited (“we”, “us”, or “our”), we respect your personal privacy and are fully committed to protecting the information you share with us. This Privacy Policy details how we collect, store, handle, and protect your information when you browse our home styling store or perform styling transactions with us.
      </p>
      <h3 className="font-serif text-sm font-semibold text-charcoal pt-3 uppercase tracking-wider">1. Information We Collect</h3>
      <p className="leading-relaxed">
        We collect only the essential details required to process your home styling purchases or newsletter subscriptions: your billing name, delivery/shipping address, email address, telephone contact number, and selected payment choice details.
      </p>
      <h3 className="font-serif text-sm font-semibold text-charcoal pt-3 uppercase tracking-wider">2. How We Use Your Data</h3>
      <p className="leading-relaxed">
        We use your details strictly to dispatch orders safely to your doorstep, confirm transaction receipts, communicate tracking codes, send optional styling tips if you subscribe, and resolve customer support queries.
      </p>
      <p className="leading-relaxed">
        If you have any questions about this policy, write to us at curate@auranest.in.
      </p>
    </div>
  );
}

export function TermsOfServiceView() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 font-sans text-xs text-charcoal/80 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-charcoal text-center mb-8">Terms of Service</h1>
      <p className="leading-relaxed">
        <strong>Last Updated: July 15, 2026</strong>
      </p>
      <p className="leading-relaxed font-sans">
        Welcome to AuraNest. By accessing our styling platform, navigating our catalog, or initiating checkout processes, you explicitly agree to comply with and be bound by the following terms and conditions. Please read them thoroughly before browsing.
      </p>
      <h3 className="font-serif text-sm font-semibold text-charcoal pt-3 uppercase tracking-wider">1. Product Pricing & Accuracy</h3>
      <p className="leading-relaxed">
        We strive to ensure pricing accuracy in ₹ (INR). In the rare event of clerical pricing anomalies, we reserve the right to cancel affected order drafts and issue instant full refunds to your initial payment method.
      </p>
      <h3 className="font-serif text-sm font-semibold text-charcoal pt-3 uppercase tracking-wider">2. Safe Packing Guarantee</h3>
      <p className="leading-relaxed">
        We guarantee that mirrors, clocks, and pottery travel with robust protective crating. If an item arrives compromised, we pledge to replace it instantly at zero complementary shipping cost to you.
      </p>
    </div>
  );
}
