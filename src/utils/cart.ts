import { MenuItem } from '../data/menu';
import { RESTAURANT, WHATSAPP_NUMBER } from '../data/restaurant';

export interface CartEntry {
  key: string;
  itemId: string;
  name: string;
  variantId?: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
}

export type OrderType = 'delivery' | 'pickup';

export interface CheckoutDetails {
  orderType: OrderType;
  customerName: string;
  address: string;
  notes: string;
}

export function buildCartKey(itemId: string, variantId?: string): string {
  return variantId ? `${itemId}__${variantId}` : itemId;
}

export function getEffectiveVariant(item: MenuItem, selectedVariantId?: string) {
  if (!item.variants || item.variants.length === 0) {
    return {
      variantId: undefined,
      variantLabel: undefined,
      unitPrice: item.price,
    };
  }
  const found =
    item.variants.find((v) => v.id === selectedVariantId) ?? item.variants[0];
  return {
    variantId: found.id,
    variantLabel: found.label,
    unitPrice: found.price,
  };
}

export function formatEgp(amount: number): string {
  return `${amount} ج.م`;
}

export function calculateCartTotals(entries: readonly CartEntry[]) {
  let totalCount = 0;
  let subtotal = 0;
  for (const entry of entries) {
    totalCount += entry.quantity;
    subtotal += entry.unitPrice * entry.quantity;
  }
  return { totalCount, subtotal };
}

export function buildWhatsAppMessage(
  entries: readonly CartEntry[],
  details: CheckoutDetails
): string {
  const { subtotal } = calculateCartTotals(entries);
  const lines: string[] = [
    `طلب جديد من منيو ${RESTAURANT.name}`,
    `نوع الطلب: ${details.orderType === 'delivery' ? 'توصيل (ديليفري)' : 'استلام من الفرع'}`,
    '',
    'الأصناف:',
  ];

  for (const entry of entries) {
    const title = entry.variantLabel
      ? `${entry.name} (${entry.variantLabel})`
      : entry.name;
    const lineTotal = entry.unitPrice * entry.quantity;
    lines.push(`- ${entry.quantity} × ${title} = ${lineTotal} ج.م`);
  }

  lines.push('');
  lines.push(`الإجمالي: ${subtotal} ج.م`);

  const trimmedName = details.customerName.trim();
  const trimmedAddress = details.address.trim();
  const trimmedNotes = details.notes.trim();

  if (trimmedName) {
    lines.push(`الاسم: ${trimmedName}`);
  }
  if (details.orderType === 'delivery' && trimmedAddress) {
    lines.push(`العنوان: ${trimmedAddress}`);
  }
  if (trimmedNotes) {
    lines.push(`ملاحظات: ${trimmedNotes}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(
  entries: readonly CartEntry[],
  details: CheckoutDetails
): string {
  const message = buildWhatsAppMessage(entries, details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
