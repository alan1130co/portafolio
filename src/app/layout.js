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

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
