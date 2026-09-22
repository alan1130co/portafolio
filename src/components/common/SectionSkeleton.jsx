import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";

// Placeholder block sizes are calibrated against the real rendered content
// (measured on a 360px mobile viewport) so swapping skeleton -> real
// content moves the page height by only a few px instead of the ~1000px+
// jump the previous single centered spinner caused. Static, no shimmer —
// consistent with the rest of the site being motion-free on mobile.
const block = (height, extra) => ({
  minHeight: height,
  borderRadius: "14px",
  background: COLORS.bgPanel,
  border: `1px solid ${COLORS.border}`,
  ...extra,
});

function ServicesSkeleton() {
  return (
    <div className="services-grid">
      {[314, 314, 336, 372].map((h, i) => (
        <div key={i} className={CARD_SURFACE_CLASS} style={block(h, { borderRadius: "16px" })} />
      ))}
    </div>
  );
}

function ResumeSkeleton() {
  return (
    <div className="cv-grid">
      <div className="cv-sidebar" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={block(47, { borderRadius: "10px" })} />
        ))}
      </div>
      <div style={block(900)} />
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <>
      <div style={{ marginBottom: "44px" }}>
        <div style={block(16, { width: "90px", marginBottom: "10px" })} />
        <div style={block(34, { width: "220px" })} />
      </div>
      <div className={CARD_SURFACE_CLASS} style={block(398, { borderRadius: "18px" })} />
    </>
  );
}

function ContactSkeleton() {
  return (
    <>
      <div style={{ marginBottom: "40px" }}>
        <div style={block(16, { width: "90px", marginBottom: "10px" })} />
        <div style={block(34, { width: "260px" })} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={CARD_SURFACE_CLASS} style={block(170, { borderRadius: "16px" })} />
        ))}
      </div>
    </>
  );
}

const VARIANTS = {
  servicios: ServicesSkeleton,
  curriculum: ResumeSkeleton,
  proyectos: ProjectsSkeleton,
  contacto: ContactSkeleton,
};

export default function SectionSkeleton({ variant }) {
  const Variant = VARIANTS[variant];
  if (!Variant) return null;
  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }} aria-busy="true" aria-live="polite">
      <Variant />
    </section>
  );
}
