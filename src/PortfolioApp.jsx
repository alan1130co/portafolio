"use client";

import { COLORS } from "./theme/colors";
import { LanguageProvider } from "./context/LanguageContext";
import Background from "./components/layout/Background";

export default function PortfolioApp({ initialLang }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <div style={{
        background: `radial-gradient(950px 760px at 4% -6%, ${COLORS.accent}2a, transparent 60%), radial-gradient(1300px 640px at 78% 18%, ${COLORS.accentPale}1e, transparent 62%), ${COLORS.bg}`,
        minHeight: "100vh", color: COLORS.text, fontFamily: "var(--font-inter), sans-serif", overflowX: "hidden",
        boxShadow: "inset 0 0 200px rgba(0,0,0,0.3)",
      }}>
        <Background />
      </div>
    </LanguageProvider>
  );
}
