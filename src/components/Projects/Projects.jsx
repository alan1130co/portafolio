import { COLORS } from "../../theme/colors";
import { projects } from "../../data/projects";
import { useLanguage } from "../../context/LanguageContext";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "44px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; {t.projects.eyebrow}</p>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "34px", fontWeight: 800 }}>{t.projects.heading}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {projects.map((p, i) => <ProjectCard key={p.id} p={p} copy={t.projects.items[i]} />)}
      </div>
    </section>
  );
}
