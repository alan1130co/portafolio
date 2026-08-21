import { useState, useEffect } from "react";
import { COLORS } from "../../theme/colors";

export default function TerminalText({ text, speed = 42, onDone }) {
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
