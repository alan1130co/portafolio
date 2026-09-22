"use client";

import { COLORS } from "../../theme/colors";
import { projects } from "../../data/projects";
import { useLanguage } from "../../context/LanguageContext";
import { translationsProjects } from "../../data/translations.projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { lang } = useLanguage();
  const t = translationsProjects[lang];

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "44px" }}>
        <p style={{ fontFamily: "var(--font-jbmono), monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; {t.eyebrow}</p>
        <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "34px", fontWeight: 800 }}>{t.heading}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {projects.map((p, i) => <ProjectCard key={p.id} p={p} copy={t.items[i]} />)}
      </div>
    </section>
  );
}
