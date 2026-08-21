import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";

export default function TimelineEntry({ entry, isLast }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px" }}>
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: COLORS.accentBright, boxShadow: `0 0 0 4px ${COLORS.accentSoft}`, flexShrink: 0 }} />
        {!isLast && <span style={{ width: "1px", flex: 1, background: COLORS.border, marginTop: "6px" }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: "32px" }}>
        <div className={CARD_SURFACE_CLASS} style={{ borderRadius: "14px", padding: "24px 26px" }}>
          <span style={{ display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.accentBright, border: `1px solid ${COLORS.accent}40`, borderRadius: "6px", padding: "4px 10px", marginBottom: "14px" }}>
            [ TIMESTAMP: {entry.timestamp} ]
          </span>
          <h4 style={{ margin: "0 0 6px", color: COLORS.text, fontSize: "19px", fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>{entry.title}</h4>
          <p style={{ margin: "0 0 14px", color: COLORS.accentBright, fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>• {entry.org}</p>
          <p style={{ color: COLORS.textMuted, fontSize: "13.5px", lineHeight: "1.7" }}>
            <span style={{ color: COLORS.accentBright }}>&gt; </span>{entry.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
