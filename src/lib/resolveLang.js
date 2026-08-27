const LANG_COOKIE_KEY = "lang";

// Server-side equivalent of the old client-only detection: a saved
// preference (now a cookie instead of localStorage, since only cookies are
// readable during SSR) wins, otherwise fall back to the Accept-Language
// request header (the server-side counterpart of navigator.language).
export function resolveInitialLang(cookieStore, headerList) {
  const stored = cookieStore.get(LANG_COOKIE_KEY)?.value;
  if (stored === "es" || stored === "en") return stored;

  const acceptLanguage = headerList.get("accept-language") || "";
  const primary = acceptLanguage.split(",")[0]?.trim().toLowerCase() || "";
  return primary.startsWith("es") ? "es" : "en";
}
