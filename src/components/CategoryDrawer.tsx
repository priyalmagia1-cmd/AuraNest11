import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
}

const CATEGORIES_LIST = [
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

export function CategoryDrawer({
  isOpen,
  onClose,
  onSelectCategory
}: CategoryDrawerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Easing consistent with cart drawer
  const drawerTransition = shouldReduceMotion 
    ? { duration: 0.05 } 
    : { type: 'spring', damping: 26, stiffness: 190 };

  const backdropTransition = shouldReduceMotion 
    ? { duration: 0.05 } 
    : { duration: 0.35, ease: 'easeInOut' };

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
            transition={backdropTransition}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            id="category-drawer-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={drawerTransition}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-[400px] bg-ivory shadow-2xl flex flex-col border-l border-[#E8DCCB]/40"
            id="category-drawer-container"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E8DCCB]/50 flex items-center justify-between bg-white shrink-0">
              <h2 className="font-serif text-xl font-extrabold text-charcoal">Shop by Category</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#F8F6F2] text-charcoal/70 hover:text-charcoal transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta"
                aria-label="Close category drawer"
                id="close-category-drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category List */}
            <nav className="flex-grow overflow-y-auto p-5 space-y-2.5 font-sans animate-fadeIn" id="category-drawer-nav">
              {CATEGORIES_LIST.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 10 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between text-left text-sm font-medium text-charcoal py-3.5 px-4 rounded-xl transition-all hover:bg-beige/30 hover:translate-x-2 group focus:outline-none focus:ring-1 focus:ring-terracotta cursor-pointer"
                  id={`drawer-category-${cat.id}`}
                >
                  <span className="font-sans text-charcoal/90 group-hover:text-terracotta group-hover:font-semibold transition-colors duration-200">
                    {cat.name}
                  </span>
                  <ArrowRight 
                    size={16} 
                    className="text-charcoal/30 group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-200" 
                  />
                </motion.button>
              ))}
            </nav>

            {/* Drawer Footer decoration */}
            <div className="p-6 bg-white border-t border-[#E8DCCB]/40 text-center shrink-0">
              <span className="text-[10px] text-terracotta uppercase tracking-widest font-mono font-bold block mb-1">AuraNest Interiors</span>
              <p className="text-[11px] text-charcoal/50 font-serif italic">"Elevating your home's natural essence."</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
