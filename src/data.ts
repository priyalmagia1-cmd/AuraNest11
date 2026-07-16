import { Product, BlogPost } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'wall-art', name: 'Wall Art' },
  { id: 'mirrors', name: 'Decorative Mirrors' },
  { id: 'table-lamps', name: 'Table Lamps' },
  { id: 'floor-lamps', name: 'Floor Lamps' },
  { id: 'cushions', name: 'Cushions & Cushion Covers' },
  { id: 'rugs-carpets', name: 'Rugs & Carpets' },
  { id: 'indoor-plants', name: 'Indoor Plants' },
  { id: 'decorative-vases', name: 'Decorative Vases' },
  { id: 'candles', name: 'Candles & Diffusers' },
  { id: 'storage-baskets', name: 'Storage Baskets' },
  { id: 'accessories', name: 'Home Accessories' }
];

export const PRODUCTS: Product[] = [
  // --- WALL ART ---
  {
    id: 'p-wa-1',
    name: 'Botanical Line Art Set',
    price: 2400,
    mrp: 3200,
    rating: 4.8,
    category: 'wall-art',
    imageType: 'botanical-art',
    shortDesc: 'A hand-illustrated botanical line piece in a solid oak frame.',
    description: 'Breathe life into your blank walls with our signature Botanical Line Art. This curated set of three features delicate, hand-drawn leafy silhouettes that emphasize minimalism and organic beauty. Perfectly suited for a living room, bedroom, or a quiet reading corner.',
    dimensions: '30 x 40 cm (Each frame, Set of 3)',
    material: '300 GSM Archival Matte Paper, Sustainably-sourced European White Oak Frame, Protective Acrylic Glass',
    finishes: ['Natural Oak Frame', 'Matte Black Frame', 'Classic White Frame'],
    reviewsCount: 38,
    isBestSeller: true
  },
  {
    id: 'p-wa-2',
    name: 'Earthy Abstract Textured Canvas',
    price: 4800,
    mrp: 6000,
    rating: 4.9,
    category: 'wall-art',
    imageType: 'abstract-canvas',
    shortDesc: 'A rich tactile abstract piece featuring warm, grounding terracotta and sand tones.',
    description: 'Add depth and warmth to your home with this exquisite textured canvas. Using heavy gesso build-up and a harmonious palette of clay, burnt sienna, and warm ivory, this piece captures the spirit of serene desert landscapes. Hand-finished details make each canvas uniquely yours.',
    dimensions: '60 x 90 cm (Single large canvas)',
    material: 'Primed heavy-duty cotton canvas, gallery-wrapped on premium pine-wood internal stretcher bars',
    finishes: ['Unframed Canvas', 'Oak Floater Frame', 'Champagne Gold Floater Frame'],
    reviewsCount: 24,
    isNewArrival: true
  },
  {
    id: 'p-wa-3',
    name: 'Boho Organic Cotton Macrame',
    price: 1800,
    mrp: 2500,
    rating: 4.6,
    category: 'wall-art',
    imageType: 'macrame',
    shortDesc: 'Intricately hand-knotted organic cotton tapestry hung on a natural driftwood rod.',
    description: 'Hand-crafted by local artisans in Gujarat, this macrame wall hanging brings cozy texture and bohemian character to any wall. Made with tightly twisted unbleached organic cotton cords and finished with an elegant layered fringe.',
    dimensions: '45 x 80 cm',
    material: '100% Organic Cotton Cord, Hand-gathered Natural Driftwood Rod',
    finishes: ['Natural Ivory', 'Soft Terracotta Accent', 'Sage Tinted'],
    reviewsCount: 15
  },
  {
    id: 'p-wa-4',
    name: 'Nordic Silent Oak Clock',
    price: 2900,
    mrp: 3800,
    rating: 4.7,
    category: 'wall-art',
    imageType: 'wall-clock',
    shortDesc: 'A silent, sweeping movement clock made of single-slab European white oak.',
    description: 'Never hear an annoying tick-tock again. This minimalist wall clock pairs functional precision with clean Nordic design. Features a beautiful, natural wood-grain face with subtle laser-engraved hour markers and elegant brushed brass hands.',
    dimensions: '30 cm Diameter, 3 cm Depth',
    material: 'Premium White Oak, Silent Quartz Sweeping Movement, Brushed Brass Hands',
    finishes: ['Natural Oak', 'Smoked Dark Oak'],
    reviewsCount: 42,
    isBestSeller: true
  },

  // --- MIRRORS ---
  {
    id: 'p-mi-1',
    name: 'Suryoday Rattan Sunburst Mirror',
    price: 3500,
    mrp: 4500,
    rating: 4.8,
    category: 'mirrors',
    imageType: 'sunburst-mirror',
    shortDesc: 'A captivating starburst accent mirror woven by hand from sustainable wild rattan.',
    description: 'Capture the radiant energy of the morning sun with the Suryoday Mirror. Every reed is carefully sorted, split, and woven by master artisans, creating a striking multi-dimensional frame that reflects natural light beautifully across the room.',
    dimensions: '60 cm Outer Diameter, 25 cm Inner Mirror glass',
    material: 'Sustainable Wild Rattan, Eco-friendly backing, high-reflection HD float glass',
    finishes: ['Natural Ochre', 'Warm Amber Brown'],
    reviewsCount: 56,
    isBestSeller: true
  },
  {
    id: 'p-mi-2',
    name: 'Dwara Arched Brass Floor Mirror',
    price: 12500,
    mrp: 16000,
    rating: 4.9,
    category: 'mirrors',
    imageType: 'floor-mirror',
    shortDesc: 'A grand arched full-length mirror bordered by an antique solid brass frame.',
    description: 'An architectural statement piece designed to create an illusion of space. The Dwara Floor Mirror features a classic cathedral-style arch wrapped in a heavy, polished brass frame. Can be leaned against the wall or securely wall-mounted.',
    dimensions: '180 x 60 cm',
    material: 'Solid Brass Structural Frame, Shatterproof HD Float Glass with Silver Coating',
    finishes: ['Antique Polished Brass', 'Brushed Gunmetal', 'Soft Rose Gold Frame'],
    reviewsCount: 19,
    isNewArrival: true
  },
  {
    id: 'p-mi-3',
    name: 'Darpan Arch Vanity Wall Mirror',
    price: 4200,
    mrp: 5500,
    rating: 4.7,
    category: 'mirrors',
    imageType: 'vanity-mirror',
    shortDesc: 'An elegant arched vanity mirror backed by solid walnut wood backing.',
    description: 'A timeless silhouette for your dresser or entryway console. The Darpan mirror balances a smooth, clean arch with a subtle solid walnut bottom shelf, providing a convenient rest for daily accessories.',
    dimensions: '50 x 80 cm',
    material: 'FSC-Certified Solid Walnut Wood, Distortion-Free Mirror Glass',
    finishes: ['Natural Walnut', 'Charcoal Oak'],
    reviewsCount: 31
  },

  // --- TABLE LAMPS ---
  {
    id: 'p-tl-1',
    name: 'Clay & Sand Ceramic Table Lamp',
    price: 3600,
    mrp: 4500,
    rating: 4.8,
    category: 'table-lamps',
    imageType: 'ceramic-lamp',
    shortDesc: 'A dual-textured ceramic base lamp with an unbleached coarse flax linen shade.',
    description: 'Form meets tactile beauty in the Clay & Sand Table Lamp. The base is half-glazed in a satin off-white while the bottom exposes the coarse, warm grain of natural stoneware clay. Casting a soft, cozy ambient glow ideal for bedside tables.',
    dimensions: '45 cm Total Height, 25 cm Shade Diameter',
    material: 'Stoneware Ceramic Base, Coarse Flax Linen Drum Shade, Brass fittings',
    finishes: ['Glazed Ivory', 'Earthy Ochre', 'Terracotta Speckle'],
    reviewsCount: 47,
    isBestSeller: true
  },
  {
    id: 'p-tl-2',
    name: 'Amber Glow Ribbed Glass Lamp',
    price: 3100,
    mrp: 3900,
    rating: 4.7,
    category: 'table-lamps',
    imageType: 'amber-lamp',
    shortDesc: 'A vintage-inspired hand-blown ribbed glass sphere emitting warm, diffused light.',
    description: 'Evoke retro nostalgia with a contemporary twist. The Amber Glow lamp features a spherical ribbed glass body colored in a soothing honey-amber hue. Mounted on a heavy brushed brass base plate and wired with an elegant fabric-wrapped cord.',
    dimensions: '30 cm Height, 28 cm Width',
    material: 'Hand-blown Ribbed Amber Glass, Polished Brass Base, Gold Fabric Cord',
    finishes: ['Honey Amber', 'Smoky Quartz', 'Clear Seeded Glass'],
    reviewsCount: 22,
    isNewArrival: true
  },

  // --- FLOOR LAMPS ---
  {
    id: 'p-fl-1',
    name: 'Kaman Arc Brass Floor Lamp',
    price: 7500,
    mrp: 9500,
    rating: 4.9,
    category: 'floor-lamps',
    imageType: 'arc-lamp',
    shortDesc: 'A dramatic, sweeping brass arc lamp supported by a heavy white marble base.',
    description: 'Perfect for positioning over a reading chair or sectional sofa. The Kaman Arc Floor Lamp delivers direct overhead lighting without requiring ceiling wiring. The graceful metallic curve is anchored securely by a solid slab of white Banswara marble.',
    dimensions: '190 cm Height, 120 cm Horizontal Reach',
    material: 'Antique Brass Plated Iron Arch, Solid White Banswara Marble Base, Off-White Linen Dome Shade',
    finishes: ['Satin Brass with White Marble', 'Matte Black with Nero Marquina Marble'],
    reviewsCount: 16,
    isBestSeller: true
  },
  {
    id: 'p-fl-2',
    name: 'Dand Tripod Oak Floor Lamp',
    price: 6200,
    mrp: 7800,
    rating: 4.8,
    category: 'floor-lamps',
    imageType: 'tripod-lamp',
    shortDesc: 'A classic three-legged floor lamp in solid oak with concealed cord routing.',
    description: 'Clean geometry meets warm timber. The Dand Tripod Floor Lamp features tapered legs of premium white oak that intersect elegantly. The power cord is subtly routed inside one of the hollowed legs for an ultra-tidy, cord-free aesthetic.',
    dimensions: '150 cm Height, 45 cm Leg Spread',
    material: 'Solid European White Oak, Natural Linen Drum Shade, Solid Brass Accents',
    finishes: ['Natural White Oak', 'Walnut Stain Oak'],
    reviewsCount: 29
  },

  // --- CUSHIONS ---
  {
    id: 'p-cu-1',
    name: 'Jaipur Block-Print Cotton Cover Set',
    price: 1600,
    mrp: 2200,
    rating: 4.8,
    category: 'cushions',
    imageType: 'blockprint-cushion',
    shortDesc: 'Set of two hand-block-printed indigo cushion covers made of premium slub cotton.',
    description: 'Honoring traditional craft, this set of cushion covers is hand-printed using carved teak blocks and eco-friendly dye. Features a beautiful repeating botanical vines motif on a heavily-textured cotton slub base that becomes softer with every wash.',
    dimensions: '45 x 45 cm (Pack of 2)',
    material: '100% Cotton Slub Fabric, Hidden YKK Metal Zipper',
    finishes: ['Indigo Blue', 'Terracotta Rust', 'Sage Olive'],
    reviewsCount: 64,
    isBestSeller: true
  },
  {
    id: 'p-cu-2',
    name: 'Niva Bouclé Textured Cushion Cover',
    price: 950,
    mrp: 1200,
    rating: 4.7,
    category: 'cushions',
    imageType: 'boucle-cushion',
    shortDesc: 'A heavily textured, loop-woven bouclé pillow cover in soft ivory cream.',
    description: 'Bring rich tactile warmth to your seating. The Niva bouclé cover is woven with dense loops of blended wool and cotton, creating a highly touchable, cloud-like surface that contrasts wonderfully with leather or smooth fabric sofas.',
    dimensions: '45 x 45 cm',
    material: '80% Natural Cotton, 20% Acrylic Bouclé yarn, Soft Canvas Backing',
    finishes: ['Cream Ivory', 'Oatmeal Beige', 'Soft Sage'],
    reviewsCount: 41,
    isNewArrival: true
  },

  // --- CANDLES & DIFFUSERS ---
  {
    id: 'p-ca-1',
    name: 'Narmada Sandalwood Soy Wax Candle',
    price: 1200,
    mrp: 1500,
    rating: 4.8,
    category: 'candles',
    imageType: 'candle',
    shortDesc: 'A double-wick soy wax candle capturing deep sandalwood and forest vetiver.',
    description: 'Evoke the quiet serenity of Indian riverfronts. Infused with pure essential oils of Mysore Sandalwood and earthy vetiver, this hand-poured soy wax candle burns cleanly, offering a slow-releasing, grounding fragrance that relieves stress.',
    dimensions: '300 g, 55 Hours Burn Time',
    material: '100% Eco-friendly Soy Wax, Lead-free Cotton Wicks, Amber Glass Jar with Tin Lid',
    finishes: ['Sandalwood & Jasmine', 'Amber & Vanilla', 'Cardamom & Oud'],
    reviewsCount: 88,
    isBestSeller: true
  },
  {
    id: 'p-ca-2',
    name: 'Vana Vetiver & Patchouli Reed Diffuser',
    price: 1600,
    mrp: 2100,
    rating: 4.7,
    category: 'candles',
    imageType: 'diffuser',
    shortDesc: 'An elegant ceramic reed diffuser featuring slow-wicking natural rattan reeds.',
    description: 'An elegant, flame-free way to keep your home continuously scented. The Vana diffuser uses thick, premium rattan reeds to draw up a calming, green blend of organic patchouli, cedar, and vetiver oils housed in a matte ceramic flask.',
    dimensions: '150 ml, Lasts 4-5 Months',
    material: 'Natural Essential Oil fragrance blend, High-porosity Rattan Reed Sticks, Matte Stoneware Flask',
    finishes: ['Matte Off-White Flask', 'Matte Terracotta Flask'],
    reviewsCount: 35
  },

  // --- ACCESSORIES ---
  {
    id: 'p-ac-1',
    name: 'Shala Marble Coasters & Tray Set',
    price: 2400,
    mrp: 3200,
    rating: 4.8,
    category: 'accessories',
    imageType: 'marble-tray',
    shortDesc: 'Hexagonal white Banswara marble coasters detailed with hand-cut brass inlays.',
    description: 'Elevate your hosting game. This set features four heavyweight hexagonal coasters carved out of pure white Rajasthan Banswara marble, each adorned with a fine line of hand-pressed solid brass. Nestled neatly in a coordinating rectangular marble serving tray.',
    dimensions: 'Coasters: 10 cm Wide; Tray: 25 x 15 cm',
    material: 'Genuine Banswara White Marble, Polished Lead-free Brass Inlay',
    finishes: ['White Banswara Marble', 'Green Forest Marble'],
    reviewsCount: 52,
    isBestSeller: true
  },
  {
    id: 'p-ac-2',
    name: 'Kosh Seagrass Storage Baskets',
    price: 2900,
    mrp: 3800,
    rating: 4.7,
    category: 'storage-baskets',
    imageType: 'baskets',
    shortDesc: 'A set of three nesting organizer baskets hand-woven from sun-dried wild seagrass.',
    description: 'The beautiful answer to clutter. These storage baskets are tightly hand-braided from resilient, wild seagrass, featuring warm natural variations in green and tan. Outfitted with strong, integrated handles for carrying laundry, blankets, or toys.',
    dimensions: 'S: 25x20 cm, M: 30x25 cm, L: 35x30 cm (Set of 3)',
    material: '100% Naturally-dried Seagrass, Internal reinforcing iron wire frame',
    finishes: ['Natural Seagrass', 'Two-tone Black/Natural'],
    reviewsCount: 73,
    isBestSeller: true
  }
];

export const REVIEWS = [
  {
    id: 'r1',
    author: 'Ananya Sharma, Mumbai',
    rating: 5,
    date: '2026-05-12',
    comment: 'The Botanical Line Art Set is stunning! The oak frames feel heavy and authentic, and the paper has a lovely matte grain. Packing was incredibly secure.'
  },
  {
    id: 'r2',
    author: 'Vikram Aditya, Bengaluru',
    rating: 5,
    date: '2026-06-04',
    comment: 'Sandalwood Soy candle smells heavenly. It is subtle and not artificial. It lit up our entire living room with a cozy warm glow. Will definitely buy more.'
  },
  {
    id: 'r3',
    author: 'Meera Deshmukh, Pune',
    rating: 4,
    date: '2026-06-20',
    comment: 'The Sand & Clay table lamp base is absolutely beautiful, very heavy and earthy. Gave four stars instead of five only because delivery took six days to Pune, but worth the wait.'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: '5 Minimalist Elements to Ground Your Living Room',
    excerpt: 'How to use warm tones, organic materials, and intentional negative space to create a peaceful sanctuary.',
    date: 'June 18, 2026',
    readTime: '4 min read',
    category: 'Interior Design',
    imageType: 'blog-living'
  },
  {
    id: 'b2',
    title: 'The Art of Lighting: Ambient vs. Task vs. Accent',
    excerpt: 'Demystifying floor lamps, bedside touch lamps, and task lights to craft the perfect evening layer.',
    date: 'July 02, 2026',
    readTime: '6 min read',
    category: 'Home Lighting',
    imageType: 'blog-lighting'
  },
  {
    id: 'b3',
    title: 'Why Organic Materials Make a House Feel Like a Home',
    excerpt: 'From hand-woven seagrass baskets to rattan mirrors, explore how natural materials elevate your sensory experience.',
    date: 'July 12, 2026',
    readTime: '5 min read',
    category: 'Styling Tips',
    imageType: 'blog-organic'
  }
];

export const TESTIMONIALS = [
  {
    quote: "AuraNest has completely redefined how we shop for our flat in Bengaluru. The designs feel so premium and thoughtful, yet completely reasonable in price.",
    author: "Rohan & Priyal K., Bengaluru",
    role: "New Apartment Owners"
  },
  {
    quote: "The quality of the brass floor mirror is exceptional. It stands solid in our hallway and receives compliments from every single guest.",
    author: "Malini Sen, Mumbai",
    role: "Interior Stylist"
  },
  {
    quote: "I love their commitment to natural materials. No smelly plastics — just authentic solid woods, beautiful ceramics, and pure flax linens.",
    author: "Kabir Mehta, Delhi",
    role: "Architect"
  },
  {
    quote: "Exquisite block prints and organic textures. AuraNest brings that warm, earthy, yet editorial look that is usually so hard to source in India.",
    author: "Siddhi Deshpande, Pune",
    role: "Interior Enthusiast"
  }
];
