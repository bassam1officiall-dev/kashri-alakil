import { AnimatePresence, motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { RESTAURANT } from '../data/restaurant';

interface PhoneSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhoneSheet({ isOpen, onClose }: PhoneSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="phone-sheet-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1412]/55"
          />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md border-t border-[#E6DED6] bg-[#FDFBF7] p-4 sm:border"
          >
            <div className="flex items-center justify-between border-b border-[#E6DED6] pb-3">
              <div>
                <h2
                  id="phone-sheet-title"
                  className="font-display text-base font-extrabold text-[#1A1412]"
                >
                  أرقام الطلب والتوصيل المباشر
                </h2>
                <p className="text-xs text-[#5A4E49]">
                  فرع الحوامدية — شارع كوبري الحوامدية
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="inline-flex h-[44px] w-[44px] items-center justify-center text-[#1A1412] hover:text-[#8F1513]"
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {RESTAURANT.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex min-h-[48px] items-center justify-between border border-[#E6DED6] bg-white px-4 py-2.5 text-[#1A1412] transition-colors hover:border-[#C41E1C] hover:text-[#8F1513]"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#5A4E49]">
                    <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                    اتصال مباشر
                  </span>
                  <span
                    dir="ltr"
                    className="font-display text-base font-extrabold tabular-nums"
                  >
                    {phone}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
