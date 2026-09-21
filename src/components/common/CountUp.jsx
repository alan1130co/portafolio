"use client";

import { useEffect, useState } from "react";

// Renders the final value by default (matches SSR, zero timers, zero
// layout-affecting work) — the count-from-0 animation is an opt-in layer
// the caller enables only on desktop with no-reduced-motion. `delay`
// staggers the start of each instance so that when several CountUps mount
// together (the Hero stats row), their requestAnimationFrame loops don't
// all compete for the main thread in the same frames.
export default function CountUp({ value, suffix, duration = 650, delay = 0, animated = false }) {
  // Only holds in-progress animation frames — the static value is read
  // straight from the `value` prop (below) so there's nothing to
  // synchronize via an effect when `animated` is false.
  const [display, setDisplay] = useState(null);
  useEffect(() => {
    if (!animated) return;
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
  }, [animated, value, duration, delay]);
  return <span>{animated && display !== null ? display : value}{suffix}</span>;
}
