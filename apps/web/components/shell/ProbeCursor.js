"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/media-query";
import { useHeroProbeRef } from "@/components/hero/HeroProbeContext.js";

/**
 * Desktop probe cursor — follows pointer over the hero zone.
 * Touch uses long-press preview (3B+); 3A keeps native touch on hero.
 */
export function ProbeCursor({ containerRef }) {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)", true);
  const probeRef = useHeroProbeRef();
  const dotRef = useRef(null);

  useEffect(() => {
    if (!finePointer || reduceMotion || !containerRef?.current) return undefined;

    const el = containerRef.current;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      probeRef.current.active = inside;
      if (!inside || !dotRef.current) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      probeRef.current.x = ((x / rect.width) * 2 - 1) * 0.6;
      probeRef.current.y = (-((y / rect.height) * 2 - 1)) * 0.6;
    };

    const onLeave = () => {
      probeRef.current.active = false;
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, finePointer, probeRef, reduceMotion]);

  if (!finePointer || reduceMotion) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--cp-accent)] bg-[color-mix(in_srgb,var(--cp-accent)_18%,transparent)]">
        <span className="font-mono text-[9px] text-[var(--cp-accent-strong)]">probe</span>
      </motion.div>
    </div>
  );
}
