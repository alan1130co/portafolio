import "./globals.css";
import { sora, inter, jetbrainsMono } from "../assets/fonts/fonts";

export const metadata = {
  title: "alan.dev",
  description: "Web site created using create-react-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
