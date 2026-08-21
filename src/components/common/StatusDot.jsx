import { COLORS } from "../../theme/colors";

export default function StatusDot() {
  return <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.status, animation: "pulseDot 2s infinite", flexShrink: 0 }} />;
}
