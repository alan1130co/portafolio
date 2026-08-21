import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";
import { useLanguage } from "../../context/LanguageContext";

export default function ProjectCard({ p, copy }) {
  const { t } = useLanguage();

  return (
    <div className={CARD_SURFACE_CLASS} style={{ borderRadius: "18px" }}>
      <div style={{ borderRadius: "18px", overflow: "hidden" }}>
        <div style={{ padding: "22px 28px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.textFaint }}>&gt;_ ~/logs/{p.id}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: COLORS.accentBright, border: `1px solid ${COLORS.accent}50`, borderRadius: "100px", padding: "4px 10px" }}>[ {p.tag} ]</span>
          </div>
          <h3 style={{ margin: "0 0 4px", color: COLORS.text, fontSize: "24px", fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>{p.name}</h3>
          <p style={{ margin: "0 0 16px", color: COLORS.accentBright, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>{copy.subtitle}</p>
          <p style={{ color: COLORS.textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "20px" }}>{copy.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "22px" }}>
            {p.tech.map((tech) => (
              <span key={tech.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: COLORS.bgPanelAlt, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted }}>
                <span>{tech.icon}</span><span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", borderTop: `1px solid ${COLORS.border}`, background: COLORS.bgPanelAlt, borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px" }}>
          <a href={p.website} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "14px", textAlign: "center", color: COLORS.accentBright, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600, textDecoration: "none", borderRight: `1px solid ${COLORS.border}` }}>
            {t.projects.viewWebsite}
          </a>
          <a href={p.github} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "14px", textAlign: "center", color: COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
            {t.projects.viewGithub}
          </a>
        </div>
      </div>
    </div>
  );
}
