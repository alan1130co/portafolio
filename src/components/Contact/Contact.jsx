import { COLORS } from "../../theme/colors";
import { contactCards } from "../../data/contact";
import { useLanguage } from "../../context/LanguageContext";
import ContactCard from "./ContactCard";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="page" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accentBright, fontSize: "13px", marginBottom: "10px" }}>&gt; {t.contact.eyebrow}</p>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "34px", fontWeight: 800 }}>{t.contact.heading}</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
        {contactCards.map((c, i) => <ContactCard key={c.num} c={c} copy={t.contact.cards[i]} />)}
      </div>
    </section>
  );
}
