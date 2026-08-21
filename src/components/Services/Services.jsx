import { useLanguage } from "../../context/LanguageContext";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const { t } = useLanguage();

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div className="services-grid">
        {t.services.items.map((s) => <ServiceCard key={s.num} service={s} />)}
      </div>
    </section>
  );
}
