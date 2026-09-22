"use client";

import { COLORS } from "../../theme/colors";
import { useLanguage } from "../../context/LanguageContext";
import { translationsResume } from "../../data/translations.resume";
import TimelineEntry from "./TimelineEntry";

export default function EducationTab() {
  const { lang } = useLanguage();
  const t = translationsResume[lang];

  return (
    <div>
      <p style={{ fontFamily: "var(--font-jbmono), monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "8px" }}>&gt;</p>
      <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "30px", fontWeight: 800, marginBottom: "34px" }}>{t.educationHeading}</h2>
      {t.education.map((e, i) => <TimelineEntry key={i} entry={e} isLast={i === t.education.length - 1} />)}
    </div>
  );
}
