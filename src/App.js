import { useState, useEffect, useRef } from "react";
import fotoAlan from "./img_portafolio_web_alan_coneo.jpeg";

const COLORS = {
  bg: "#0a0e1a",
  bgCard: "#0f1423",
  bgCardHover: "#141929",
  border: "#1e2d4a",
  borderGlow: "#2563eb",
  accent: "#2563eb",
  accentGlow: "#3b82f6",
  accentYellow: "#f59e0b",
  accentGreen: "#10b981",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#94a3b8",
};

const skills = {
  Backend: [
    { name: "Python", level: 85 },
    { name: "Django", level: 80 },
    { name: "Node.js", level: 65 },
    { name: "JavaScript", level: 75 },
  ],
  Frontend: [
    { name: "React", level: 70 },
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "Tailwind CSS", level: 80 },
  ],
  "Bases de Datos": [
    { name: "PostgreSQL", level: 75 },
    { name: "MySQL", level: 70 },
    { name: "MongoDB", level: 60 },
    { name: "SQLite", level: 80 },
  ],
};

const softSkills = [
  "Trabajo en equipo",
  "Adaptabilidad",
  "Resolución de problemas",
  "Creatividad",
  "Gestión del tiempo",
  "Pensamiento analítico",
  "Trabajo bajo presión",
  "Responsabilidad",
];

const projects = [
  {
    name: "ElectroHome",
    subtitle: "E-commerce de Electrodomésticos",
    description:
      "Plataforma de comercio electrónico completa con carrito inteligente, autenticación OAuth con Google, chatbot con IA integrada, sistema de recomendaciones personalizadas y pasarela de pagos Wompi.",
    tech: ["Django", "Python", "PostgreSQL", "Tailwind CSS", "JavaScript", "Claude AI"],
    github: "https://github.com/alan1130co/ecommerce-electrohome-render",
    color: "#2563eb",
    icon: "⚡",
    highlights: [
      "Carrito persistente para usuarios anónimos y autenticados",
      "Chatbot con IA (Claude API) restringido al contexto de la tienda",
      "Sistema de recomendaciones basado en comportamiento",
      "Integración Google OAuth + Wompi pagos",
    ],
  },
];

function TerminalText({ text, speed = 40, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[idx]);
        setIdx((i) => i + 1);
      }, speed);
      return () => clearTimeout(t);
    } else if (onDone) {
      onDone();
    }
  }, [idx, text, speed, onDone]);

  return (
    <span>
      {displayed}
      {idx < text.length && (
        <span style={{
          display: "inline-block", width: "2px", height: "1.1em",
          background: COLORS.accentYellow, marginLeft: "2px",
          verticalAlign: "middle", animation: "blink 1s step-end infinite",
        }} />
      )}
    </span>
  );
}

function NavDot({ active, onClick, label }) {
  return (
    <button onClick={onClick} title={label} style={{
      width: active ? "28px" : "8px", height: "8px", borderRadius: "4px",
      background: active ? COLORS.accent : COLORS.border,
      border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
    }} />
  );
}

function SkillBar({ name, level, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: COLORS.textDim, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
        <span style={{ color: COLORS.accentYellow, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>{level}%</span>
      </div>
      <div style={{ height: "4px", background: COLORS.border, borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animated ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentGlow})`,
          borderRadius: "2px",
          transition: `width 1s ease ${delay}ms`,
          boxShadow: animated ? `0 0 8px ${COLORS.accentGlow}60` : "none",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? COLORS.bgCardHover : COLORS.bgCard,
        border: `1px solid ${hovered ? COLORS.borderGlow : COLORS.border}`,
        borderRadius: "16px", padding: "32px",
        transition: "all 0.3s ease",
        boxShadow: hovered ? `0 0 30px ${COLORS.accent}20, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 16px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
        <div style={{
          width: "52px", height: "52px",
          background: `${project.color}20`,
          border: `1px solid ${project.color}40`,
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px", flexShrink: 0,
        }}>
          {project.icon}
        </div>
        <div>
          <h3 style={{ margin: 0, color: COLORS.text, fontSize: "20px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
            {project.name}
          </h3>
          <p style={{ margin: "4px 0 0", color: COLORS.textMuted, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
            {project.subtitle}
          </p>
        </div>
      </div>

      <p style={{ color: COLORS.textDim, fontSize: "14px", lineHeight: "1.7", marginBottom: "20px" }}>
        {project.description}
      </p>

      <div style={{ marginBottom: "24px" }}>
        {project.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
            <span style={{ color: COLORS.accentGreen, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>▹</span>
            <span style={{ color: COLORS.textDim, fontSize: "13px", lineHeight: "1.5" }}>{h}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            background: `${COLORS.accent}15`,
            border: `1px solid ${COLORS.accent}30`,
            color: COLORS.accentGlow,
            padding: "4px 10px", borderRadius: "6px",
            fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
          }}>
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: COLORS.textDim, textDecoration: "none",
          fontSize: "13px", fontFamily: "'JetBrains Mono', monospace",
          padding: "8px 16px",
          border: `1px solid ${COLORS.border}`,
          borderRadius: "8px", transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.text; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.textDim; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        Ver en GitHub
      </a>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);

  const sections = ["hero", "sobre-mi", "habilidades", "proyectos", "contacto"];
  const sectionLabels = ["Inicio", "Sobre mí", "Habilidades", "Proyectos", "Contacto"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1e2d4a; border-radius: 2px; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4) } 50% { box-shadow: 0 0 0 8px rgba(16,185,129,0) } }
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
        .section { min-height: 100vh; padding: 100px 24px; max-width: 900px; margin: 0 auto; }
        .grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(#1e2d4a18 1px, transparent 1px), linear-gradient(90deg, #1e2d4a18 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .glow-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
      `}</style>

      <div className="grid-bg" />
      <div className="glow-orb" style={{ width: "400px", height: "400px", background: "#2563eb12", top: "-100px", right: "-100px" }} />
      <div className="glow-orb" style={{ width: "300px", height: "300px", background: "#f59e0b08", bottom: "10%", left: "-80px" }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#0a0e1ae0", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1e2d4a",
        padding: "0 32px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentYellow, fontSize: "14px", fontWeight: 700 }}>
          alan<span style={{ color: COLORS.accent }}>.</span>dev
        </span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {sectionLabels.map((label, i) => (
            <button key={label} onClick={() => scrollTo(sections[i])} style={{
              background: activeSection === sections[i] ? `${COLORS.accent}20` : "transparent",
              border: "none", cursor: "pointer",
              color: activeSection === sections[i] ? COLORS.text : COLORS.textMuted,
              fontSize: "13px", fontFamily: "'JetBrains Mono', monospace",
              padding: "6px 14px", borderRadius: "6px", transition: "all 0.2s",
            }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {sections.map((s, i) => (
            <NavDot key={s} active={activeSection === s} onClick={() => scrollTo(s)} label={sectionLabels[i]} />
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <div style={{ animation: "fadeUp 0.8s ease both", display: "flex", alignItems: "center", gap: "64px", flexWrap: "wrap" }}>

          {/* Foto */}
          <div style={{ flexShrink: 0, position: "relative" }}>
            <div style={{
              width: "220px", height: "220px", borderRadius: "50%",
              border: `3px solid ${COLORS.accent}`,
              padding: "4px",
              boxShadow: `0 0 40px ${COLORS.accent}40`,
              animation: "float 4s ease-in-out infinite",
            }}>
              <img
                src={fotoAlan}
                alt="Alan David Coneo"
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: "10px", right: "-10px",
              background: COLORS.bgCard, border: `1px solid ${COLORS.accentGreen}40`,
              borderRadius: "100px", padding: "6px 12px",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: COLORS.accentGreen, animation: "pulse 2s infinite", flexShrink: 0 }} />
              <span style={{ color: COLORS.accentGreen, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>disponible</span>
            </div>
          </div>

          {/* Texto */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted, fontSize: "14px", marginBottom: "12px" }}>
              <span style={{ color: COLORS.accent }}>const</span> dev = <span style={{ color: COLORS.accentYellow }}>"Alan David Coneo"</span>;
            </div>

            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700, lineHeight: 1.05, marginBottom: "16px",
              background: `linear-gradient(135deg, ${COLORS.text} 40%, ${COLORS.accentGlow})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              <TerminalText text="Alan David" speed={60} onDone={() => setTitleDone(true)} />
              {titleDone && <><br /><TerminalText text="Coneo Rodríguez" speed={60} onDone={() => setSubtitleDone(true)} /></>}
            </h1>

            {subtitleDone && (
              <div style={{ animation: "fadeUp 0.5s ease both" }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(13px, 2vw, 16px)", color: COLORS.accent, marginBottom: "16px", fontWeight: 500 }}>
                  Tecnólogo en Análisis y Desarrollo de Software
                </p>
                <p style={{ color: COLORS.textDim, fontSize: "15px", lineHeight: "1.8", maxWidth: "520px", marginBottom: "36px" }}>
                  Apasionado por construir soluciones web completas — desde el backend hasta la interfaz.
                  Especializado en <span style={{ color: COLORS.text }}>Python / Django / Node.js</span> y experiencia con React, PostgreSQL, MongoDB, MySQL y APIs modernas.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button onClick={() => scrollTo("proyectos")} style={{
                    background: COLORS.accent, color: "#fff", border: "none",
                    padding: "12px 28px", borderRadius: "10px", fontSize: "14px",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s ease",
                    boxShadow: `0 4px 20px ${COLORS.accent}40`,
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Ver proyectos →
                  </button>
                  <button onClick={() => scrollTo("contacto")} style={{
                    background: "transparent", color: COLORS.textDim,
                    border: `1px solid ${COLORS.border}`, padding: "12px 28px",
                    borderRadius: "10px", fontSize: "14px",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.text; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.textDim; }}
                  >
                    Contacto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite", opacity: 0.4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: "13px", marginBottom: "8px" }}>// 01. sobre_mi</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700 }}>Sobre mí</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <div>
            <p style={{ color: COLORS.textDim, lineHeight: "1.9", fontSize: "15px", marginBottom: "20px" }}>
              Soy <span style={{ color: COLORS.text }}>Tecnólogo en Análisis y Desarrollo de Software</span>, con pasión por construir productos digitales que resuelvan problemas reales.
            </p>
            <p style={{ color: COLORS.textDim, lineHeight: "1.9", fontSize: "15px", marginBottom: "20px" }}>
              Desarrollador <span style={{ color: COLORS.text }}>Fullstack</span> con dominio en <span style={{ color: COLORS.text }}>Python / Django</span> y <span style={{ color: COLORS.text }}>Node.js</span> en el backend, y <span style={{ color: COLORS.text }}>React</span> con Tailwind CSS en el frontend — capaz de construir una aplicación completa de principio a fin.
            </p>
            <p style={{ color: COLORS.textDim, lineHeight: "1.9", fontSize: "15px" }}>
              Me caracterizo por la <span style={{ color: COLORS.text }}>eficacia en la resolución de problemas</span>, buen manejo del tiempo y capacidad de adaptación. Busco oportunidades para seguir creciendo profesionalmente.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Nombre", value: "Alan David Coneo Rodríguez" },
              { label: "Ubicación", value: "Garzón, Huila — Colombia" },
              { label: "Formación", value: "SENA — Tecnólogo en ADS" },
              { label: "Estado", value: "En formación (2024 - actualidad)" },
              { label: "GitHub", value: "github.com/alan1130co" },
              { label: "LinkedIn", value: "linkedin.com/in/alan-coneo-rodriguez" },
              { label: "Email", value: "alanconeorodriguez1130@gmail.com" },
              { label: "Teléfono", value: "311 874 1905" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: "flex", gap: "12px", padding: "10px 14px",
                background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: "10px",
              }}>
                <span style={{ color: COLORS.accentYellow, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", minWidth: "80px", paddingTop: "1px" }}>{label}:</span>
                <span style={{ color: COLORS.textDim, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-all" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "40px" }}>
          <p style={{ color: COLORS.textMuted, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "16px" }}>habilidades_blandas:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {softSkills.map((s) => (
              <span key={s} style={{
                background: `${COLORS.accentGreen}10`, border: `1px solid ${COLORS.accentGreen}25`,
                color: COLORS.accentGreen, padding: "8px 16px", borderRadius: "100px",
                fontSize: "13px", fontFamily: "'Space Grotesk', sans-serif",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section id="habilidades" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: "13px", marginBottom: "8px" }}>// 02. habilidades_tecnicas</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700 }}>Stack Técnico</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {Object.entries(skills).map(([category, items], ci) => (
            <div key={category} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: ci === 0 ? `${COLORS.accent}20` : ci === 1 ? `${COLORS.accentYellow}20` : `${COLORS.accentGreen}20`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
                }}>
                  {ci === 0 ? "⚙" : ci === 1 ? "🎨" : "🗄"}
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500,
                  color: ci === 0 ? COLORS.accentGlow : ci === 1 ? COLORS.accentYellow : COLORS.accentGreen,
                }}>
                  {category}
                </span>
              </div>
              {items.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 100} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: "13px", marginBottom: "8px" }}>// 03. proyectos</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700 }}>Proyectos</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: "13px", marginBottom: "8px" }}>// 04. contacto</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700 }}>Hablemos</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {[
            { icon: "📧", label: "Email", value: "alanconeorodriguez1130@gmail.com", href: "mailto:alanconeorodriguez1130@gmail.com" },
            { icon: "📱", label: "Teléfono / WhatsApp", value: "311 874 1905", href: "https://wa.me/573118741905" },
            { icon: "💻", label: "GitHub", value: "github.com/alan1130co", href: "https://github.com/alan1130co" },
            { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/alan-coneo-rodriguez", href: "https://www.linkedin.com/in/alan-coneo-rodriguez-4b5612362" },
            
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href || "#"} target={href && !href.startsWith("mailto") ? "_blank" : undefined} rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "16px",
                background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
                borderRadius: "14px", padding: "24px", textDecoration: "none",
                transition: "all 0.2s ease", cursor: href ? "pointer" : "default",
              }}
              onMouseEnter={(e) => { if (href) { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "translateY(-2px)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                width: "44px", height: "44px", flexShrink: 0,
                background: `${COLORS.accent}15`, borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
              }}>
                {icon}
              </div>
              <div>
                <p style={{ color: COLORS.textMuted, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "4px" }}>{label}</p>
                <p style={{ color: COLORS.text, fontSize: "13px", wordBreak: "break-all" }}>{value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "32px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted, fontSize: "12px" }}>
          <span style={{ color: COLORS.accent }}>©</span> 2025 Alan David Coneo Rodríguez
          <span style={{ margin: "0 12px", color: COLORS.border }}>|</span>
          Construido con <span style={{ color: "#ef4444" }}>♥</span> en React
        </p>
      </footer>
    </div>
  );
}