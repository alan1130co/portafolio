"use client";

import { useLanguage } from "../../context/LanguageContext";
import { translationsServices } from "../../data/translations.services";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const { lang } = useLanguage();
  const t = translationsServices[lang];

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div className="services-grid">
        {t.items.map((s) => <ServiceCard key={s.num} service={s} />)}
      </div>
    </section>
  );
}
