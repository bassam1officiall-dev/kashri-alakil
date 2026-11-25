/**
 * Primary WhatsApp number in international format without '+'.
 * Swap this single constant to update the order destination across the app.
 */
export const WHATSAPP_NUMBER = '201140740408';

export interface RestaurantInfo {
  name: string;
  englishName: string;
  tagline: string;
  address: string;
  workingHoursSummary: string;
  fridayHoursSummary: string;
  phones: readonly string[];
  facebookUrl: string;
  rating: {
    score: string;
    count: number;
  };
}

export const RESTAURANT: RestaurantInfo = {
  name: 'كشري الأكيل',
  englishName: 'Koshry Elakel',
  tagline: 'طبق السعادة — ألذ كشري في مصر',
  address: 'الحوامدية، شارع كوبري الحوامدية، بجانب قسم الشرطة، الجيزة',
  workingHoursSummary: 'السبت – الخميس: 12:00 ظهراً – 12:00 منتصف الليل',
  fridayHoursSummary: 'الجمعة: 2:00 ظهراً – 12:00 منتصف الليل',
  phones: ['01140740408', '01140640408', '01024411149', '01101118585'],
  facebookUrl: 'https://www.facebook.com/alakeel2018',
  rating: {
    score: '4.1',
    count: 786,
  },
};

export interface LiveOpenStatus {
  isOpen: boolean;
  label: string;
}

/**
 * Computes whether the Al-Hawamdiya branch is currently open
 * using live Africa/Cairo wall-clock time.
 */
export function getCairoOpenStatus(now: Date = new Date()): LiveOpenStatus {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Cairo',
      weekday: 'short',
      hour: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);

    const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Sat';
    const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '12';
    const hour = Number.parseInt(hourStr, 10);

    const openHour = weekday === 'Fri' ? 14 : 12;
    const isOpen = Number.isFinite(hour) && hour >= openHour && hour < 24;

    return {
      isOpen,
      label: isOpen ? 'مفتوح الآن' : 'مغلق حالياً',
    };
  } catch {
    return {
      isOpen: true,
      label: 'مفتوح الآن',
    };
  }
}
