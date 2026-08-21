import { COLORS } from "../../theme/colors";
import { skillGroups } from "../../data/skills";
import { useLanguage } from "../../context/LanguageContext";
import SkillIcon from "../common/SkillIcon";

export default function SkillsTab() {
  const { t } = useLanguage();

  return (
    <div>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "26px", fontWeight: 800, marginBottom: "10px" }}>{t.resume.skillsHeading}</h2>
      <p style={{ color: COLORS.textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "36px", maxWidth: "460px" }}>
        {t.resume.skillsIntro}
      </p>
      {skillGroups.map((group) => (
        <div key={group.label} style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ flex: 1, height: "1px", background: COLORS.border }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.accentBright, letterSpacing: "2px", whiteSpace: "nowrap" }}>{group.label}</span>
            <span style={{ flex: 1, height: "1px", background: COLORS.border }} />
          </div>
          <div className="icon-grid">
            {group.items.map((skill) => (
              <div key={skill.name} title={skill.name} style={{ aspectRatio: "1 / 1", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "default", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; }}>
                <SkillIcon name={skill.icon} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
          <span style={{ flex: 1, height: "1px", background: COLORS.border }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.accentBright, letterSpacing: "2px", whiteSpace: "nowrap" }}>{t.resume.softSkillsLabel}</span>
          <span style={{ flex: 1, height: "1px", background: COLORS.border }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {t.resume.softSkills.map((s) => (
            <span key={s} style={{ background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, color: COLORS.textMuted, padding: "9px 16px", borderRadius: "100px", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
