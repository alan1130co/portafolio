import { COLORS } from "../../theme/colors";
import { useLanguage } from "../../context/LanguageContext";

const STATUS_TEXT = {
  es: "CONFIGURANDO SITIO EN ESPAÑOL...",
  en: "CONFIGURING SITE IN ENGLISH...",
};

export default function LanguageTransitionOverlay() {
  const { phase, targetLang, sweepInMs, holdMs, sweepOutMs } = useLanguage();

  if (phase === "idle") return null;

  const panelStyle = {
    position: "absolute", inset: 0,
    background: `${COLORS.accent}66`,
    transformOrigin: "50% 50%",
  };

  if (phase === "in") {
    panelStyle.animation = `overlaySweepIn ${sweepInMs}ms cubic-bezier(0.4,0,0.2,1) forwards`;
  } else if (phase === "hold") {
    panelStyle.transform = "scaleY(1)";
  } else if (phase === "out") {
    panelStyle.animation = `overlaySweepOut ${sweepOutMs}ms cubic-bezier(0.4,0,0.2,1) forwards`;
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", pointerEvents: "auto" }}>
      <style>{`
        @keyframes overlaySweepIn { from { transform: scaleY(0.02); } to { transform: scaleY(1); } }
        @keyframes overlaySweepOut { from { transform: scaleY(1); } to { transform: scaleY(0.02); } }
        @keyframes overlayLineSweep {
          0% { transform: translateY(0); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
      <div style={panelStyle} />
      {phase === "hold" && (
        <div style={{
          position: "absolute", left: 0, bottom: 0, width: "100%", height: "3px",
          background: "#ffffff",
          boxShadow: `0 0 24px 6px #ffffffcc, 0 0 60px 18px ${COLORS.accentPale}aa`,
          animation: `overlayLineSweep ${holdMs}ms linear forwards`,
        }} />
      )}
      <div style={{
        position: "absolute", bottom: "28px", right: "28px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "#f5f9ff",
        textShadow: "0 2px 14px rgba(0,0,0,0.45)",
      }}>
        {STATUS_TEXT[targetLang]}
      </div>
    </div>
  );
}
