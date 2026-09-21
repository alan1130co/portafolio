import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";

export default function ContactCard({ c, copy }) {
  return (
    <a href={c.href} target="_blank" rel="noreferrer" className={CARD_SURFACE_CLASS}
      style={{ borderRadius: "16px", padding: "28px", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "170px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span aria-hidden="true" style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "24px", fontWeight: 800, color: COLORS.borderStrong }}>{c.num}</span>
        <span style={{ fontFamily: "var(--font-jbmono), monospace", fontSize: "10px", color: COLORS.accentBright, border: `1px solid ${COLORS.accent}40`, borderRadius: "6px", padding: "3px 8px" }}>{copy.action}</span>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-jbmono), monospace", fontSize: "11px", color: COLORS.textFaint, marginBottom: "6px" }}>{copy.label}</div>
        <div style={{ color: COLORS.text, fontSize: "14px", fontFamily: "var(--font-inter), sans-serif", fontWeight: 600, wordBreak: "break-all" }}>{c.value}</div>
      </div>
    </a>
  );
}
