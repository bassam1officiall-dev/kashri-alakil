import { useState } from 'react';

interface BrandLogoProps {
  size?: number;
}

/**
 * Displays the clean circular Koshry Elakel badge from public/logo.png
 * with a crisp vector emblem fallback so there is never a broken image.
 */
export function BrandLogo({ size = 52 }: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <div
        className="shrink-0 rounded-full border-2 border-[#C41E1C] bg-white p-0.5 overflow-hidden flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.png"
          alt="شعار كشري الأكيل"
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="شعار كشري الأكيل"
      className="shrink-0"
    >
      <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#C41E1C" strokeWidth="2.5" />
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke="#E8A317"
        strokeWidth="1.75"
        strokeDasharray="4 2"
      />
      <path
        d="M23 25c0-3 2.5-5 5.5-5 1.2-1.8 5.8-1.8 7 0 3 0 5.5 2 5.5 5 0 1.8-1 3.3-2.5 4v3H25.5v-3c-1.5-.7-2.5-2.2-2.5-4z"
        fill="none"
        stroke="#1A1412"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fontFamily="Cairo, sans-serif"
        fontWeight="800"
        fontSize="13.5"
        fill="#C41E1C"
      >
        الأكيل
      </text>
    </svg>
  );
}
