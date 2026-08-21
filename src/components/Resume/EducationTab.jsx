import { COLORS } from "../../theme/colors";
import { useLanguage } from "../../context/LanguageContext";
import TimelineEntry from "./TimelineEntry";

export default function EducationTab() {
  const { t } = useLanguage();

  return (
    <div>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "8px" }}>&gt;</p>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "30px", fontWeight: 800, marginBottom: "34px" }}>{t.resume.educationHeading}</h2>
      {t.resume.education.map((e, i) => <TimelineEntry key={i} entry={e} isLast={i === t.resume.education.length - 1} />)}
    </div>
  );
}
