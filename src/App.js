import { useState, useEffect } from "react";
import fotoAlan from "./img_principal_hojadevida.png";

/* ============================================================
   TOKENS — acento azul, estructura tipo hdtoledo.dev
   ============================================================ */
const COLORS = {
  bg: "#080b10",
  bgPanel: "#0e131b",
  bgPanelAlt: "#121824",
  border: "#1d2632",
  borderStrong: "#2c3a4c",
  text: "#f2f5f8",
  textMuted: "#8d97a6",
  textFaint: "#5a6472",
  accent: "#2f7cff",
  accentBright: "#5c9bff",
  accentSoft: "#2f7cff22",
  status: "#22c55e",
};

const skillGroups = [
  { label: "FRONTEND", items: [
    { name: "React", icon: "⚛" }, { name: "Django", icon: "◆" }, { name: "Next.js", icon: "N" }, { name: "TypeScript", icon: "TS" }, { name: "Tailwind CSS", icon: "≋" }
  ]},
  { label: "BACKEND", items: [
    { name: "Node.js", icon: "⬡" }, { name: "MongoDB", icon: "🍃" }, { name: "PostgreSQL", icon: "🐘" }, { name: "MySQL", icon: "🐬" }
  ]},
  { label: "DEVOPS & CLOUD", items: [
    { name: "Git", icon: "🐙" }, { name: "GitHub", icon: "gh" }, { name: "Docker", icon: "🐳" }
  ]},
];

const softSkills = ["Trabajo en equipo", "Adaptabilidad", "Resolución de problemas", "Creatividad", "Gestión del tiempo", "Pensamiento analítico", "Trabajo bajo presión", "Responsabilidad"];

const experiencia = [
  {
    timestamp: "Mayo 2026 — Presente",
    title: "Desarrollador Full-Stack & Analista de Datos",
    org: "Soluciones Migratorias",
    detail: "Diseño y análisis de datos de CRM y Meta Ads utilizando Python, Pandas y Streamlit. Desarrollo web enfocado en posicionamiento SEO, integración de APIs (CRM, Meta Ads, reseñas de Google), Next.js y Tailwind CSS, con despliegue y gestión en el VPS de la empresa.",
  },
  {
    timestamp: "2025 — 2026",
    title: "Desarrollador Web (Landing Page de Turismo)",
    org: "Proyecto Freelance — Experiencia Tour Cartagena",
    detail: "Creación de la landing page para el sector turismo con posicionamiento en Google (SEO), utilizando TypeScript, Tailwind CSS, despliegue con CI/CD e infraestructura en la nube.",
  },
  {
    timestamp: "2024 — 2025",
    title: "Desarrollador Web Full-Stack",
    org: "Proyecto ElectroHome",
    detail: "Desarrollo y migración de e-commerce virtual store con integración de bases de datos, pasarelas de pago y optimización frontend.",
  },
];

const educacion = [
  {
    timestamp: "2024 — 2026",
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    org: "SENA",
    detail: "Formación integral en arquitectura de software, modelado de bases de datos, desarrollo full-stack y buenas prácticas de programación.",
  },
];

const services = [
  { num: "01", title: "Desarrollo Web Full-Stack", description: "Creación de aplicaciones web modernas, rápidas y optimizadas utilizando React, Next.js, Django y Tailwind CSS." },
  { num: "02", title: "Análisis de Datos", description: "Procesamiento y visualización de datos de negocio, CRM y campañas publicitarias usando Python, Pandas y Streamlit." },
  { num: "03", title: "Posicionamiento SEO & APIs", description: "Optimización para motores de búsqueda en Google e integración de APIs de terceros (Meta Ads, CRM, Google Reviews)." },
  { num: "04", title: "DevOps & Cloud", description: "Configuración de entornos, despliegues automatizados CI/CD, Docker y gestión de servidores VPS e infraestructura en la nube." },
];

const projects = [
  {
    id: "id_01", tag: "DJANGO + REACT", name: "ElectroHome", subtitle: "E-commerce y tienda virtual",
    website: "https://electrohome.site",
    description: "Plataforma de comercio electrónico con gestión de base de datos, catálogos interactivos, optimización de plantillas y despliegue en la nube.",
    tech: [{ icon: "🐍", name: "python" }, { icon: "◆", name: "django" }, { icon: "⚛", name: "react" }, { icon: "≋", name: "tailwindcss" }],
    github: "https://github.com/alan1130co/ecommerce-electrohome-render",
  },
];

const contactCards = [
  { num: "01", label: "Correo", value: "alanconeorodriguez1130@gmail.com", href: "mailto:alanconeorodriguez1130@gmail.com", action: "ENVIAR_CORREO" },
  { num: "02", label: "WhatsApp", value: "311 874 1905", href: "https://wa.me/573118741905", action: "ABRIR_CHAT" },
  { num: "03", label: "GitHub", value: "github.com/alan1130co", href: "https://github.com/alan1130co", action: "VER_PERFIL" },
  { num: "04", label: "LinkedIn", value: "linkedin.com/in/alan-coneo-rodriguez", href: "https://www.linkedin.com/in/alan-coneo-rodriguez-4b5612362", action: "VER_PERFIL" },
];

const socialRow = [
  { label: "GH", href: "https://github.com/alan1130co", title: "GitHub" },
  { label: "IN", href: "https://www.linkedin.com/in/alan-coneo-rodriguez-4b5612362", title: "LinkedIn" },
  { label: "WA", href: "https://wa.me/573118741905", title: "WhatsApp" },
];

const stats = [
  { value: 1, suffix: " Año", label: "DE EXPERIENCIA" },
  { value: 4, suffix: "", label: "SERVICIOS CLAVE" },
  { value: 3, suffix: "+", label: "PROYECTOS Y CLIENTES" },
  { value: 2024, suffix: "", label: "INICIO FORMACIÓN" },
];

const perfilFields = [
  ["Nombre", "Alan Coneo"], ["Experiencia", "1 Año"],
  ["Nacionalidad", "Colombiano"], ["Freelance", "Disponible"],
  ["Idioma", "Español"], ["Formación", "Tecnólogo ADSO (SENA)"],
];

/* ============================================================
   Componentes
   ============================================================ */

function TerminalText({ text, speed = 42, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => { setDisplayed((p) => p + text[idx]); setIdx((i) => i + 1); }, speed);
      return () => clearTimeout(t);
    } else if (onDone) onDone();
  }, [idx, text, speed, onDone]);
  return (
    <span>
      {displayed}
      {idx < text.length && <span style={{ display: "inline-block", width: "3px", height: "0.85em", background: COLORS.accentBright, marginLeft: "2px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />}
    </span>
  );
}

function StatusDot() {
  return <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.status, animation: "pulseDot 2s infinite", flexShrink: 0 }} />;
}

function CountUp({ value, suffix, duration = 1300 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, duration]);
  return <span>{display}{suffix}</span>;
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", background: COLORS.bgPanel, border: `1px solid ${hovered ? COLORS.accent : COLORS.border}`, borderRadius: "16px", padding: "30px 32px", transition: "all 0.25s ease", boxShadow: hovered ? `0 0 0 1px ${COLORS.accent}50, 0 20px 45px ${COLORS.accent}1a` : "none" }}>
      <span style={{ position: "absolute", bottom: "12px", right: "12px", width: "16px", height: "16px", borderBottom: `2px solid ${COLORS.accentBright}`, borderRight: `2px solid ${COLORS.accentBright}`, borderBottomRightRadius: "4px", opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "28px", fontWeight: 800, color: COLORS.borderStrong }}>{service.num}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", background: `${COLORS.status}12`, border: `1px solid ${COLORS.status}35`, borderRadius: "100px", padding: "4px 10px" }}>
          <StatusDot /><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9.5px", color: COLORS.status, letterSpacing: "0.5px" }}>ONLINE</span>
        </span>
      </div>
      <h3 style={{ margin: "0 0 10px", color: hovered ? COLORS.accentBright : COLORS.text, fontSize: "19px", fontFamily: "'Sora', sans-serif", fontWeight: 700, transition: "color 0.2s ease" }}>{service.title}</h3>
      <p style={{ color: COLORS.textMuted, fontSize: "13.5px", lineHeight: "1.65", marginBottom: "26px" }}>{service.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px dashed ${COLORS.border}`, paddingTop: "16px" }}>
        <span style={{ color: hovered ? COLORS.accentBright : COLORS.textFaint, fontSize: "11px", letterSpacing: "2px", transition: "color 0.2s ease" }}>· · ·</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, color: hovered ? COLORS.accentBright : COLORS.textFaint, transition: "color 0.2s ease" }}>{hovered ? "> EXECUTE" : "EXECUTE"}</span>
      </div>
    </div>
  );
}

function TimelineEntry({ entry, isLast }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px" }}>
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: COLORS.accentBright, boxShadow: `0 0 0 4px ${COLORS.accentSoft}`, flexShrink: 0 }} />
        {!isLast && <span style={{ width: "1px", flex: 1, background: COLORS.border, marginTop: "6px" }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: "32px" }}>
        <span style={{ display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.accentBright, border: `1px solid ${COLORS.accent}40`, borderRadius: "6px", padding: "4px 10px", marginBottom: "14px" }}>
          [ TIMESTAMP: {entry.timestamp} ]
        </span>
        <h4 style={{ margin: "0 0 6px", color: COLORS.text, fontSize: "19px", fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>{entry.title}</h4>
        <p style={{ margin: "0 0 14px", color: COLORS.accentBright, fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>• {entry.org}</p>
        <div style={{ background: COLORS.bgPanelAlt, border: `1px solid ${COLORS.border}`, borderRadius: "10px", padding: "16px 18px" }}>
          <p style={{ color: COLORS.textMuted, fontSize: "13.5px", lineHeight: "1.7" }}>
            <span style={{ color: COLORS.accentBright }}>&gt; </span>{entry.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Componente principal — navegación por páginas
   ============================================================ */
export default function Portfolio() {
  const [page, setPage] = useState("hero");
  const [titleDone, setTitleDone] = useState(false);
  const [lang, setLang] = useState("ES");
  const [cvTab, setCvTab] = useState("experiencia");

  const pages = ["hero", "servicios", "curriculum", "proyectos", "contacto"];
  const pageLabels = ["Inicio", "Servicios", "Currículum", "Proyectos", "Contacto"];

  const cvTabs = [
    { key: "experiencia", label: "./experiencia" },
    { key: "educacion", label: "./educación" },
    { key: "habilidades", label: "./habilidades" },
    { key: "sobre_mi", label: "./sobre_mí" },
  ];

  const goTo = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }

        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4) } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0) } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }

        .page { min-height: 100vh; padding: 116px 24px 70px; max-width: 1080px; margin: 0 auto; animation: fadeUp 0.4s ease both; }
        .grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(${COLORS.border}35 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}35 1px, transparent 1px);
          background-size: 34px 34px;
        }
        .glow-orb { position: fixed; border-radius: 50%; filter: blur(130px); pointer-events: none; z-index: 0; }

        .hero-grid { display: grid; grid-template-columns: 1fr 360px; gap: 56px; align-items: center; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 56px; }
        .cv-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .cv-grid { display: grid; grid-template-columns: 240px 1fr; gap: 40px; align-items: start; }
        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 14px; max-width: 420px; }
        .fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 32px; }

        @media (max-width: 780px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cv-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .fields-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <div className="grid-bg" />
      <div className="glow-orb" style={{ width: "460px", height: "460px", background: "#2f7cff14", top: "-140px", right: "-90px" }} />
      <div className="glow-orb" style={{ width: "340px", height: "340px", background: "#2f7cff0a", bottom: "10%", left: "-100px" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: "18px", left: "50%", transform: "translateX(-50%)", zIndex: 100, background: "#0e131bee", backdropFilter: "blur(18px)", border: `1px solid ${COLORS.border}`, borderRadius: "100px", padding: "8px 10px 8px 16px", display: "flex", alignItems: "center", gap: "6px", maxWidth: "94vw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "10px" }}>
          <span style={{ width: "26px", height: "26px", borderRadius: "50%", border: `1.5px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontSize: "12px", fontWeight: 800, color: COLORS.accentBright, flexShrink: 0 }}>A</span>
          <span style={{ fontFamily: "'Sora', sans-serif", color: COLORS.text, fontSize: "14px", fontWeight: 700, whiteSpace: "nowrap" }}>alan<span style={{ color: COLORS.accent }}>.dev</span></span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          {pageLabels.map((label, i) => (
            <button key={label} onClick={() => goTo(pages[i])} style={{ background: page === pages[i] ? COLORS.accentSoft : "transparent", border: page === pages[i] ? `1px solid ${COLORS.accent}60` : "1px solid transparent", borderRadius: "100px", cursor: "pointer", color: page === pages[i] ? COLORS.accentBright : COLORS.textFaint, fontSize: "11.5px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, padding: "8px 14px", letterSpacing: "0.5px", transition: "all 0.2s" }}>
              {label.toUpperCase()}
            </button>
          ))}
        </div>
        <button onClick={() => goTo("contacto")} style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentBright})`, color: "#fff", border: "none", padding: "9px 18px", borderRadius: "100px", fontSize: "12.5px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", marginLeft: "8px", whiteSpace: "nowrap" }}>Contrátame ➤</button>
        <div style={{ display: "flex", border: `1px solid ${COLORS.border}`, borderRadius: "100px", overflow: "hidden", marginLeft: "6px" }}>
          {["ES", "EN"].map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? COLORS.accentSoft : "transparent", border: "none", color: lang === l ? COLORS.accentBright : COLORS.textFaint, fontSize: "10.5px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "7px 10px", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </nav>

      {/* PÁGINA: INICIO */}
      {page === "hero" && (
        <section className="page" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "100px", padding: "7px 16px", marginBottom: "26px" }}>
                <StatusDot />
                <span style={{ color: COLORS.textMuted, fontSize: "11.5px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px" }}>DESARROLLADOR FULL-STACK & FREELANCE</span>
              </div>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(38px, 5.6vw, 60px)", fontWeight: 800, lineHeight: 1.06, marginBottom: "20px", color: COLORS.text }}>
                Hola, soy<br />
                <span style={{ color: COLORS.accentBright }}><TerminalText text="Alan Coneo" speed={48} onDone={() => setTitleDone(true)} /></span>
              </h1>
              {titleDone && (
                <div style={{ animation: "fadeUp 0.5s ease both" }}>
                  <p style={{ color: COLORS.textMuted, fontSize: "16px", lineHeight: "1.85", maxWidth: "540px", marginBottom: "32px" }}>
                    Desarrollador de software apasionado por la creación de soluciones digitales eficientes, escalables y orientadas a resultados.
                  </p>
                  <div className="cv-row" style={{ marginBottom: "26px" }}>
                    <button onClick={() => goTo("curriculum")} style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: `1px solid ${COLORS.accent}`, borderRadius: "10px", padding: "13px 22px", color: COLORS.accentBright, fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, background: COLORS.accentSoft, cursor: "pointer" }}>
                      &gt;_ VER_CURRÍCULUM
                    </button>
                    {socialRow.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.title} style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "10px", color: COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 700, textDecoration: "none", transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accentBright; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.textMuted; }}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: "relative", justifySelf: "center" }}>
              <div style={{ position: "relative", width: "320px", maxWidth: "78vw", aspectRatio: "1 / 1.12", borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.borderStrong}`, boxShadow: `0 0 0 1px ${COLORS.bg}, 0 30px 60px rgba(0,0,0,0.5)` }}>
                <img src={fotoAlan} alt="Alan Coneo" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 0 1px ${COLORS.accent}25` }} />
              </div>
              <div style={{ position: "absolute", bottom: "-16px", right: "-8px", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "100px", padding: "9px 18px", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", boxShadow: "0 10px 30px rgba(0,0,0,0.45)" }}>
                <StatusDot /><span style={{ color: COLORS.text, fontSize: "12px", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Disponible para proyectos</span>
              </div>
            </div>
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} style={{ background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "14px", padding: "22px 16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "2px", fontFamily: "'Sora', sans-serif", fontSize: "30px", fontWeight: 800, color: COLORS.text, marginBottom: "6px" }}>
                  <CountUp value={s.value} suffix="" /><span style={{ color: COLORS.accentBright }}>{s.suffix}</span>
                </div>
                <div style={{ color: COLORS.textFaint, fontSize: "10.5px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PÁGINA: SERVICIOS */}
      {page === "servicios" && (
        <section className="page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "44px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; SERVICIOS</p>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "34px", fontWeight: 800 }}>En qué puedo ayudarte</h2>
          </div>
          <div className="services-grid">
            {services.map((s) => <ServiceCard key={s.num} service={s} />)}
          </div>
        </section>
      )}

      {/* PÁGINA: CURRÍCULUM */}
      {page === "curriculum" && (
        <section className="page" style={{ position: "relative", zIndex: 1 }}>
          <div className="cv-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cvTabs.map((t) => (
                <button key={t.key} onClick={() => setCvTab(t.key)} style={{ textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", background: cvTab === t.key ? COLORS.accentSoft : COLORS.bgPanel, border: `1px solid ${cvTab === t.key ? COLORS.accent : COLORS.border}`, borderRadius: "10px", padding: "14px 16px", cursor: "pointer", color: cvTab === t.key ? COLORS.accentBright : COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, transition: "all 0.2s ease" }}>
                  <span>&gt; {t.label}</span>
                  {cvTab === t.key && <span style={{ width: "2px", height: "14px", background: COLORS.accentBright, animation: "blink 1s step-end infinite" }} />}
                </button>
              ))}
            </div>

            <div>
              {cvTab === "experiencia" && (
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "8px" }}>&gt;</p>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "30px", fontWeight: 800, marginBottom: "34px" }}>Mi experiencia</h2>
                  {experiencia.map((e, i) => <TimelineEntry key={e.title} entry={e} isLast={i === experiencia.length - 1} />)}
                </div>
              )}

              {cvTab === "educacion" && (
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "8px" }}>&gt;</p>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "30px", fontWeight: 800, marginBottom: "34px" }}>Mi educación</h2>
                  {educacion.map((e, i) => <TimelineEntry key={e.title} entry={e} isLast={i === educacion.length - 1} />)}
                </div>
              )}

              {cvTab === "habilidades" && (
                <div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "26px", fontWeight: 800, marginBottom: "10px" }}>Mis habilidades</h2>
                  <p style={{ color: COLORS.textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "36px", maxWidth: "460px" }}>
                    Tecnologías y herramientas que domino para crear soluciones robustas y eficientes.
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
                          <div key={skill.name} title={skill.name} style={{ aspectRatio: "1 / 1", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: COLORS.textMuted, cursor: "default", transition: "all 0.2s ease" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accentBright; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.textMuted; }}>
                            {skill.icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                      <span style={{ flex: 1, height: "1px", background: COLORS.border }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.accentBright, letterSpacing: "2px", whiteSpace: "nowrap" }}>HABILIDADES BLANDAS</span>
                      <span style={{ flex: 1, height: "1px", background: COLORS.border }} />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {softSkills.map((s) => (
                        <span key={s} style={{ background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, color: COLORS.textMuted, padding: "9px 16px", borderRadius: "100px", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {cvTab === "sobre_mi" && (
                <div style={{ background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "36px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                    <span style={{ width: "34px", height: "34px", borderRadius: "50%", border: `2px solid ${COLORS.accentBright}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.accentBright }} />
                    </span>
                    <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 800 }}>¿Por qué contratarme?</h2>
                  </div>
                  <div style={{ height: "1px", background: COLORS.border, marginBottom: "24px" }} />
                  <p style={{ color: COLORS.textMuted, fontSize: "15px", lineHeight: "1.9", marginBottom: "32px" }}>
                    Aporto una combinación de disciplina, pensamiento crítico y una fuerte ética de trabajo. No busco solo cumplir con los objetivos, sino superarlos mediante la mejora constante y la atención al detalle. Si necesitas a alguien resolutivo, confiable y comprometido con entregar resultados impecables, estoy listo para empezar.
                  </p>
                  <div className="fields-grid">
                    {perfilFields.map(([label, value]) => (
                      <div key={label} style={{ borderLeft: `2px solid ${COLORS.accent}50`, paddingLeft: "14px" }}>
                        <p style={{ color: COLORS.accentBright, fontSize: "10.5px", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.5px" }}>{label}</p>
                        <p style={{ color: COLORS.text, fontSize: "14.5px", fontWeight: 500 }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PÁGINA: PROYECTOS */}
      {page === "proyectos" && (
        <section className="page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "44px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; PROYECTOS</p>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "34px", fontWeight: 800 }}>Lo que he construido</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {projects.map((p) => (
              <div key={p.id} style={{ background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "18px", overflow: "hidden" }}>
                <div style={{ padding: "22px 28px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.textFaint }}>&gt;_ ~/logs/{p.id}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: COLORS.accentBright, border: `1px solid ${COLORS.accent}50`, borderRadius: "100px", padding: "4px 10px" }}>[ {p.tag} ]</span>
                  </div>
                  <h3 style={{ margin: "0 0 4px", color: COLORS.text, fontSize: "24px", fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>{p.name}</h3>
                  <p style={{ margin: "0 0 16px", color: COLORS.accentBright, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>{p.subtitle}</p>
                  <p style={{ color: COLORS.textMuted, fontSize: "14px", lineHeight: "1.7", marginBottom: "20px" }}>{p.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "22px" }}>
                    {p.tech.map((t) => (
                      <span key={t.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: COLORS.bgPanelAlt, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted }}>
                        <span>{t.icon}</span><span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", borderTop: `1px solid ${COLORS.border}`, background: COLORS.bgPanelAlt, borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px" }}>
                  <a href={p.website} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "14px", textAlign: "center", color: COLORS.accentBright, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600, textDecoration: "none", borderRight: `1px solid ${COLORS.border}` }}>
                    VER SITIO WEB ↗
                  </a>
                  <a href={p.github} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "14px", textAlign: "center", color: COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                    VER CÓDIGO GITHUB ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PÁGINA: CONTACTO */}
      {page === "contacto" && (
        <section className="page" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; CONTACTO</p>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "34px", fontWeight: 800 }}>Hablemos de tu proyecto</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            {contactCards.map((c) => (
              <a key={c.num} href={c.href} target="_blank" rel="noreferrer" style={{ background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "28px", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "170px", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "24px", fontWeight: 800, color: COLORS.borderStrong }}>{c.num}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: COLORS.accentBright, border: `1px solid ${COLORS.accent}40`, borderRadius: "6px", padding: "3px 8px" }}>{c.action}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.textFaint, marginBottom: "6px" }}>{c.label}</div>
                  <div style={{ color: COLORS.text, fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, wordBreak: "break-all" }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}