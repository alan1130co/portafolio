"use client";

import { useState, useEffect } from "react";

// `delay` staggers the start of each instance so that when several CountUps
// mount together (the Hero stats row), their requestAnimationFrame loops
// don't all compete for the main thread in the same frames right as the
// page becomes interactive.
export default function CountUp({ value, suffix, duration = 650, delay = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let rafId;
    const startTimer = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(startTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, duration, delay]);
  return <span>{display}{suffix}</span>;
}
