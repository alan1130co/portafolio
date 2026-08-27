"use client";

import { COLORS } from "../../theme/colors";
import { useLanguage } from "../../context/LanguageContext";
import TimelineEntry from "./TimelineEntry";

export default function ExperienceTab() {
  const { t } = useLanguage();

  return (
    <div>
      <p style={{ fontFamily: "var(--font-jbmono), monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "8px" }}>&gt;</p>
      <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "30px", fontWeight: 800, marginBottom: "34px" }}>{t.resume.experienceHeading}</h2>
      {t.resume.experience.map((e, i) => <TimelineEntry key={i} entry={e} isLast={i === t.resume.experience.length - 1} />)}
    </div>
  );
}
