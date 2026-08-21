import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutTab() {
  const { t } = useLanguage();

  return (
    <div className={CARD_SURFACE_CLASS} style={{ borderRadius: "18px", padding: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
        <span style={{ width: "34px", height: "34px", borderRadius: "50%", border: `2px solid ${COLORS.accentBright}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.accentBright }} />
        </span>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 800 }}>{t.resume.aboutHeading}</h2>
      </div>
      <div style={{ height: "1px", background: COLORS.border, marginBottom: "24px" }} />
      <p style={{ color: COLORS.textMuted, fontSize: "15px", lineHeight: "1.9", marginBottom: "32px" }}>
        {t.resume.aboutText}
      </p>
      <div className="fields-grid">
        {t.resume.profileFields.map(([label, value]) => (
          <div key={label} style={{ borderLeft: `2px solid ${COLORS.accent}50`, paddingLeft: "14px" }}>
            <p style={{ color: COLORS.accentBright, fontSize: "10.5px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.5px" }}>{label}</p>
            <p style={{ color: COLORS.text, fontSize: "14.5px", fontWeight: 500 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
