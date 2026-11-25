import { Phone, Star } from 'lucide-react';
import { getCairoOpenStatus, RESTAURANT } from '../data/restaurant';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenPhoneSheet: () => void;
}

export function Header({ onOpenPhoneSheet }: HeaderProps) {
  const status = getCairoOpenStatus();

  return (
    <header className="border-b border-[#E6DED6] bg-[#FDFBF7]">
      <div className="mx-auto max-w-2xl px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <BrandLogo size={52} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-xl font-extrabold tracking-tight text-[#1A1412] leading-tight">
                  {RESTAURANT.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A4E49]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      status.isOpen ? 'bg-emerald-600' : 'bg-[#8F1513]'
                    }`}
                    aria-hidden="true"
                  />
                  {status.label}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#5A4E49] truncate">
                {RESTAURANT.tagline}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-[#5A4E49]">
                <span className="inline-flex items-center gap-1 font-semibold text-[#1A1412] tabular-nums">
                  <Star
                    size={13}
                    strokeWidth={1.75}
                    className="fill-[#E8A317] text-[#E8A317]"
                    aria-hidden="true"
                  />
                  {RESTAURANT.rating.score}
                </span>
                <span className="text-[#E6DED6]" aria-hidden="true">
                  |
                </span>
                <span className="tabular-nums">{RESTAURANT.rating.count} تقييم</span>
                <span className="text-[#E6DED6]" aria-hidden="true">
                  |
                </span>
                <span className="truncate">الحوامدية</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPhoneSheet}
            className="shrink-0 inline-flex min-h-[44px] items-center gap-1.5 border border-[#E6DED6] bg-white px-3 py-2 text-xs font-semibold text-[#1A1412] transition-colors hover:border-[#C41E1C] hover:text-[#8F1513] active:bg-[#FDFBF7]"
          >
            <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
            <span>اتصل الآن</span>
          </button>
        </div>
      </div>
    </header>
  );
}
