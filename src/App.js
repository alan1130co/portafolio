import { useState } from "react";
import { COLORS } from "./theme/colors";
import { LanguageProvider } from "./context/LanguageContext";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import LanguageTransitionOverlay from "./components/layout/LanguageTransitionOverlay";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Resume from "./components/Resume/Resume";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

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
        {page === "servicios" && <Services />}
        {page === "curriculum" && <Resume />}
        {page === "proyectos" && <Projects />}
        {page === "contacto" && <Contact />}

        <LanguageTransitionOverlay />
      </div>
    </LanguageProvider>
  );
}
