import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { MenuItem } from '../data/menu';
import {
  buildCartKey,
  formatEgp,
  getEffectiveVariant,
} from '../utils/cart';

interface MenuItemRowProps {
  item: MenuItem;
  getQuantity: (cartKey: string) => number;
  onAdd: (item: MenuItem, variantId?: string) => void;
  onDecrement: (cartKey: string) => void;
}

export function MenuItemRow({
  item,
  getQuantity,
  onAdd,
  onDecrement,
}: MenuItemRowProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    item.variants?.[0]?.id
  );

  const effective = getEffectiveVariant(item, selectedVariantId);
  const cartKey = buildCartKey(item.id, effective.variantId);
  const quantity = getQuantity(cartKey);

  return (
    <article className="border-b border-[#E6DED6] py-3.5 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-[15px] font-bold text-[#1A1412] leading-snug">
              {item.name}
            </h3>
            {item.tag && (
              <span className="border border-[#C41E1C]/40 bg-[#FDFBF7] px-2 py-0.5 text-[11px] font-semibold text-[#8F1513]">
                {item.tag}
              </span>
            )}
          </div>

          {item.description && (
            <p className="mt-0.5 text-xs leading-relaxed text-[#5A4E49] line-clamp-1">
              {item.description}
            </p>
          )}

          {item.variants && item.variants.length > 0 && (
            <div
              className="mt-2.5 inline-flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label={`خيارات ${item.name}`}
            >
              {item.variants.map((variant) => {
                const isSelected = variant.id === effective.variantId;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    aria-pressed={isSelected}
                    className={`min-h-[34px] border px-2.5 py-1 text-xs font-medium transition-colors ${
                      isSelected
                        ? 'border-[#1A1412] bg-[#1A1412] text-[#FAF7F4]'
                        : 'border-[#E6DED6] bg-white text-[#5A4E49] hover:border-[#1A1412] hover:text-[#1A1412]'
                    }`}
                  >
                    {variant.label}
                    {item.variantKind === 'mozzarella' &&
                      variant.id === 'mozzarella' && (
                        <span className="mr-1 tabular-nums text-[11px] opacity-85">
                          (+25 ج.م)
                        </span>
                      )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="shrink-0 flex flex-col items-end gap-2">
          <span className="font-display text-[15px] font-extrabold text-[#1A1412] tabular-nums whitespace-nowrap">
            {formatEgp(effective.unitPrice)}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(item, effective.variantId)}
              aria-label={`إضافة ${item.name}`}
              className="inline-flex h-[44px] w-[44px] items-center justify-center border border-[#E6DED6] bg-white text-[#8F1513] transition-colors hover:border-[#C41E1C] hover:bg-[#C41E1C] hover:text-white active:scale-95"
            >
              <Plus size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          ) : (
            <div className="inline-flex items-center border border-[#1A1412] bg-white">
              <button
                type="button"
                onClick={() => onDecrement(cartKey)}
                aria-label={`إنقاص كمية ${item.name}`}
                className="inline-flex h-[44px] w-[40px] items-center justify-center text-[#1A1412] transition-colors hover:bg-[#FDFBF7] active:bg-[#E6DED6]/40"
              >
                <Minus size={15} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <span
                className="min-w-[26px] text-center font-display text-sm font-bold text-[#1A1412] tabular-nums"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onAdd(item, effective.variantId)}
                aria-label={`زيادة كمية ${item.name}`}
                className="inline-flex h-[44px] w-[40px] items-center justify-center bg-[#C41E1C] text-white transition-colors hover:bg-[#8F1513] active:opacity-90"
              >
                <Plus size={15} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
