"use client";

import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";
import { useLanguage } from "../../context/LanguageContext";
import { translationsResume } from "../../data/translations.resume";

export default function AboutTab() {
  const { lang } = useLanguage();
  const t = translationsResume[lang];

  return (
    <div className={CARD_SURFACE_CLASS} style={{ borderRadius: "18px", padding: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
        <span style={{ width: "34px", height: "34px", borderRadius: "50%", border: `2px solid ${COLORS.accentBright}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.accentBright }} />
        </span>
        <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "24px", fontWeight: 800 }}>{t.aboutHeading}</h2>
      </div>
      <div style={{ height: "1px", background: COLORS.border, marginBottom: "24px" }} />
      <p style={{ color: COLORS.textMuted, fontSize: "15px", lineHeight: "1.9", marginBottom: "32px" }}>
        {t.aboutText}
      </p>
      <div className="fields-grid">
        {t.profileFields.map(([label, value], i) => (
          <div key={i} style={{ borderLeft: `2px solid ${COLORS.accent}50`, paddingLeft: "14px" }}>
            <p style={{ color: COLORS.accentBright, fontSize: "10.5px", fontFamily: "var(--font-jbmono), monospace", marginBottom: "6px", letterSpacing: "0.5px" }}>{label}</p>
            <p style={{ color: COLORS.text, fontSize: "14.5px", fontWeight: 500 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
