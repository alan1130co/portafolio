import { createContext, useContext, useRef, useState } from "react";
import { translations } from "../data/translations";

const SWEEP_IN_MS = 240;
const HOLD_MS = 420;
const SWEEP_OUT_MS = 220;

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("es");
  const [phase, setPhase] = useState("idle"); // "idle" | "in" | "hold" | "out"
  const [targetLang, setTargetLang] = useState("es");
  const targetLangRef = useRef("es");
  const pendingRestartRef = useRef(false);
  const timersRef = useRef([]);

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const startCycle = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setPhase("in");
    schedule(() => {
      setLangState(targetLangRef.current);
      setPhase("hold");
      schedule(() => {
        setPhase("out");
        schedule(() => {
          setPhase("idle");
          if (pendingRestartRef.current) {
            pendingRestartRef.current = false;
            startCycle();
          }
        }, SWEEP_OUT_MS);
      }, HOLD_MS);
    }, SWEEP_IN_MS);
  };

  const setLang = (nextLang) => {
    if (nextLang === targetLangRef.current) return;
    targetLangRef.current = nextLang;
    setTargetLang(nextLang);

    if (phase === "idle") {
      startCycle();
    } else if (phase === "out") {
      // Let the current reveal finish cleanly, then cover again for the new target.
      pendingRestartRef.current = true;
    }
    // If phase is "in" or "hold", the running cycle already reads
    // targetLangRef.current when it applies the swap — no restart needed,
    // which avoids any visual snap from interrupting an in-flight sweep.
  };

  return (
    <LanguageContext.Provider value={{
      lang, setLang, t: translations[lang], phase, targetLang,
      sweepInMs: SWEEP_IN_MS, holdMs: HOLD_MS, sweepOutMs: SWEEP_OUT_MS,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
