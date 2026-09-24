"use client";

import { useSyncExternalStore } from "react";
import { COLORS } from "../../theme/colors";
import { CARD_SURFACE_CLASS } from "../../theme/cardStyle";
import { useLanguage } from "../../context/LanguageContext";
import StatusDot from "../common/StatusDot";
import TerminalText from "../common/TerminalText";
import CountUp from "../common/CountUp";
import SocialIcon from "../common/SocialIcon";
import { socialRow } from "../../data/contact";

// The photo box is fixed at 320px (capped at 78vw on narrow viewports) at
// every breakpoint, so the real widths this box ever requests (at up to 3x
// DPR) top out around 960px. Pre-generated as static files in /public
// (scripts/generate-hero-images.js) instead of going through next/image's
// on-demand optimizer — that endpoint is a serverless function, and this
// image is above-the-fold/LCP on every visit, so it can't afford that
// extra request hop on a slow connection.
const HERO_WIDTHS = [384, 480, 640, 750, 828, 960];
const HERO_SRCSET_AVIF = HERO_WIDTHS.map((w) => `/hero/hero-${w}.avif ${w}w`).join(", ");
const HERO_SRCSET_WEBP = HERO_WIDTHS.map((w) => `/hero/hero-${w}.webp ${w}w`).join(", ");
const HERO_PHOTO_SIZES = "(max-width: 767px) 78vw, 320px";
// Tiny blurred JPEG of the same photo, inlined as the box's CSS background
// so it's visible the instant the stylesheet applies — no JS/placeholder
// prop needed, since the <img> covers it completely once it decodes.
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAYABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYBAgX/xAAeEAACAgIDAQEAAAAAAAAAAAABAwACBBEFITESE//EABYBAQEBAAAAAAAAAAAAAAAAAAACA//EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AbMpxSv6EriPL6bMyczkxd/4jyGJyIU4KPhibS5C61pDjffcmjrFwvvuEJqh//9k=";

const nameGradientStyle = {
  backgroundImage: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentBright} 55%, ${COLORS.accentPale})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  textShadow: `0 0 40px ${COLORS.accent}66`,
};

const DESKTOP_MOTION_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribeDesktopMotion(callback) {
  const mq = window.matchMedia(DESKTOP_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getDesktopMotionSnapshot() {
  return window.matchMedia(DESKTOP_MOTION_QUERY).matches;
}
// Server (and first client paint, before hydration) never has motion
// enabled — the static text/final values are what SSR renders, so this
// keeps that render in sync and avoids a hydration mismatch.
function getServerSnapshot() {
  return false;
}

export default function Hero({ goTo }) {
  const { t } = useLanguage();
  // False on the server and on first paint (static text everywhere, no
  // typing timers). On desktop with motion allowed, flips true post-
  // hydration and layers the CSS-only typing reveal + count-up on top of
  // the already-visible content.
  const effectsOn = useSyncExternalStore(subscribeDesktopMotion, getDesktopMotionSnapshot, getServerSnapshot);

  const titleDurationSec = effectsOn ? ("Alan Coneo".length * 48) / 1000 : 0;

  return (
    <section className="page page--fill" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
      <div className="hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: COLORS.bgPanel, border: `1px solid ${COLORS.border}`, borderRadius: "100px", padding: "7px 16px", marginBottom: "26px" }}>
            <StatusDot />
            <span style={{ color: COLORS.textMuted, fontSize: "11.5px", fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.5px" }}>{t.hero.badge}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(38px, 5.6vw, 60px)", fontWeight: 800, lineHeight: 1.06, marginBottom: "20px", color: COLORS.text }}>
            {t.hero.greeting}<br />
            <span style={nameGradientStyle}><TerminalText text="Alan Coneo" speed={48} animated={effectsOn} /></span>
          </h1>
          <div
            style={effectsOn ? { animation: `fadeUp 0.5s ease ${titleDurationSec}s both` } : undefined}
          >
            <p style={{ color: COLORS.textMuted, fontSize: "16px", lineHeight: "1.85", maxWidth: "540px", marginBottom: "32px" }}>
              {t.hero.intro}
            </p>
            <div className="cv-row" style={{ marginBottom: "26px" }}>
              <button onClick={() => goTo("curriculum")} className="cv-button" style={{ display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "10px", padding: "13px 22px", fontFamily: "var(--font-jbmono), monospace", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                &gt;_ {t.hero.cvButton}
              </button>
              {socialRow.map((s) => (
                <a key={s.title} href={s.href} target="_blank" rel="noreferrer" title={s.title} aria-label={s.title} className="social-icon" style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", textDecoration: "none" }}>
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "relative", justifySelf: "center" }}>
          <div
            style={{
              position: "relative", width: "320px", maxWidth: "78vw", aspectRatio: "1 / 1.12", borderRadius: "20px", overflow: "hidden", border: `1px solid ${COLORS.borderStrong}`, boxShadow: `0 0 0 1px ${COLORS.bg}, 0 30px 60px rgba(0,0,0,0.5)`,
              backgroundImage: `url(${HERO_BLUR_DATA_URL})`, backgroundSize: "cover", backgroundPosition: "center top",
            }}
          >
            <link rel="preload" as="image" href="/hero/hero-960.avif" imageSrcSet={HERO_SRCSET_AVIF} imageSizes={HERO_PHOTO_SIZES} fetchPriority="high" />
            <picture>
              <source type="image/avif" srcSet={HERO_SRCSET_AVIF} sizes={HERO_PHOTO_SIZES} />
              <source type="image/webp" srcSet={HERO_SRCSET_WEBP} sizes={HERO_PHOTO_SIZES} />
              <img
                id="hero-image"
                src="/hero/hero-960.webp"
                srcSet={HERO_SRCSET_WEBP}
                sizes={HERO_PHOTO_SIZES}
                alt="Alan Coneo"
                width={960}
                height={1440}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </picture>
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
            <div key={i} className={CARD_SURFACE_CLASS} style={{ borderRadius: "14px", padding: "22px 16px", background: "linear-gradient(160deg, #182030, #141b26)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "2px", fontFamily: "var(--font-sora), sans-serif", fontSize: "30px", fontWeight: 800, color: COLORS.text, marginBottom: "6px" }}>
                <CountUp value={s.value} suffix="" delay={i * 40} animated={effectsOn} />
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
