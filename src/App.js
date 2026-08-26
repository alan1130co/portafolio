import { lazy, Suspense, useState } from "react";
import { COLORS } from "./theme/colors";
import { LanguageProvider } from "./context/LanguageContext";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import LanguageTransitionOverlay from "./components/layout/LanguageTransitionOverlay";
import Hero from "./components/Hero/Hero";

const Services = lazy(() => import("./components/Services/Services"));
const Resume = lazy(() => import("./components/Resume/Resume"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));

export default function Portfolio() {
  const [page, setPage] = useState("hero");

  const goTo = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <LanguageProvider>
      <div style={{
        background: `radial-gradient(950px 760px at 4% -6%, ${COLORS.accent}2a, transparent 60%), radial-gradient(1300px 640px at 78% 18%, ${COLORS.accentPale}1e, transparent 62%), ${COLORS.bg}`,
        minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden",
        boxShadow: "inset 0 0 200px rgba(0,0,0,0.3)",
      }}>
        <Background />

        <Navbar page={page} goTo={goTo} />

        {page === "hero" && <Hero goTo={goTo} />}
        <Suspense fallback={null}>
          {page === "servicios" && <Services />}
          {page === "curriculum" && <Resume />}
          {page === "proyectos" && <Projects />}
          {page === "contacto" && <Contact />}
        </Suspense>

        <LanguageTransitionOverlay />
      </div>
    </LanguageProvider>
  );
}
