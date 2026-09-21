// The full string is always the rendered text — no JS ever generates it,
// so it's present in the initial HTML for LCP/SEO/accessibility on every
// device. `animated` is an opt-in visual layer on top: a pure-CSS
// steps()-timed clip-path reveal (no timers, no per-character re-renders,
// no forced reflow), gated by the caller to desktop + no-reduced-motion.
export default function TerminalText({ text, speed = 48, animated = false }) {
  if (!animated) return <span>{text}</span>;

  const durationMs = text.length * speed;
  return (
    <span
      className="type-effect"
      style={{
        "--type-duration": `${durationMs}ms`,
        "--char-count": text.length,
      }}
    >
      {text}
    </span>
  );
}
