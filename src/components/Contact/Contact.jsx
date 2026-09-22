"use client";

import { COLORS } from "../../theme/colors";
import { contactCards } from "../../data/contact";
import { useLanguage } from "../../context/LanguageContext";
import { translationsContact } from "../../data/translations.contact";
import ContactCard from "./ContactCard";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translationsContact[lang];

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontFamily: "var(--font-jbmono), monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; {t.eyebrow}</p>
        <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "34px", fontWeight: 800 }}>{t.heading}</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
        {contactCards.map((c, i) => <ContactCard key={c.num} c={c} copy={t.cards[i]} />)}
      </div>
    </section>
  );
}
