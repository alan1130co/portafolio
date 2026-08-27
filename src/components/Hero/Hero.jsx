"use client";

import { useState } from "react";
import Image from "next/image";
import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";
import { useLanguage } from "../../context/LanguageContext";
import StatusDot from "../common/StatusDot";
import TerminalText from "../common/TerminalText";
import CountUp from "../common/CountUp";
import SocialIcon from "../common/SocialIcon";
import { socialRow } from "../../data/contact";
import heroPhoto from "../../assets/img/hero-photo.jpg";

// The photo box is fixed at 320px (capped at 78vw on narrow viewports) at
// every breakpoint. next/image generates the responsive webp/avif variants
// from this single source on demand (via Vercel's image optimizer), so the
// old manual mobile/desktop webp/jpg files are no longer needed.
const HERO_PHOTO_SIZES = "(max-width: 767px) 78vw, 320px";

const nameGradientStyle = {
  backgroundImage: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentBright} 55%, ${COLORS.accentPale})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 40px ${COLORS.accent}66`,
};

export default function Hero({ goTo }) {
  const [titleDone, setTitleDone] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="page" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
      <div className="hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "100px", padding: "7px 16px", marginBottom: "26px" }}>
            <StatusDot />
            <span style={{ color: COLORS.textMuted, fontSize: "11.5px", fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.5px" }}>{t.hero.badge}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(38px, 5.6vw, 60px)", fontWeight: 800, lineHeight: 1.06, marginBottom: "20px", color: COLORS.text }}>
            {t.hero.greeting}<br />
            <span style={nameGradientStyle}><TerminalText text="Alan Coneo" speed={48} onDone={() => setTitleDone(true)} /></span>
          </h1>
          <div
            style={titleDone ? { animation: "fadeUp 0.5s ease both" } : { opacity: 0, pointerEvents: "none" }}
            aria-hidden={!titleDone}
          >
            <p style={{ color: COLORS.textMuted, fontSize: "16px", lineHeight: "1.85", maxWidth: "540px", marginBottom: "32px" }}>
              {t.hero.intro}
            </p>
            <div className="cv-row" style={{ marginBottom: "26px" }}>
              <button onClick={() => goTo("curriculum")} className="cv-button" tabIndex={titleDone ? 0 : -1} style={{ display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "10px", padding: "13px 22px", fontFamily: "var(--font-jbmono), monospace", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                &gt;_ {t.hero.cvButton}
              </button>
              {socialRow.map((s) => (
                <a key={s.title} href={s.href} target="_blank" rel="noreferrer" title={s.title} className="social-icon" tabIndex={titleDone ? 0 : -1} style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", textDecoration: "none" }}>
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "relative", justifySelf: "center" }}>
          <div style={{ position: "relative", width: "320px", maxWidth: "78vw", aspectRatio: "1 / 1.12", borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.borderStrong}`, boxShadow: `0 0 0 1px ${COLORS.bg}, 0 30px 60px rgba(0,0,0,0.5)` }}>
            <Image
              src={heroPhoto}
              alt="Alan Coneo"
              fill
              sizes={HERO_PHOTO_SIZES}
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 0 1px ${COLORS.accent}25` }} />
          </div>
          <div style={{ position: "absolute", bottom: "-16px", right: "-8px", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "100px", padding: "9px 18px", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", boxShadow: "0 10px 30px rgba(0,0,0,0.45)" }}>
            <StatusDot /><span style={{ color: COLORS.text, fontSize: "12px", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}>{t.hero.available}</span>
          </div>
        </div>
      </div>
      <div className="stats-grid">
        {t.stats.map((s, i) => {
          const isAccentSuffix = s.suffix.includes("+");
          return (
            <div key={s.label} className={CARD_SURFACE_CLASS} style={{ borderRadius: "14px", padding: "22px 16px", background: "linear-gradient(160deg, #182030, #141b26)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2px", fontFamily: "var(--font-sora), sans-serif", fontSize: "30px", fontWeight: 800, color: COLORS.text, marginBottom: "6px" }}>
                <CountUp value={s.value} suffix="" delay={i * 80} />
                <span style={isAccentSuffix ? { color: COLORS.accentElectric, textShadow: `0 0 10px ${COLORS.accentElectric}, 0 0 22px ${COLORS.accentElectric}aa, 0 0 40px ${COLORS.accent}80` } : { color: COLORS.accentBright }}>{s.suffix}</span>
              </div>
              <div style={{ color: COLORS.textFaint, fontSize: "10.5px", fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.5px" }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
