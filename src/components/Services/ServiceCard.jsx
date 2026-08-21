import { useState } from "react";
import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";
import { useLanguage } from "../../context/LanguageContext";
import StatusDot from "../common/StatusDot";

export default function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className={CARD_SURFACE_CLASS}
      style={{ position: "relative", borderRadius: "16px", padding: "30px 32px" }}>
      <span style={{ position: "absolute", bottom: "12px", right: "12px", width: "16px", height: "16px", borderBottom: `2px solid ${COLORS.accentBright}`, borderRight: `2px solid ${COLORS.accentBright}`, borderBottomRightRadius: "4px", opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "28px", fontWeight: 800, color: COLORS.borderStrong }}>{service.num}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", background: `${COLORS.status}12`, border: `1px solid ${COLORS.status}35`, borderRadius: "100px", padding: "4px 10px" }}>
          <StatusDot /><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9.5px", color: COLORS.status, letterSpacing: "0.5px" }}>{t.services.online}</span>
        </span>
      </div>
      <h3 style={{ margin: "0 0 10px", color: hovered ? COLORS.accentBright : COLORS.text, fontSize: "19px", fontFamily: "'Sora', sans-serif", fontWeight: 700, transition: "color 0.2s ease" }}>{service.title}</h3>
      <p style={{ color: COLORS.textMuted, fontSize: "13.5px", lineHeight: "1.65", marginBottom: "18px" }}>{service.description}</p>
      {service.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          {service.tags.map((tag) => (
            <span key={tag} style={{ background: COLORS.bgPanelAlt, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted }}>{tag}</span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px dashed ${COLORS.border}`, paddingTop: "16px" }}>
        <span style={{ color: hovered ? COLORS.accentBright : COLORS.textFaint, fontSize: "11px", letterSpacing: "2px", transition: "color 0.2s ease" }}>· · ·</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, color: hovered ? COLORS.accentBright : COLORS.textFaint, transition: "color 0.2s ease" }}>{hovered ? `> ${t.services.execute}` : t.services.execute}</span>
      </div>
    </div>
  );
}
