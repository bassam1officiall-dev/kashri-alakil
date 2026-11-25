import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Minus, Phone, Plus, Trash2, X } from 'lucide-react';
import { MENU_ITEMS, UPSELL_SUGGESTIONS } from '../data/menu';
import { RESTAURANT } from '../data/restaurant';
import {
  buildWhatsAppUrl,
  calculateCartTotals,
  CartEntry,
  CheckoutDetails,
  formatEgp,
} from '../utils/cart';

interface CheckoutSheetProps {
  isOpen: boolean;
  entries: readonly CartEntry[];
  onClose: () => void;
  onIncrementKey: (cartKey: string) => void;
  onDecrementKey: (cartKey: string) => void;
  onQuickAddUpsell: (menuItemId: string, variantId?: string) => void;
  onClearCart: () => void;
}

export function CheckoutSheet({
  isOpen,
  entries,
  onClose,
  onIncrementKey,
  onDecrementKey,
  onQuickAddUpsell,
  onClearCart,
}: CheckoutSheetProps) {
  const [details, setDetails] = useState<CheckoutDetails>({
    orderType: 'delivery',
    customerName: '',
    address: '',
    notes: '',
  });
  const [showPhones, setShowPhones] = useState(false);

  const { totalCount, subtotal } = calculateCartTotals(entries);

  // Show the smart upsell strip if the user hasn't added any 8 EGP add-on or Rice Pudding yet
  const hasAddonOrDessert = entries.some((entry) => {
    const menuItem = MENU_ITEMS.find((m) => m.id === entry.itemId);
    return (
      menuItem?.categoryId === 'addons' ||
      entry.itemId === 'dessert-rice-plain' ||
      entry.itemId === 'dessert-rice-oven'
    );
  });

  const whatsappUrl = buildWhatsAppUrl(entries, details);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-sheet-title"
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
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 36 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col bg-[#FDFBF7] border-t border-[#E6DED6] sm:border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E6DED6] bg-white px-4 py-3">
              <div>
                <h2
                  id="checkout-sheet-title"
                  className="font-display text-lg font-extrabold text-[#1A1412]"
                >
                  مراجعة الطلب
                </h2>
                <p className="text-xs text-[#5A4E49] tabular-nums">
                  {totalCount} {totalCount === 1 ? 'صنف' : 'أصناف'} · الإجمالي{' '}
                  {formatEgp(subtotal)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {entries.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearCart}
                    aria-label="مسح السلة"
                    className="inline-flex h-[44px] w-[44px] items-center justify-center text-[#5A4E49] hover:text-[#8F1513]"
                  >
                    <Trash2 size={17} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="إغلاق"
                  className="inline-flex h-[44px] w-[44px] items-center justify-center text-[#1A1412] hover:text-[#8F1513]"
                >
                  <X size={20} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {entries.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-display text-base font-bold text-[#1A1412]">
                    السلة فارغة حالياً
                  </p>
                  <p className="mt-1 text-sm text-[#5A4E49]">
                    اختر من المنيو لإضافة الأصناف إلى طلبك.
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected items */}
                  <div className="border border-[#E6DED6] bg-white divide-y divide-[#E6DED6]">
                    {entries.map((entry) => (
                      <div
                        key={entry.key}
                        className="flex items-center justify-between gap-3 px-3 py-2.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-sm font-bold text-[#1A1412] truncate">
                            {entry.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-[#5A4E49]">
                            {entry.variantLabel && (
                              <span>{entry.variantLabel}</span>
                            )}
                            <span className="tabular-nums">
                              {formatEgp(entry.unitPrice * entry.quantity)}
                            </span>
                          </div>
                        </div>

                        <div className="inline-flex items-center border border-[#E6DED6] bg-[#FDFBF7]">
                          <button
                            type="button"
                            onClick={() => onDecrementKey(entry.key)}
                            aria-label={`إنقاص ${entry.name}`}
                            className="inline-flex h-[40px] w-[38px] items-center justify-center text-[#1A1412]"
                          >
                            <Minus size={14} strokeWidth={1.75} aria-hidden="true" />
                          </button>
                          <span className="min-w-[24px] text-center font-display text-sm font-bold tabular-nums">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrementKey(entry.key)}
                            aria-label={`زيادة ${entry.name}`}
                            className="inline-flex h-[40px] w-[38px] items-center justify-center text-[#8F1513]"
                          >
                            <Plus size={14} strokeWidth={1.75} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Smart Upsell Strip */}
                  {!hasAddonOrDessert && (
                    <div>
                      <p className="mb-2 font-display text-xs font-bold text-[#5A4E49]">
                        كمّل طبقك
                      </p>
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        {UPSELL_SUGGESTIONS.map((upsell) => (
                          <button
                            key={upsell.id}
                            type="button"
                            onClick={() =>
                              onQuickAddUpsell(upsell.menuItemId, upsell.variantId)
                            }
                            className="shrink-0 inline-flex min-h-[40px] items-center gap-1.5 border border-[#E6DED6] bg-white px-3 py-1.5 text-xs font-semibold text-[#1A1412] transition-colors hover:border-[#C41E1C] hover:text-[#8F1513]"
                          >
                            <Plus size={13} strokeWidth={1.75} aria-hidden="true" />
                            <span>{upsell.label}</span>
                            <span className="tabular-nums text-[#5A4E49]">
                              {formatEgp(upsell.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Type Toggle */}
                  <div>
                    <p className="mb-2 font-display text-xs font-bold text-[#5A4E49]">
                      طريقة الاستلام
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDetails((prev) => ({
                            ...prev,
                            orderType: 'delivery',
                          }))
                        }
                        aria-pressed={details.orderType === 'delivery'}
                        className={`min-h-[44px] border px-3 py-2 text-sm font-display font-bold transition-colors ${
                          details.orderType === 'delivery'
                            ? 'border-[#1A1412] bg-[#1A1412] text-[#FAF7F4]'
                            : 'border-[#E6DED6] bg-white text-[#5A4E49]'
                        }`}
                      >
                        توصيل (ديليفري)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDetails((prev) => ({
                            ...prev,
                            orderType: 'pickup',
                          }))
                        }
                        aria-pressed={details.orderType === 'pickup'}
                        className={`min-h-[44px] border px-3 py-2 text-sm font-display font-bold transition-colors ${
                          details.orderType === 'pickup'
                            ? 'border-[#1A1412] bg-[#1A1412] text-[#FAF7F4]'
                            : 'border-[#E6DED6] bg-white text-[#5A4E49]'
                        }`}
                      >
                        استلام من الفرع
                      </button>
                    </div>
                  </div>

                  {/* Minimal Optional Fields */}
                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="customer-name"
                        className="mb-1 block text-xs font-semibold text-[#5A4E49]"
                      >
                        الاسم (اختياري)
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        value={details.customerName}
                        onChange={(e) =>
                          setDetails((prev) => ({
                            ...prev,
                            customerName: e.target.value,
                          }))
                        }
                        placeholder="مثال: أحمد محمد"
                        className="w-full min-h-[44px] border border-[#E6DED6] bg-white px-3 py-2 text-sm text-[#1A1412] placeholder:text-[#5A4E49]/60 focus:border-[#1A1412] focus:outline-none"
                      />
                    </div>

                    {details.orderType === 'delivery' && (
                      <div>
                        <label
                          htmlFor="customer-address"
                          className="mb-1 block text-xs font-semibold text-[#5A4E49]"
                        >
                          العنوان بالتفصيل (اختياري)
                        </label>
                        <input
                          id="customer-address"
                          type="text"
                          value={details.address}
                          onChange={(e) =>
                            setDetails((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          placeholder="الشارع، رقم العقار، علامة مميزة"
                          className="w-full min-h-[44px] border border-[#E6DED6] bg-white px-3 py-2 text-sm text-[#1A1412] placeholder:text-[#5A4E49]/60 focus:border-[#1A1412] focus:outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="order-notes"
                        className="mb-1 block text-xs font-semibold text-[#5A4E49]"
                      >
                        ملاحظات الطلب (اختياري)
                      </label>
                      <input
                        id="order-notes"
                        type="text"
                        value={details.notes}
                        onChange={(e) =>
                          setDetails((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        placeholder="شطة زيادة / بدون بصل / دقة زيادة"
                        className="w-full min-h-[44px] border border-[#E6DED6] bg-white px-3 py-2 text-sm text-[#1A1412] placeholder:text-[#5A4E49]/60 focus:border-[#1A1412] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer CTAs */}
            {entries.length > 0 && (
              <div className="border-t border-[#E6DED6] bg-white px-4 py-3 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full min-h-[48px] items-center justify-center gap-2 bg-[#C41E1C] px-4 py-3 font-display text-sm font-extrabold text-white transition-colors hover:bg-[#8F1513]"
                >
                  <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    إرسال الطلب عبر واتساب ({formatEgp(subtotal)})
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowPhones((prev) => !prev)}
                  className="flex w-full min-h-[44px] items-center justify-center gap-1.5 border border-[#E6DED6] bg-[#FDFBF7] px-4 py-2 text-xs font-bold text-[#1A1412] hover:border-[#1A1412]"
                >
                  <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span>أو اطلب بالتليفون</span>
                </button>

                {showPhones && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {RESTAURANT.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        dir="ltr"
                        className="flex min-h-[44px] items-center justify-center border border-[#E6DED6] bg-white px-2 py-2 font-display text-xs font-bold text-[#1A1412] tabular-nums hover:border-[#C41E1C] hover:text-[#8F1513]"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
