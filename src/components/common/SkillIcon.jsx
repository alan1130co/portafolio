import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiMongodb, SiPostgresql, SiDjango,
  SiGit, SiGithub, SiDocker,
} from "react-icons/si";

// Simple Icons ship each logo in its own 24x24 viewBox, and every glyph
// is already centered within that box (verified with getBBox()). What
// differs is how much of the box the ink actually covers: React/Git
// draw edge-to-edge, while marks like MongoDB's leaf or Tailwind's wave
// only fill a fraction of it, which makes them read as smaller even
// though the rendered <svg> element is the same size. Sizes below are
// solved per icon (target size = 24 / sqrt(coverageX * coverageY),
// measured against a live render) so the visible ink — not the empty
// canvas around it — ends up at a consistent visual weight.
const ICONS = {
  react: { Icon: SiReact, color: "#61DAFB", size: 26 },
  nextjs: { Icon: SiNextdotjs, color: "#ffffff", size: 24 },
  typescript: { Icon: SiTypescript, color: "#3178C6", size: 24 },
  tailwindcss: { Icon: SiTailwindcss, color: "#38BDF8", size: 31 },
  nodejs: { Icon: SiNodedotjs, color: "#3C873A", size: 26 },
  mongodb: { Icon: SiMongodb, color: "#47A248", size: 36 },
  postgresql: { Icon: SiPostgresql, color: "#4169E1", size: 25 },
  django: { Icon: SiDjango, color: "#44B78B", size: 27 },
  git: { Icon: SiGit, color: "#F05032", size: 24 },
  github: { Icon: SiGithub, color: "#ffffff", size: 24 },
  docker: { Icon: SiDocker, color: "#2496ED", size: 28 },
};

export default function SkillIcon({ name }) {
  const entry = ICONS[name];
  if (!entry) return null;
  const { Icon, color, size } = entry;
  return <Icon size={size} color={color} />;
}
