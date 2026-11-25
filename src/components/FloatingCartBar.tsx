import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { formatEgp } from '../utils/cart';

interface FloatingCartBarProps {
  totalCount: number;
  subtotal: number;
  onOpenCheckout: () => void;
}

export function FloatingCartBar({
  totalCount,
  subtotal,
  onOpenCheckout,
}: FloatingCartBarProps) {
  return (
    <AnimatePresence>
      {totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pointer-events-none"
        >
          <div className="mx-auto max-w-2xl pointer-events-auto">
            <button
              type="button"
              onClick={onOpenCheckout}
              className="flex w-full min-h-[54px] items-center justify-between gap-4 bg-[#1E1311] px-4 py-3 text-[#FAF7F4] transition-transform active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#C41E1C] text-white">
                  <ShoppingBag size={16} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="text-right">
                  <span className="block text-xs text-[#D6CBC2] tabular-nums">
                    {totalCount} {totalCount === 1 ? 'صنف' : 'أصناف'} في السلة
                  </span>
                  <span className="block font-display text-base font-extrabold tabular-nums text-white">
                    {formatEgp(subtotal)}
                  </span>
                </div>
              </div>

              <span className="shrink-0 border border-[#FAF7F4]/30 px-3.5 py-2 font-display text-sm font-bold text-[#FAF7F4]">
                مراجعة الطلب
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
