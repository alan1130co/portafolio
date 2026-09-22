"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { COLORS } from "./theme/colors";
import { LanguageProvider } from "./context/LanguageContext";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/Hero/Hero";
import SectionSkeleton from "./components/common/SectionSkeleton";
import useDesktopMotion from "./hooks/useDesktopMotion";

// Named loaders (not just the lazy() calls) so the idle/pointerdown
// prefetch below and React.lazy can both trigger the same import() —
// dynamic import() is cached by specifier, so calling a loader early just
// warms that cache; lazy()'s own later call resolves instantly from it.
const loadServices = () => import("./components/Services/Services");
const loadResume = () => import("./components/Resume/Resume");
const loadProjects = () => import("./components/Projects/Projects");
const loadContact = () => import("./components/Contact/Contact");

const Services = lazy(loadServices);
const Resume = lazy(loadResume);
const Projects = lazy(loadProjects);
const Contact = lazy(loadContact);
// Desktop-only sweep transition (see LanguageContext) — lazy so its chunk
// is only requested once effectsAllowed is true, never on mobile.
const LanguageTransitionOverlay = lazy(() => import("./components/layout/LanguageTransitionOverlay"));

const SECTION_LOADERS = {
  servicios: loadServices,
  curriculum: loadResume,
  proyectos: loadProjects,
  contacto: loadContact,
};

export default function PortfolioApp() {
  const [page, setPage] = useState("hero");
  const effectsAllowed = useDesktopMotion();

  // Warm every lazy section's chunk once the browser is idle, after the
  // `load` event so this never competes with the hero's LCP/image work.
  useEffect(() => {
    let idleId;
    let timeoutId;
    const prefetchAll = () => {
      loadServices();
      loadResume();
      loadProjects();
      loadContact();
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(prefetchAll, { timeout: 3000 });
      } else {
        timeoutId = window.setTimeout(prefetchAll, 1500);
      }
    };
    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const goTo = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Fires on the first touch/pointer contact with a nav button — well
  // before its click event — so a tap on "Servicios" starts that chunk's
  // download immediately instead of waiting for the full tap gesture.
  const prefetchSection = (id) => {
    SECTION_LOADERS[id]?.();
  };

  return (
    <LanguageProvider>
      <div style={{ color: COLORS.text, fontFamily: "var(--font-inter), sans-serif", overflowX: "hidden" }}>
        <Background />

        <Navbar page={page} goTo={goTo} prefetchSection={prefetchSection} />

        {page === "hero" && <Hero goTo={goTo} />}
        <Suspense fallback={<SectionSkeleton variant={page} />}>
          {page === "servicios" && <Services />}
          {page === "curriculum" && <Resume />}
          {page === "proyectos" && <Projects />}
          {page === "contacto" && <Contact />}
        </Suspense>

        {effectsAllowed && (
          <Suspense fallback={null}>
            <LanguageTransitionOverlay />
          </Suspense>
        )}
      </div>
    </LanguageProvider>
  );
}
