import { COLORS } from "../../theme/colors";
import { pages } from "../../data/navigation";
import { CONTAINER_MAX_WIDTH } from "../../theme/layout";
import { useLanguage } from "../../context/LanguageContext";
import Logo from "../common/Logo";

export default function Navbar({ page, goTo }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <nav style={{
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "46px", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, filter: `drop-shadow(0 0 10px ${COLORS.accent}70)` }}>
          <Logo size={46} />
        </span>
        <span style={{ fontFamily: "'Sora', sans-serif", color: COLORS.text, fontSize: "22px", fontWeight: 700, whiteSpace: "nowrap" }}>alan<span style={{ color: COLORS.accent }}>.dev</span></span>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: "2px", alignItems: "center" }}>
        {t.nav.pageLabels.map((label, i) => (
          <button key={label} onClick={() => goTo(pages[i])} style={{ background: page === pages[i] ? COLORS.accentSoft : "transparent", border: page === pages[i] ? `1px solid ${COLORS.accent}60` : "1px solid transparent", borderRadius: "100px", cursor: "pointer", color: page === pages[i] ? COLORS.accentBright : COLORS.textFaint, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, padding: "12px 18px", letterSpacing: "0.5px", transition: "all 0.2s" }}>
            {label.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={() => goTo("contacto")} className="hire-button" style={{ border: "none", padding: "14px 26px", borderRadius: "100px", fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{t.nav.hireMe}</button>
        <div style={{ display: "flex", border: `1px solid ${COLORS.border}`, borderRadius: "100px", overflow: "hidden" }}>
          {["ES", "EN"].map((l) => (
            <button key={l} onClick={() => setLang(l.toLowerCase())} style={{ background: lang === l.toLowerCase() ? COLORS.accentSoft : "transparent", border: "none", color: lang === l.toLowerCase() ? COLORS.accentBright : COLORS.textFaint, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, padding: "11px 14px", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}
