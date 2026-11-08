"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { springPanel } from "@/lib/motion-presets";

/** Route enter: header-aligned scan + vertical clip; nav pill uses layoutId in header. */
export function RouteTransition({ children }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {!reduceMotion ? (
        <motion.div
          key={`scan-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-[4.25rem] z-30 h-px origin-left bg-[var(--cp-accent)] md:top-[4.75rem]"
          initial={{ scaleX: 0, opacity: 0.85 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
            opacity: { delay: 0.28, duration: 0.25 },
          }}
        />
      ) : null}
      <motion.div
        key={pathname}
        className="relative"
        initial={
          reduceMotion
            ? false
            : {
                clipPath: "inset(0 0 100% 0)",
                opacity: 0.94,
              }
        }
        animate={{
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                ...springPanel,
                opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              }
        }
        style={{ willChange: reduceMotion ? "auto" : "clip-path, opacity" }}
      >
        {children}
      </motion.div>
    </>
  );
}
