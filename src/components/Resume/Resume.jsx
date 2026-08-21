import { useState } from "react";
import { COLORS } from "../../theme/colors";
import { cvTabKeys } from "../../data/navigation";
import { useLanguage } from "../../context/LanguageContext";
import ExperienceTab from "./ExperienceTab";
import EducationTab from "./EducationTab";
import SkillsTab from "./SkillsTab";
import AboutTab from "./AboutTab";

export default function Resume() {
  const [cvTab, setCvTab] = useState("experiencia");
  const { t } = useLanguage();

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div className="cv-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {cvTabKeys.map((key, i) => (
            <button key={key} onClick={() => setCvTab(key)} style={{ textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", background: cvTab === key ? COLORS.accentSoft : COLORS.bgPanel, border: `1px solid ${cvTab === key ? COLORS.accent : COLORS.border}`, borderRadius: "10px", padding: "14px 16px", cursor: "pointer", color: cvTab === key ? COLORS.accentBright : COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, transition: "all 0.2s ease" }}>
              <span>&gt; {t.nav.cvTabLabels[i]}</span>
              {cvTab === key && <span style={{ width: "2px", height: "14px", background: COLORS.accentBright, animation: "blink 1s step-end infinite" }} />}
            </button>
          ))}
        </div>

        <div>
          {cvTab === "experiencia" && <ExperienceTab />}
          {cvTab === "educacion" && <EducationTab />}
          {cvTab === "habilidades" && <SkillsTab />}
          {cvTab === "sobre_mi" && <AboutTab />}
        </div>
      </div>
    </section>
  );
}
