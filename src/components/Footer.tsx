import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import { RESTAURANT } from '../data/restaurant';

interface FooterProps {
  onOpenPhoneSheet: () => void;
}

export function Footer({ onOpenPhoneSheet }: FooterProps) {
  return (
    <footer className="mt-10 border-t border-[#E6DED6] bg-[#1E1311] text-[#FAF7F4]">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-5">
        <div>
          <h2 className="font-display text-lg font-extrabold text-white">
            {RESTAURANT.name}
          </h2>
          <p className="mt-0.5 text-xs text-[#D6CBC2]">{RESTAURANT.tagline}</p>
        </div>

        <div className="space-y-2.5 text-xs text-[#D6CBC2]">
          <div className="flex items-start gap-2">
            <MapPin
              size={15}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-[#E8A317]"
              aria-hidden="true"
            />
            <span>{RESTAURANT.address}</span>
          </div>

          <div className="flex items-start gap-2">
            <Clock
              size={15}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-[#E8A317]"
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <p>{RESTAURANT.workingHoursSummary}</p>
              <p>{RESTAURANT.fridayHoursSummary}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#FAF7F4]/15 pt-4 text-xs">
          <button
            type="button"
            onClick={onOpenPhoneSheet}
            className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#FAF7F4]/25 px-3 py-1.5 font-semibold text-[#FAF7F4] hover:border-[#E8A317]"
          >
            <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
            <span>تواصل معنا</span>
          </button>

          <a
            href={RESTAURANT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 text-[#D6CBC2] underline underline-offset-4 hover:text-white"
          >
            <span>الصفحة الرسمية على فيسبوك</span>
            <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
