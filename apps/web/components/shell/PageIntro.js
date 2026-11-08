"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { easeEnter } from "@/lib/motion-presets";

const INTRO_KEY = "cp-intro-v2";

/**
 * @param {{ introLine?: string | null }} props
 * DB-sourced line from layout; omit generic slogans.
 */
export function PageIntro({ introLine = null }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return undefined;
    try {
      if (sessionStorage.getItem(INTRO_KEY)) return undefined;
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      return undefined;
    }
    queueMicrotask(() => setVisible(true));
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] bg-[color-mix(in_srgb,var(--cp-void)_92%,transparent)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={reduceMotion ? { duration: 0 } : { ...easeEnter, delay: 0.85, duration: 0.45 }}
    >
      {introLine ? (
        <motion.p
          className="site-shell pt-8 font-mono text-xs text-[var(--muted)]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
        >
          {introLine}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
