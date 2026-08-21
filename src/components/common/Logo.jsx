import { COLORS } from "../../theme/colors";

export default function Logo({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="logoRing" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={COLORS.accentPale} />
          <stop offset="55%" stopColor={COLORS.accent} />
          <stop offset="100%" stopColor={COLORS.accentBright} />
        </linearGradient>
        <linearGradient id="logoMark" x1="12" y1="28" x2="28" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={COLORS.accentBright} />
          <stop offset="100%" stopColor={COLORS.accentPale} />
        </linearGradient>
      </defs>

      <circle cx="20" cy="20" r="17.5" stroke="url(#logoRing)" strokeWidth="2" />

      {/* circuit-style connector ticks around the ring */}
      <line x1="20" y1="0.5" x2="20" y2="3.5" stroke={COLORS.accentPale} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="35.8" y1="27" x2="33.3" y2="25.5" stroke={COLORS.accentPale} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="4.2" y1="27" x2="6.7" y2="25.5" stroke={COLORS.accentPale} strokeWidth="1.6" strokeLinecap="round" />

      {/* stylized "A" monogram */}
      <path d="M13 28 L20 11 L27 28" stroke="url(#logoMark)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.3 22 L23.7 22" stroke="url(#logoMark)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
