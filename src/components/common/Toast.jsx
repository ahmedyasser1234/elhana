import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 max-w-md bg-stone-900 text-white p-4 rounded-2xl shadow-2xl border border-[#D4AF37]/30 flex items-center gap-3 backdrop-blur-lg"
      >
        {toast.type === 'error' ? (
          <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0" />
        )}
        <p className="text-sm font-medium text-stone-100 flex-1">{toast.message}</p>
        <button onClick={hideToast} className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
