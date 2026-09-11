import { COLORS } from "../../theme/colors";

export default function StatusDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: "6px", height: "6px", flexShrink: 0 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: COLORS.status, animation: "pulseRing 2s infinite", willChange: "transform, opacity" }} />
      <span style={{ position: "relative", width: "6px", height: "6px", borderRadius: "50%", background: COLORS.status }} />
    </span>
  );
}
