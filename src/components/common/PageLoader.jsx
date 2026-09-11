import { COLORS } from "../../theme/colors";

export default function PageLoader() {
  return (
    <section
      className="page"
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          border: `3px solid ${COLORS.border}`,
          borderTopColor: COLORS.accent,
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
