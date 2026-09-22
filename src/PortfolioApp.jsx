"use client";

import { Suspense, lazy, useState } from "react";
import { COLORS } from "./theme/colors";
import { LanguageProvider } from "./context/LanguageContext";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import LanguageTransitionOverlay from "./components/layout/LanguageTransitionOverlay";
import Hero from "./components/Hero/Hero";
import PageLoader from "./components/common/PageLoader";

const Services = lazy(() => import("./components/Services/Services"));
const Resume = lazy(() => import("./components/Resume/Resume"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));

export default function PortfolioApp() {
  const [page, setPage] = useState("hero");

  const goTo = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <LanguageProvider>
      <div style={{ color: COLORS.text, fontFamily: "var(--font-inter), sans-serif", overflowX: "hidden" }}>
        <Background />

        <Navbar page={page} goTo={goTo} />

        <main>
          {page === "hero" && <Hero goTo={goTo} />}
          <Suspense fallback={<PageLoader />}>
            {page === "servicios" && <Services />}
            {page === "curriculum" && <Resume />}
            {page === "proyectos" && <Projects />}
            {page === "contacto" && <Contact />}
          </Suspense>
        </main>

        <LanguageTransitionOverlay />
      </div>
    </LanguageProvider>
  );
}
