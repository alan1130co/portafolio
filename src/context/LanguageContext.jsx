import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { translations } from "../data/translations";

const SWEEP_IN_MS = 240;
const HOLD_MS = 420;
const SWEEP_OUT_MS = 220;

// Split in two: content (lang/t) changes rarely, while transition (phase)
// changes several times per language toggle. Keeping them in one context
// value meant every consumer of `t` (Hero, Navbar, Resume tabs, ...) — not
// just the overlay — re-rendered on every phase tick of the sweep animation.
const LanguageContentContext = createContext(null);
const LanguageTransitionContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("es");
  const [phase, setPhase] = useState("idle"); // "idle" | "in" | "hold" | "out"
  const [targetLang, setTargetLang] = useState("es");
  const targetLangRef = useRef("es");
  const phaseRef = useRef("idle");
  const pendingRestartRef = useRef(false);
  const timersRef = useRef([]);

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const updatePhase = (next) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const startCycle = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    updatePhase("in");
    schedule(() => {
      setLangState(targetLangRef.current);
      updatePhase("hold");
      schedule(() => {
        updatePhase("out");
        schedule(() => {
          updatePhase("idle");
          if (pendingRestartRef.current) {
            pendingRestartRef.current = false;
            startCycle();
          }
        }, SWEEP_OUT_MS);
      }, HOLD_MS);
    }, SWEEP_IN_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((nextLang) => {
    if (nextLang === targetLangRef.current) return;
    targetLangRef.current = nextLang;
    setTargetLang(nextLang);

    if (phaseRef.current === "idle") {
      startCycle();
    } else if (phaseRef.current === "out") {
      // Let the current reveal finish cleanly, then cover again for the new target.
      pendingRestartRef.current = true;
    }
    // If phase is "in" or "hold", the running cycle already reads
    // targetLangRef.current when it applies the swap — no restart needed,
    // which avoids any visual snap from interrupting an in-flight sweep.
  }, [startCycle]);

  const contentValue = useMemo(() => ({
    lang, setLang, t: translations[lang],
  }), [lang, setLang]);

  const transitionValue = useMemo(() => ({
    phase, targetLang,
    sweepInMs: SWEEP_IN_MS, holdMs: HOLD_MS, sweepOutMs: SWEEP_OUT_MS,
  }), [phase, targetLang]);

  return (
    <LanguageContentContext.Provider value={contentValue}>
      <LanguageTransitionContext.Provider value={transitionValue}>
        {children}
      </LanguageTransitionContext.Provider>
    </LanguageContentContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContentContext);
}

export function useLanguageTransition() {
  return useContext(LanguageTransitionContext);
}
