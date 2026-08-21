import { useState } from "react";
import { COLORS } from "../../theme/colors";
import { pages } from "../../data/navigation";
import { CONTAINER_MAX_WIDTH } from "../../theme/layout";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar({ page, goTo }) {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    goTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar-root" style={{
        position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 100,
        width: `min(${CONTAINER_MAX_WIDTH}, 94vw)`,
        background: "linear-gradient(180deg, #131c2bf2, #0c111af2)",
        backdropFilter: "blur(18px)",
        border: `1px solid ${COLORS.borderStrong}80`,
        borderRadius: "100px",
        padding: "12px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
        boxShadow: `0 18px 44px rgba(0,0,0,0.5), 0 0 0 1px ${COLORS.accent}14, inset 0 1px 0 ${COLORS.borderStrong}40`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <span style={{ width: "46px", height: "46px", borderRadius: "50%", border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontSize: "19px", fontWeight: 800, color: COLORS.accentBright, flexShrink: 0, boxShadow: `0 0 14px ${COLORS.accent}55` }}>A</span>
          <span className="navbar-wordmark" style={{ fontFamily: "'Sora', sans-serif", color: COLORS.text, fontSize: "22px", fontWeight: 700, whiteSpace: "nowrap" }}>alan<span style={{ color: COLORS.accent }}>.dev</span></span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          {t.nav.pageLabels.map((label, i) => (
            <button key={label} className="nav-link-btn" onClick={() => goTo(pages[i])} style={{ background: page === pages[i] ? COLORS.accentSoft : "transparent", border: page === pages[i] ? `1px solid ${COLORS.accent}60` : "1px solid transparent", borderRadius: "100px", cursor: "pointer", color: page === pages[i] ? COLORS.accentBright : COLORS.textFaint, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, padding: "12px 18px", letterSpacing: "0.5px", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {label.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => goTo("contacto")} className="hire-button navbar-hire" style={{ border: "none", padding: "14px 26px", borderRadius: "100px", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{t.nav.hireMe}</button>
          <div className="navbar-lang-toggle" style={{ display: "flex", border: `1px solid ${COLORS.border}`, borderRadius: "100px", overflow: "hidden", flexShrink: 0 }}>
            {["ES", "EN"].map((l) => (
              <button key={l} onClick={() => setLang(l.toLowerCase())} style={{ background: lang === l.toLowerCase() ? COLORS.accentSoft : "transparent", border: "none", color: lang === l.toLowerCase() ? COLORS.accentBright : COLORS.textFaint, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "11px 14px", cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            style={{ display: "none", width: "38px", height: "38px", alignItems: "center", justifyContent: "center", background: menuOpen ? COLORS.accentSoft : "transparent", border: `1px solid ${menuOpen ? COLORS.accent : COLORS.border}`, borderRadius: "10px", cursor: "pointer", flexShrink: 0, color: COLORS.text, transition: "all 0.2s ease" }}
          >
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
              {menuOpen ? (
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5 H16 M2 9 H16 M2 13.5 H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: "80px", left: 0, right: 0, margin: "0 auto", zIndex: 99,
          width: "min(420px, 92vw)",
          background: "linear-gradient(180deg, #131c2bf7, #0c111af7)",
          backdropFilter: "blur(18px)",
          border: `1px solid ${COLORS.borderStrong}80`,
          borderRadius: "20px",
          padding: "12px",
          display: "flex", flexDirection: "column", gap: "6px",
          boxShadow: "0 24px 50px rgba(0,0,0,0.55)",
          animation: "fadeUp 0.25s ease both",
        }}>
          {t.nav.pageLabels.map((label, i) => (
            <button key={label} onClick={() => handleNav(pages[i])} style={{ textAlign: "left", background: page === pages[i] ? COLORS.accentSoft : "transparent", border: page === pages[i] ? `1px solid ${COLORS.accent}60` : "1px solid transparent", borderRadius: "10px", cursor: "pointer", color: page === pages[i] ? COLORS.accentBright : COLORS.textMuted, fontSize: "14px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, padding: "13px 16px", letterSpacing: "0.5px" }}>
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
