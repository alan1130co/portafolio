"use client";

import { useSyncExternalStore } from "react";

const DESKTOP_MOTION_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(callback) {
  const mq = window.matchMedia(DESKTOP_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getSnapshot() {
  return window.matchMedia(DESKTOP_MOTION_QUERY).matches;
}
// Server (and first client paint, before hydration) never has motion
// enabled — callers render the static/instant variant during that window,
// which avoids a hydration mismatch.
function getServerSnapshot() {
  return false;
}

// Shared by Hero (typing/counter effects) and LanguageContext (language
// switch sweep overlay) so both gate on the exact same breakpoint +
// reduced-motion condition, and so their dynamically-imported JS is only
// ever fetched once this resolves true.
export default function useDesktopMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
