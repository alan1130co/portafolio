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

// Dismisses #loading-overlay. Two independent paths race to call this, and
// whichever wins clears the other:
//  1. Real-readiness: the Hero photo (#hero-image) reports loaded/errored,
//     checked via its load/error events plus a poll (covers the case where
//     those events fired before the listeners were attached) and backed by
//     window.load.
//  2. A hard 4s cap, registered as the very first thing this script does,
//     before anything that could throw. Even if every readiness check
//     below fails outright (missing element, a future markup change, a
//     stalled request that never fires load/error/window.load on a bad
//     connection), this timer already exists in the browser's queue and
//     fires regardless — the overlay can never get stuck open.
// All DOM mutation here is class-toggling only (never text/children), so it
// never touches anything React's hydration reconciles — no risk of a
// hydration mismatch reverting the reveal.
const LOADING_OVERLAY_SCRIPT = `(function(){
  var overlay = document.getElementById("loading-overlay");
  if (!overlay) return;
  var done = false;
  var pollId = null;
  var hardTimeoutId = setTimeout(reveal, 4000);
  function reveal(){
    if (done) return;
    done = true;
    if (pollId) clearInterval(pollId);
    clearTimeout(hardTimeoutId);
    overlay.classList.add("is-revealing");
    setTimeout(function(){ overlay.classList.add("is-hidden"); }, 400);
  }
  try {
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
      pollId = setInterval(function(){
        try { if (heroReady()) reveal(); } catch (e) { reveal(); }
      }, 150);
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", attachHeroListeners, { once: true });
      } else {
        attachHeroListeners();
      }
      window.addEventListener("load", reveal, { once: true });
    }
  } catch (e) {
    reveal();
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
          <span className="loading-overlay__text-stack">
            <span className="loading-overlay__text loading-overlay__text--loading">Cargando...</span>
            <span className="loading-overlay__text loading-overlay__text--welcome" aria-hidden="true">Bienvenido</span>
          </span>
        </div>
        {children}
        <script dangerouslySetInnerHTML={{ __html: LOADING_OVERLAY_SCRIPT }} />
        <SpeedInsights />
      </body>
    </html>
  );
}
