import { motion } from 'motion/react';

// RoomCorner assembles itself on load with staggered animation
export function RoomCorner() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto bg-ivory rounded-3xl overflow-hidden shadow-xl border border-[#E8DCCB]/40">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Ambient background glow */}
        <defs>
          <radialGradient id="lampGlow" cx="240" cy="270" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F9D976" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#C97C5D" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F8F6F2" stopOpacity="0" />
          </radialGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#3F3F3F" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* 1. Room Base Wall & Flooring (Fades/Slides Up) */}
        <g id="room-background">
          {/* Wall background */}
          <rect width="800" height="460" fill="#E8DCCB" fillOpacity="0.4" />
          {/* Floor background */}
          <rect y="460" width="800" height="140" fill="#E8DCCB" fillOpacity="0.8" />
          {/* Baseboard line */}
          <line x1="0" y1="460" x2="800" y2="460" stroke="#3F3F3F" strokeWidth="2" strokeOpacity="0.15" />
        </g>

        {/* 2. Cozy Boho Rug on the Floor (Staggers in) */}
        <motion.path
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          d="M 120 540 C 240 500, 560 500, 680 540 C 600 585, 200 585, 120 540 Z"
          fill="#F8F6F2"
          stroke="#C97C5D"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* 3. Grand Arched Brass Mirror (Rises up, scales) */}
        <motion.g
          initial={{ opacity: 0, y: 80, scaleY: 0.8 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          filter="url(#softShadow)"
        >
          {/* Arch frame */}
          <path
            d="M 440 480 L 440 180 A 100 100 0 0 1 640 180 L 640 480 Z"
            fill="#F8F6F2"
            stroke="#C97C5D"
            strokeWidth="4.5"
          />
          {/* Glass reflection gradient line */}
          <path
            d="M 520 100 L 620 300"
            stroke="#B8C9B1"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 460 180 L 560 380"
            stroke="#B8C9B1"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            strokeLinecap="round"
          />
        </motion.g>

        {/* 4. Elegant Mid-Century Teak Sideboard (Enters with solid slide up) */}
        <motion.g
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          filter="url(#softShadow)"
        >
          {/* Main body */}
          <rect x="140" y="360" width="340" height="130" rx="10" fill="#3F3F3F" />
          {/* Door accents */}
          <rect x="155" y="375" width="145" height="100" rx="4" fill="#E8DCCB" fillOpacity="0.1" stroke="#F8F6F2" strokeWidth="1" strokeOpacity="0.2" />
          <rect x="320" y="375" width="145" height="100" rx="4" fill="#E8DCCB" fillOpacity="0.1" stroke="#F8F6F2" strokeWidth="1" strokeOpacity="0.2" />
          {/* Knobs */}
          <circle cx="285" cy="425" r="4" fill="#C97C5D" />
          <circle cx="335" cy="425" r="4" fill="#C97C5D" />
          {/* Legs */}
          <line x1="170" y1="490" x2="160" y2="520" stroke="#3F3F3F" strokeWidth="8" strokeLinecap="round" />
          <line x1="450" y1="490" x2="460" y2="520" stroke="#3F3F3F" strokeWidth="8" strokeLinecap="round" />
        </motion.g>

        {/* 5. Ceramic Table Lamp Sitting on Sideboard + Light Glow */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* Light Glow Aura */}
          <motion.circle
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.05, 0.9] }}
            transition={{ delay: 1.1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            cx="240"
            cy="270"
            r="120"
            fill="url(#lampGlow)"
          />

          {/* Lamp base */}
          <path d="M 215 360 C 215 320, 265 320, 265 360 Z" fill="#C97C5D" />
          {/* Lamp neck */}
          <rect x="236" y="315" width="8" height="12" fill="#3F3F3F" />
          {/* Linen shade */}
          <path d="M 205 315 L 220 250 L 260 250 L 275 315 Z" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="2" />
        </motion.g>

        {/* 6. Terracotta Vase & Pampas Grass (Fades & rises gently) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {/* Pampas grass stems */}
          <path d="M 400 360 Q 420 240 435 210" stroke="#C97C5D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 400 360 Q 380 250 360 220" stroke="#B8C9B1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 400 360 Q 405 230 408 190" stroke="#C97C5D" strokeWidth="1.5" strokeLinecap="round" />
          {/* Fluffy bits */}
          <path d="M 435 210 Q 445 195 440 190" stroke="#C97C5D" strokeWidth="3" strokeOpacity="0.7" />
          <path d="M 360 220 Q 345 210 350 205" stroke="#B8C9B1" strokeWidth="3" strokeOpacity="0.7" />
          <path d="M 408 190 Q 415 170 405 168" stroke="#C97C5D" strokeWidth="3" strokeOpacity="0.7" />
          
          {/* Ceramic vase */}
          <path d="M 385 360 C 385 325, 415 325, 415 360 Z" fill="#B8C9B1" />
          <rect x="396" y="322" width="8" height="6" fill="#E8DCCB" />
        </motion.g>

        {/* 7. Organic House Plant on the Floor (Grows leaf by leaf with springy motion) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Terracotta pot */}
          <path d="M 100 525 L 110 470 L 150 470 L 160 525 Z" fill="#C97C5D" stroke="#3F3F3F" strokeWidth="2.5" />
          
          {/* Stems */}
          <path d="M 130 470 Q 120 380 80 340" stroke="#3F3F3F" strokeWidth="2" />
          <path d="M 130 470 Q 140 370 180 330" stroke="#3F3F3F" strokeWidth="2" />
          <path d="M 130 470 Q 132 350 135 310" stroke="#3F3F3F" strokeWidth="2" />

          {/* Leaf 1 (Left) */}
          <motion.path
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 70 }}
            d="M 80 340 C 60 320, 50 340, 45 360 C 65 375, 75 355, 80 340"
            fill="#B8C9B1"
            stroke="#3F3F3F"
            strokeWidth="1.5"
          />
          {/* Leaf 2 (Right) */}
          <motion.path
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 70 }}
            d="M 180 330 C 200 310, 210 330, 215 350 C 195 365, 185 345, 180 330"
            fill="#B8C9B1"
            stroke="#3F3F3F"
            strokeWidth="1.5"
          />
          {/* Leaf 3 (Center Top) */}
          <motion.path
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, type: "spring", stiffness: 70 }}
            d="M 135 310 C 120 280, 140 270, 150 280 C 155 305, 145 315, 135 310"
            fill="#B8C9B1"
            stroke="#3F3F3F"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* 8. Modern Line Art Frame hanging on the Wall */}
        <motion.g
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
          filter="url(#softShadow)"
        >
          {/* Frame wood */}
          <rect x="250" y="80" width="110" height="140" rx="3" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="3" />
          {/* Mat border */}
          <rect x="262" y="92" width="86" height="116" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="0.5" />
          {/* Minimalist botanical drawing */}
          <path d="M 305 190 Q 300 130 315 110" stroke="#C97C5D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 303 160 Q 285 150 290 142" stroke="#B8C9B1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 306 142 Q 325 130 320 125" stroke="#B8C9B1" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </svg>
      
      {/* Decorative label */}
      <div className="absolute bottom-4 left-4 bg-charcoal/95 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-mono">
        Signature View: "The Living Corner"
      </div>
    </div>
  );
}

interface AuraSVGProps {
  type: string;
  className?: string;
}

export function AuraSVG({ type, className = "w-full h-full" }: AuraSVGProps) {
  // We will return gorgeous hand-crafted minimalist vectors matching the palette:
  // Charcoal: #3F3F3F, Terracotta: #C97C5D, Sage Green: #B8C9B1, Warm Beige: #E8DCCB, Ivory: #F8F6F2
  switch (type) {
    case 'botanical-art':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Terracotta backdrop circle */}
          <circle cx="200" cy="200" r="100" fill="#E8DCCB" fillOpacity="0.5" />
          <circle cx="160" cy="180" r="60" fill="#C97C5D" fillOpacity="0.15" />
          {/* Botanical Line Art drawing */}
          <path d="M 200 320 Q 200 160 230 110" stroke="#3F3F3F" strokeWidth="4" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M 201 260 Q 140 230 150 200 C 170 200, 190 230, 201 260 Z" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="2.5" />
          <path d="M 208 210 Q 270 180 260 150 C 240 150, 220 180, 208 210 Z" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="2.5" />
          <path d="M 218 150 Q 170 110 185 90 C 200 90, 212 120, 218 150 Z" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="2.5" />
        </svg>
      );

    case 'abstract-canvas':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Texture layers */}
          <path d="M 50 350 L 250 120 L 350 350 Z" fill="#E8DCCB" />
          <path d="M 120 350 L 300 180 L 380 350 Z" fill="#C97C5D" fillOpacity="0.8" />
          <circle cx="270" cy="120" r="50" fill="#B8C9B1" />
          <line x1="50" y1="350" x2="350" y2="350" stroke="#3F3F3F" strokeWidth="4" />
          {/* Abstract scribbles */}
          <path d="M 100 220 Q 150 180 180 240 T 260 210" stroke="#3F3F3F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'macrame':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Driftwood */}
          <rect x="60" y="80" width="280" height="14" rx="7" fill="#3F3F3F" />
          {/* Supporting cord */}
          <path d="M 100 80 L 200 30 L 300 80" stroke="#C97C5D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Woven strands */}
          <g stroke="#E8DCCB" strokeWidth="2.5">
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={i} x1={90 + i * 16} y1="94" x2={90 + i * 16} y2="220" />
            ))}
          </g>
          {/* Triangular macrame weaves */}
          <path d="M 90 94 L 200 210 L 310 94" stroke="#C97C5D" strokeWidth="3" fill="none" />
          <path d="M 110 94 L 200 180 L 290 94" stroke="#B8C9B1" strokeWidth="2" fill="none" />
          {/* Fringe ends */}
          <g stroke="#E8DCCB" strokeWidth="2">
            {Array.from({ length: 23 }).map((_, i) => (
              <path key={i} d={`M ${80 + i * 11} 220 Q ${82 + i * 11} 290 ${78 + i * 11 + (i % 2 === 0 ? 5 : -5)} 340`} />
            ))}
          </g>
        </svg>
      );

    case 'wall-clock':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          <circle cx="200" cy="200" r="130" fill="#E8DCCB" fillOpacity="0.4" stroke="#3F3F3F" strokeWidth="3" />
          {/* Center spindle */}
          <circle cx="200" cy="200" r="8" fill="#C97C5D" />
          {/* Hands */}
          <line x1="200" y1="200" x2="200" y2="110" stroke="#3F3F3F" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="200" y1="200" x2="280" y2="200" stroke="#C97C5D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Small dashes */}
          <circle cx="200" cy="85" r="4" fill="#3F3F3F" />
          <circle cx="315" cy="200" r="4" fill="#3F3F3F" />
          <circle cx="200" cy="315" r="4" fill="#3F3F3F" />
          <circle cx="85" cy="200" r="4" fill="#3F3F3F" />
        </svg>
      );

    case 'sunburst-mirror':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Rattan bursts */}
          <g stroke="#C97C5D" strokeWidth="3" strokeLinecap="round">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + Math.cos(rad) * 60;
              const y1 = 200 + Math.sin(rad) * 60;
              const x2 = 200 + Math.cos(rad) * (110 + (i % 2 === 0 ? 30 : 0));
              const y2 = 200 + Math.sin(rad) * (110 + (i % 2 === 0 ? 30 : 0));
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          {/* Woven details */}
          <circle cx="200" cy="200" r="68" fill="none" stroke="#B8C9B1" strokeWidth="4" />
          <circle cx="200" cy="200" r="60" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="3" />
          {/* Inner Mirror reflective lines */}
          <path d="M 180 160 L 220 240" stroke="#F8F6F2" strokeWidth="2.5" strokeOpacity="0.6" />
        </svg>
      );

    case 'floor-mirror':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Arch frame */}
          <path d="M 140 340 L 140 140 A 60 60 0 0 1 260 140 L 260 340 Z" fill="#E8DCCB" fillOpacity="0.4" stroke="#C97C5D" strokeWidth="6" />
          {/* Mirror inner bevel */}
          <path d="M 148 340 L 148 143 A 52 52 0 0 1 252 143 L 252 340" stroke="#3F3F3F" strokeWidth="1.5" fill="none" />
          {/* Shimmer line */}
          <path d="M 170 120 L 230 260" stroke="#F8F6F2" strokeWidth="3.5" strokeOpacity="0.7" />
          {/* Standing base */}
          <rect x="120" y="340" width="160" height="8" rx="4" fill="#3F3F3F" />
        </svg>
      );

    case 'vanity-mirror':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Mirror body */}
          <path d="M 150 280 L 150 160 A 50 50 0 0 1 250 160 L 250 280 Z" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="3.5" />
          {/* Walnut bottom shelf */}
          <rect x="130" y="280" width="140" height="12" rx="3" fill="#3F3F3F" />
          {/* Reflection lines */}
          <path d="M 180 140 L 220 220" stroke="#B8C9B1" strokeWidth="2.5" strokeOpacity="0.5" />
        </svg>
      );

    case 'ceramic-lamp':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Glow backdrop */}
          <circle cx="200" cy="180" r="70" fill="#E8DCCB" fillOpacity="0.5" />
          {/* Lamp Shade */}
          <path d="M 140 220 L 160 120 L 240 120 L 260 220 Z" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="3.5" />
          {/* Stem */}
          <rect x="195" y="220" width="10" height="15" fill="#3F3F3F" />
          {/* Textured Base */}
          <path d="M 160 300 C 160 235, 240 235, 240 300 Z" fill="#C97C5D" stroke="#3F3F3F" strokeWidth="3.5" />
          {/* Specks */}
          <circle cx="185" cy="275" r="3" fill="#F8F6F2" />
          <circle cx="200" cy="265" r="2.5" fill="#F8F6F2" />
          <circle cx="215" cy="280" r="3" fill="#F8F6F2" />
        </svg>
      );

    case 'amber-lamp':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Amber glass sphere */}
          <circle cx="200" cy="220" r="75" fill="#C97C5D" fillOpacity="0.4" stroke="#3F3F3F" strokeWidth="3.5" />
          {/* Inner bulb */}
          <circle cx="200" cy="220" r="16" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="2" />
          <line x1="200" y1="236" x2="200" y2="280" stroke="#3F3F3F" strokeWidth="3" />
          {/* Ribbed lines on glass */}
          <path d="M 160 170 Q 200 220 160 270" stroke="#3F3F3F" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M 240 170 Q 200 220 240 270" stroke="#3F3F3F" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M 200 145 V 295" stroke="#3F3F3F" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Brass base */}
          <rect x="160" y="295" width="80" height="12" rx="3" fill="#3F3F3F" />
        </svg>
      );

    case 'arc-lamp':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Heavy Marble base */}
          <rect x="230" y="320" width="80" height="20" rx="3" fill="#3F3F3F" />
          {/* Sweeping Arc */}
          <path d="M 270 320 C 270 120, 100 120, 130 220" stroke="#C97C5D" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          {/* Hanging Dome Shade */}
          <path d="M 105 220 C 105 195, 155 195, 155 220 Z" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="3" />
          {/* Light cone */}
          <polygon points="105,220 80,310 180,310 155,220" fill="#E8DCCB" fillOpacity="0.3" />
        </svg>
      );

    case 'tripod-lamp':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Shade */}
          <rect x="150" y="80" width="100" height="70" rx="4" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="3" />
          {/* Tripod Legs */}
          <line x1="200" y1="150" x2="140" y2="340" stroke="#C97C5D" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="200" y1="150" x2="260" y2="340" stroke="#C97C5D" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="200" y1="150" x2="200" y2="340" stroke="#3F3F3F" strokeWidth="3" strokeLinecap="round" />
          {/* Leg brackets */}
          <line x1="170" y1="240" x2="230" y2="240" stroke="#3F3F3F" strokeWidth="2" />
        </svg>
      );

    case 'blockprint-cushion':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Cushion pillow shape */}
          <path d="M 100 100 Q 200 80 300 100 Q 320 200 300 300 Q 200 320 100 300 Q 80 200 100 100 Z" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="4" />
          {/* Block-print flower patterns inside */}
          <g stroke="#C97C5D" strokeWidth="3" fill="none" strokeLinecap="round">
            {/* Center flower */}
            <circle cx="200" cy="200" r="14" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="2" />
            <path d="M 200 170 Q 200 186 200 186" />
            <path d="M 200 230 Q 200 214 200 214" />
            <path d="M 170 200 Q 186 200 186 200" />
            <path d="M 230 200 Q 214 200 214 200" />
            {/* Corner motifs */}
            <path d="M 130 130 Q 150 140 140 150" />
            <path d="M 270 130 Q 250 140 260 150" />
            <path d="M 130 270 Q 150 260 140 250" />
            <path d="M 270 270 Q 250 260 260 250" />
          </g>
        </svg>
      );

    case 'boucle-cushion':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Soft square */}
          <path d="M 110 110 Q 200 90 290 110 Q 310 200 290 290 Q 200 310 110 290 Q 90 200 110 110 Z" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="3" />
          {/* Curly loops of Boucle texture */}
          <g stroke="#B8C9B1" strokeWidth="2.5" fill="none">
            {Array.from({ length: 18 }).map((_, i) => (
              <path key={i} d={`M ${130 + (i % 4) * 40} ${130 + Math.floor(i / 4) * 35} C ${140 + (i % 4) * 40} ${120 + Math.floor(i / 4) * 35}, ${150 + (i % 4) * 40} ${140 + Math.floor(i / 4) * 35}, ${140 + (i % 4) * 40} ${150 + Math.floor(i / 4) * 35}`} />
            ))}
          </g>
          {/* Warm corner tassels */}
          <circle cx="100" cy="100" r="6" fill="#C97C5D" />
          <circle cx="300" cy="100" r="6" fill="#C97C5D" />
          <circle cx="100" cy="300" r="6" fill="#C97C5D" />
          <circle cx="300" cy="300" r="6" fill="#C97C5D" />
        </svg>
      );

    case 'candle':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Glass Jar */}
          <rect x="140" y="180" width="120" height="130" rx="12" fill="#C97C5D" fillOpacity="0.4" stroke="#3F3F3F" strokeWidth="3.5" />
          {/* Wax Level */}
          <rect x="144" y="210" width="112" height="96" rx="4" fill="#E8DCCB" />
          {/* Wicks */}
          <line x1="180" y1="210" x2="180" y2="195" stroke="#3F3F3F" strokeWidth="2" />
          <line x1="220" y1="210" x2="220" y2="195" stroke="#3F3F3F" strokeWidth="2" />
          {/* Gentle candle flames */}
          <path d="M 180 195 Q 175 180 180 170 Q 185 180 180 195 Z" fill="#C97C5D" />
          <path d="M 220 195 Q 215 180 220 170 Q 225 180 220 195 Z" fill="#C97C5D" />
          {/* Label */}
          <rect x="165" y="240" width="70" height="40" rx="4" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="1" />
          <line x1="175" y1="250" x2="225" y2="250" stroke="#3F3F3F" strokeWidth="1.5" />
          <line x1="175" y1="260" x2="215" y2="260" stroke="#3F3F3F" strokeWidth="1.5" />
        </svg>
      );

    case 'diffuser':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Reed sticks radiating out */}
          <g stroke="#3F3F3F" strokeWidth="3" strokeLinecap="round">
            <line x1="200" y1="200" x2="140" y2="70" />
            <line x1="200" y1="200" x2="175" y2="60" />
            <line x1="200" y1="200" x2="200" y2="50" />
            <line x1="200" y1="200" x2="230" y2="65" />
            <line x1="200" y1="200" x2="265" y2="85" />
          </g>
          {/* Stoneware Flask */}
          <path d="M 170 310 C 150 310, 150 220, 180 220 L 180 190 A 20 20 0 0 1 220 190 L 220 220 C 250 220, 250 310, 230 310 Z" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="3.5" />
          <circle cx="200" cy="265" r="18" fill="#E8DCCB" />
        </svg>
      );

    case 'marble-tray':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Tray in isometric projection */}
          <polygon points="80,240 200,160 320,240 200,320" fill="#E8DCCB" fillOpacity="0.3" stroke="#3F3F3F" strokeWidth="3" />
          <polygon points="80,246 200,166 320,246 200,326" fill="none" stroke="#C97C5D" strokeWidth="1.5" />
          {/* Marble veins */}
          <path d="M 120 220 Q 150 210 180 230 T 260 210" stroke="#3F3F3F" strokeWidth="1.5" strokeOpacity="0.15" />
          <path d="M 160 180 Q 200 190 220 170" stroke="#3F3F3F" strokeWidth="1" strokeOpacity="0.15" />
          {/* Two coasters */}
          <polygon points="150,230 180,210 210,230 180,250" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="1.5" />
          <line x1="150" y1="230" x2="210" y2="230" stroke="#C97C5D" strokeWidth="2" />
        </svg>
      );

    case 'baskets':
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#F8F6F2" rx="16" />
          {/* Woven basket basket outline */}
          <path d="M 110 160 L 130 300 C 130 315, 270 315, 270 300 L 290 160 Z" fill="#E8DCCB" stroke="#3F3F3F" strokeWidth="4" />
          {/* Rim */}
          <ellipse cx="200" cy="160" rx="90" ry="20" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="3" />
          {/* Handles */}
          <path d="M 100 160 C 85 150, 85 130, 105 138" stroke="#3F3F3F" strokeWidth="3" fill="none" />
          <path d="M 300 160 C 315 150, 315 130, 295 138" stroke="#3F3F3F" strokeWidth="3" fill="none" />
          {/* Basketweave horizontal lines */}
          <path d="M 118 200 Q 200 220 282 200" stroke="#C97C5D" strokeWidth="2" fill="none" />
          <path d="M 124 240 Q 200 260 276 240" stroke="#C97C5D" strokeWidth="2" fill="none" />
          <path d="M 128 280 Q 200 300 272 280" stroke="#C97C5D" strokeWidth="2" fill="none" />
        </svg>
      );

    // Blog images (gorgeous minimal layout representations)
    case 'blog-living':
      return (
        <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="300" fill="#E8DCCB" fillOpacity="0.4" rx="16" />
          <circle cx="150" cy="150" r="90" fill="#F8F6F2" />
          <circle cx="180" cy="120" r="40" fill="#C97C5D" fillOpacity="0.2" />
          {/* Line art plant leaves */}
          <path d="M 150 240 Q 150 150 180 120" stroke="#3F3F3F" strokeWidth="3" />
          <path d="M 120 180 C 135 155, 165 155, 180 180 Z" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="1.5" />
          <text x="320" y="140" fill="#3F3F3F" fontFamily="Playfair Display" fontSize="24" fontWeight="600">Space & Form</text>
          <text x="320" y="175" fill="#3F3F3F" fillOpacity="0.7" fontFamily="Poppins" fontSize="14">Curated Living Elements</text>
        </svg>
      );

    case 'blog-lighting':
      return (
        <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="300" fill="#F8F6F2" rx="16" />
          {/* Glow */}
          <circle cx="160" cy="120" r="100" fill="#E8DCCB" fillOpacity="0.6" />
          {/* Lamp base */}
          <path d="M 140 230 C 140 200, 180 200, 180 230 Z" fill="#C97C5D" stroke="#3F3F3F" strokeWidth="2.5" />
          <path d="M 120 200 L 130 130 L 190 130 L 200 200 Z" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="2.5" />
          <text x="320" y="140" fill="#3F3F3F" fontFamily="Playfair Display" fontSize="24" fontWeight="600">Luminous Layers</text>
          <text x="320" y="175" fill="#3F3F3F" fillOpacity="0.7" fontFamily="Poppins" fontSize="14">Crafting Cozy Evenings</text>
        </svg>
      );

    case 'blog-organic':
      return (
        <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="600" height="300" fill="#E8DCCB" fillOpacity="0.4" rx="16" />
          {/* Nested organic bowls */}
          <path d="M 100 160 C 100 240, 260 240, 260 160 Z" fill="#F8F6F2" stroke="#3F3F3F" strokeWidth="3" />
          <path d="M 120 160 C 120 220, 240 220, 240 160 Z" fill="#B8C9B1" stroke="#3F3F3F" strokeWidth="2" />
          <text x="320" y="140" fill="#3F3F3F" fontFamily="Playfair Display" fontSize="24" fontWeight="600">Woven Tactility</text>
          <text x="320" y="175" fill="#3F3F3F" fillOpacity="0.7" fontFamily="Poppins" fontSize="14">Sourcing Organic Craft</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="400" height="400" fill="#E8DCCB" rx="16" />
          <circle cx="200" cy="200" r="50" fill="#C97C5D" />
        </svg>
      );
  }
}
