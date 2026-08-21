import { COLORS } from "../../theme/colors";
import { CONTAINER_MAX_WIDTH } from "../../theme/layout";

export default function Background() {
  return (
    <>
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

        .page { min-height: 100vh; padding: 132px 24px 70px; max-width: ${CONTAINER_MAX_WIDTH}; margin: 0 auto; animation: fadeUp 0.4s ease both; }
        .grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(${COLORS.border}35 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border}35 1px, transparent 1px);
          background-size: 34px 34px;
        }
        .glow-orb { position: fixed; border-radius: 50%; filter: blur(150px); pointer-events: none; z-index: 0; }

        .card-surface {
          background: linear-gradient(160deg, ${COLORS.bgPanelAlt}, ${COLORS.bgPanel});
          border: 1px solid ${COLORS.border}c0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.03) inset;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-surface:hover {
          transform: translateY(-6px);
          border-color: ${COLORS.accent}90;
          box-shadow: 0 22px 45px rgba(0,0,0,0.5), 0 0 28px 4px ${COLORS.accent}55;
        }

        .cv-button {
          background: ${COLORS.accentSoft};
          border: 1px solid ${COLORS.accentElectric};
          color: ${COLORS.accentBright};
          transition: all 0.3s ease;
        }
        .cv-button:hover, .cv-button:active {
          background: ${COLORS.accentElectric};
          border-color: ${COLORS.accentElectric};
          color: #fff;
          box-shadow: 0 10px 26px ${COLORS.accentElectric}55;
        }

        .social-icon {
          background: ${COLORS.bgPanel};
          border: 1px solid ${COLORS.border};
          color: ${COLORS.textMuted};
          transition: all 0.3s ease;
        }
        .social-icon:hover, .social-icon:focus-visible {
          border-color: ${COLORS.accentElectric};
          color: ${COLORS.accentElectric};
          box-shadow: 0 0 0 1px ${COLORS.accentElectric}55, 0 0 22px 4px ${COLORS.accentElectric}40;
        }

        .hire-button {
          background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentBright});
          color: #fff;
          box-shadow: 0 8px 20px ${COLORS.accent}40;
          transition: all 0.3s ease;
        }
        .hire-button:hover, .hire-button:active {
          background: linear-gradient(135deg, ${COLORS.accentBright}, ${COLORS.accentElectric});
          box-shadow: 0 12px 30px ${COLORS.accentElectric}70;
          transform: translateY(-2px);
        }

        .hero-grid { display: grid; grid-template-columns: 1fr 360px; gap: 56px; align-items: center; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 56px; }
        .cv-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .cv-grid { display: grid; grid-template-columns: 240px 1fr; gap: 40px; align-items: start; }
        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 14px; max-width: 420px; }
        .fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 32px; }

        /* Stats row: relax to 2 columns from desktop-small down to tablet. */
        @media (max-width: 1023px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Nav: the full 5-link nav plus logo, wordmark, hire button and
           language toggle needs ~950px of content, which doesn't reliably
           fit a navbar narrower than ~1100px at desktop spacing (measured
           directly — it's cutting it close even at 1024px). So tablet AND
           small desktop (up through 1099px) get the same compact/hamburger
           navbar as mobile; the full horizontal nav only shows from 1100px
           up, comfortably inside "desktop grande" territory. */
        @media (max-width: 1099px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .navbar-root { padding: 10px 16px !important; gap: 8px !important; }
          .navbar-hire { padding: 10px 16px !important; font-size: 12px !important; }
          .navbar-lang-toggle button { padding: 8px 10px !important; font-size: 10.5px !important; }
        }

        /* Mobile (below md, 768px): stack the two-column content layouts. */
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cv-grid { grid-template-columns: 1fr !important; }
          .cv-sidebar { flex-direction: row !important; flex-wrap: wrap !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .fields-grid { grid-template-columns: 1fr !important; }
        }

        /* Small phones (below sm, 640px): the 2-up stats row is still tight
           with 4-digit counters, and the wordmark competes with the hire
           button + language toggle for space. */
        @media (max-width: 639px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .navbar-wordmark { display: none !important; }
        }
      `}</style>

      <div className="grid-bg" />
      <div className="glow-orb" style={{ width: "720px", height: "680px", background: "#2f7cff26", top: "-160px", left: "-140px" }} />
      <div className="glow-orb" style={{ width: "1200px", height: "560px", background: "#5c9bff22", top: "10px", right: "-260px" }} />
    </>
  );
}
