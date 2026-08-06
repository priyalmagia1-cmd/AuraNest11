import { useState, useEffect } from 'react';
import { CheckCircle2, Package, Truck, Home, Clock, Play, Pause, MapPin, Copy, Check, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderStatusTrackerProps {
  orderId: string;
  email?: string;
  customerCity?: string;
}

export interface TrackingStage {
  id: 'confirmed' | 'packaging' | 'shipped' | 'delivered';
  title: string;
  shortLabel: string;
  subtitle: string;
  timestamp: string;
  statusText: string;
  location: string;
  icon: any;
  details: string[];
}

export function OrderStatusTracker({ orderId, email, customerCity = 'Bengaluru' }: OrderStatusTrackerProps) {
  const [activeStage, setActiveStage] = useState<number>(1); // Default to stage 1 (Packaging) for realistic post-purchase feel
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedTracking, setCopiedTracking] = useState<boolean>(false);

  const trackingNumber = `AN-TRK-${orderId.replace(/[^0-9]/g, '') || '987654'}-IN`;

  const stages: TrackingStage[] = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      shortLabel: 'Confirmed',
      subtitle: 'Payment Authorized',
      timestamp: 'Today, 2:45 PM',
      statusText: 'Payment verified & order queued for workshop',
      location: 'AuraNest HQ · Central Bengaluru',
      icon: CheckCircle2,
      details: [
        'Payment of 256-bit SSL token authorized successfully',
        'Item reservation confirmed in central inventory',
        'Artisan dispatch notification issued'
      ]
    },
    {
      id: 'packaging',
      title: 'White-Glove Packaging',
      shortLabel: 'Packaging',
      subtitle: 'Custom Crate & Wrap',
      timestamp: 'Today, 4:15 PM',
      statusText: 'Quality inspection & protective timber crating in progress',
      location: 'Craft Fulfillment Studio · Peenya Industrial Area',
      icon: Package,
      details: [
        'Surface finish and structural integrity inspected',
        'Wrapped in shock-absorbing eco-cellulose & corner guards',
        'Sealed with tamper-evident insured security band'
      ]
    },
    {
      id: 'shipped',
      title: 'In Transit / Shipped',
      shortLabel: 'Shipped',
      subtitle: 'Insured Courier',
      timestamp: 'Expected Tomorrow, 9:00 AM',
      statusText: 'Handed to AuraNest Express Freight. Vehicle #KA-01-EQ-9042',
      location: 'En Route to Local Sorting Facility',
      icon: Truck,
      details: [
        'Dispatched from main regional hub',
        'Insured pan-India transit coverage active',
        'Real-time GPS telemetry link generated'
      ]
    },
    {
      id: 'delivered',
      title: 'Delivered',
      shortLabel: 'Delivered',
      subtitle: 'Doorstep Unboxing',
      timestamp: 'Estimated Aug 9, 2026',
      statusText: 'Scheduled for white-glove arrival and placement check',
      location: `Destination Address · ${customerCity}`,
      icon: Home,
      details: [
        'Out for final delivery with dedicated courier crew',
        'Unboxing & package disposal assistance included',
        'Customer digital signature verification'
      ]
    }
  ];

  // Auto-play / simulation timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStage((prev) => {
          if (prev >= stages.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2500);
  };

  const current = stages[activeStage];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCB]/60 shadow-lg font-sans text-left space-y-6" id="order-status-tracker-root">
      
      {/* Tracker Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse" />
            <h3 className="font-serif font-bold text-lg text-charcoal">Live Order Status Tracker</h3>
          </div>
          <p className="text-xs text-charcoal/60 mt-0.5 font-sans">
            Tracking ID: <span className="font-mono font-bold text-charcoal select-all">{trackingNumber}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyTracking}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-beige/40 hover:bg-beige text-charcoal text-xs font-semibold transition-colors cursor-pointer border border-charcoal/10"
            title="Copy tracking code"
            id="copy-tracking-id-btn"
          >
            {copiedTracking ? <Check size={13} className="text-sage" /> : <Copy size={13} />}
            <span>{copiedTracking ? 'Copied' : 'Copy Code'}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-terracotta hover:bg-charcoal text-white shadow-xs'
            }`}
            id="simulate-tracking-toggle-btn"
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause Simulation' : 'Simulate Progress'}</span>
          </button>
        </div>
      </div>

      {/* Visual Progress Bar (Horizontal Stepper on Desktop, Interactive Steps) */}
      <div className="relative py-2" id="tracker-visual-stepper">
        {/* Connecting Line Background */}
        <div className="hidden sm:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-charcoal/10 rounded-full z-0" />
        
        {/* Active Progress Line */}
        <motion.div
          className="hidden sm:block absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-gradient-to-r from-sage via-terracotta to-terracotta rounded-full z-0 transition-all duration-500"
          style={{ width: `calc(${(activeStage / (stages.length - 1)) * 100}% - 4rem)` }}
        />

        {/* Stepper Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx < activeStage;
            const isCurrent = idx === activeStage;
            const StageIcon = stage.icon;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  setActiveStage(idx);
                  setIsPlaying(false);
                }}
                className="flex flex-col items-center text-center cursor-pointer group"
                id={`stage-node-${stage.id}`}
              >
                {/* Node Circle */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isCurrent
                      ? 'bg-terracotta text-white shadow-lg ring-4 ring-terracotta/20'
                      : isCompleted
                      ? 'bg-sage text-white shadow-sm'
                      : 'bg-white text-charcoal/40 border-2 border-charcoal/15 group-hover:border-terracotta/40'
                  }`}
                >
                  <StageIcon size={20} />
                  
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
                  )}
                </motion.div>

                {/* Node Label */}
                <div className="mt-2.5 space-y-0.5">
                  <p className={`text-xs font-bold font-sans transition-colors ${
                    isCurrent ? 'text-terracotta' : isCompleted ? 'text-charcoal' : 'text-charcoal/50'
                  }`}>
                    {stage.shortLabel}
                  </p>
                  <p className="text-[10px] font-mono text-charcoal/40">
                    {stage.timestamp.split(',')[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Current Stage Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-ivory/80 rounded-2xl p-5 border border-[#E8DCCB] space-y-4"
          id="active-stage-detail-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                0{activeStage + 1}
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal">{current.title}</h4>
                <p className="text-[11px] text-charcoal/60 font-sans">{current.subtitle}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 text-sage font-mono font-bold text-[11px] shrink-0 self-start sm:self-auto">
              <Clock size={12} />
              <span>{current.timestamp}</span>
            </div>
          </div>

          {/* Current Status Message & Location */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs font-sans text-charcoal">
              <MapPin size={15} className="text-terracotta shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-charcoal">Location: </span>
                <span className="text-charcoal/80">{current.location}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-charcoal/10 text-xs font-sans text-charcoal/80 leading-relaxed shadow-2xs">
              <p className="font-semibold text-charcoal">{current.statusText}</p>
            </div>
          </div>

          {/* Stage Detail Checklist */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal/40">
              Stage Activity Log
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-sans text-charcoal/70">
              {current.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-beige/30 p-2 rounded-lg border border-[#E8DCCB]/40">
                  <CheckCircle2 size={13} className="text-sage shrink-0" />
                  <span className="truncate">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courier Support Note */}
          <div className="pt-2 border-t border-charcoal/10 flex flex-wrap items-center justify-between text-[11px] text-charcoal/60 font-sans gap-2">
            <div className="flex items-center gap-1.5 text-sage font-semibold">
              <ShieldCheck size={14} />
              <span>AuraNest Insured White-Glove Transport</span>
            </div>
            {email && (
              <span className="font-mono text-[10px] text-charcoal/50">
                Email updates sending to {email}
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

export const OrderTracker = OrderStatusTracker;
