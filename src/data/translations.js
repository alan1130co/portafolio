// Only nav + hero copy lives here — this is what LanguageContext exposes
// as `t`, and it ships in the initial bundle for every visit (Navbar and
// Hero are both above the fold). Services/resume/projects/contact copy
// lives in their own translations.<section>.js files, imported directly
// by each lazy-loaded section so that content only downloads once the
// visitor actually navigates there.
export const translations = {
  es: {
    nav: {
      pageLabels: ["Inicio", "Servicios", "Currículum", "Proyectos", "Contacto"],
      hireMe: "Contrátame ➤",
      cvTabLabels: ["./experiencia", "./educación", "./habilidades", "./sobre_mí"],
    },
    hero: {
      badge: "DESARROLLADOR FULL-STACK & FREELANCE",
      greeting: "Hola, soy",
      intro: "Desarrollador de software apasionado por la creación de soluciones digitales eficientes, escalables y orientadas a resultados.",
      cvButton: "DESCARGAR_CV",
      available: "Disponible para proyectos",
    },
    stats: [
      { value: 1, suffix: "+ Año", label: "DE EXPERIENCIA" },
      { value: 4, suffix: "+", label: "SERVICIOS CLAVE" },
      { value: 3, suffix: "+", label: "PROYECTOS Y CLIENTES" },
      { value: 2024, suffix: "+", label: "INICIO FORMACIÓN" },
    ],
  },
  en: {
    nav: {
      pageLabels: ["Home", "Services", "Résumé", "Projects", "Contact"],
      hireMe: "Hire me ➤",
      cvTabLabels: ["./experience", "./education", "./skills", "./about_me"],
    },
    hero: {
      badge: "FULL-STACK DEVELOPER & FREELANCER",
      greeting: "Hi, I'm",
      intro: "Software developer passionate about building efficient, scalable, results-driven digital solutions.",
      cvButton: "DOWNLOAD_CV",
      available: "Available for projects",
    },
    stats: [
      { value: 1, suffix: "+ Year", label: "YEARS OF EXPERIENCE" },
      { value: 4, suffix: "+", label: "KEY SERVICES" },
      { value: 3, suffix: "+", label: "PROJECTS & CLIENTS" },
      { value: 2024, suffix: "+", label: "EDUCATION START" },
    ],
  },
};
