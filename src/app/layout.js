import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sora, inter, jetbrainsMono } from "../assets/fonts/fonts";

const SITE_URL = "https://www.alan-dev.site";
const DESCRIPTION = "Desarrollador de software full-stack especializado en soluciones web y móviles eficientes, escalables y orientadas a resultados.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "alan.dev — Alan Coneo",
  description: DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "alan.dev — Alan Coneo",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "alan.dev",
    images: ["/logo512.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "alan.dev — Alan Coneo",
    description: DESCRIPTION,
    images: ["/logo512.png"],
  },
};

export const viewport = {
  themeColor: "#000000",
};

// Hides #loading-overlay as soon as the Hero photo has actually loaded (or
// errored) — not on a fixed timer. Runs as a plain parser-blocking inline
// script, so it fires the instant the browser reaches this point in the
// HTML stream, independent of React hydration. Falls back to `window.load`
// (covers the case where the hero <img> isn't found yet) and a 6s hard
// safety net so the overlay can never get stuck if some listener never
// fires.
const LOADING_OVERLAY_SCRIPT = `(function(){
  var overlay = document.getElementById("loading-overlay");
  if (!overlay) return;
  var textEl = document.getElementById("loading-overlay-text");
  var done = false;
  var pollId = null;
  function reveal(){
    if (done) return;
    done = true;
    if (pollId) clearInterval(pollId);
    if (textEl) textEl.textContent = "Bienvenido";
    setTimeout(function(){ overlay.classList.add("is-hidden"); }, 450);
  }
  function heroReady(){
    var img = document.getElementById("hero-image");
    return !!img && img.complete && img.naturalWidth > 0;
  }
  function attachHeroListeners(){
    var img = document.getElementById("hero-image");
    if (!img) return;
    img.addEventListener("load", reveal, { once: true });
    img.addEventListener("error", reveal, { once: true });
  }
  if (heroReady()) {
    reveal();
  } else {
    // Event listeners are the fast path; a short poll is a resilience
    // net for the rare case a listener attaches after its event already
    // fired (still checking the same real signal, not a fixed reveal
    // time) — window.load and a 6s hard cap are the final backstops.
    pollId = setInterval(function(){ if (heroReady()) reveal(); }, 200);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", attachHeroListeners, { once: true });
    } else {
      attachHeroListeners();
    }
    window.addEventListener("load", reveal, { once: true });
    setTimeout(reveal, 6000);
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div id="loading-overlay" role="status" aria-live="polite">
          <span className="loading-overlay__cursor" aria-hidden="true">
            &gt;<span>_</span>
          </span>
          <span id="loading-overlay-text" className="loading-overlay__text">Cargando...</span>
        </div>
        <script dangerouslySetInnerHTML={{ __html: LOADING_OVERLAY_SCRIPT }} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
