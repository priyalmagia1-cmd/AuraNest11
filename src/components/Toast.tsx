import { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { key?: string; toast: ToastMessage; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bgStyle = 
    toast.type === 'success' 
      ? 'bg-sage text-charcoal' 
      : toast.type === 'error'
        ? 'bg-terracotta text-ivory'
        : 'bg-beige text-charcoal';

  const Icon = toast.type === 'success' ? CheckCircle : Info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      layout
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-lg border border-charcoal/10 ${bgStyle} font-sans`}
      id={`toast-${toast.id}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className="shrink-0" />
        <span className="text-sm font-medium">{toast.text}</span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-current hover:opacity-75 transition-opacity focus:outline-none p-1 rounded-full hover:bg-charcoal/5"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
