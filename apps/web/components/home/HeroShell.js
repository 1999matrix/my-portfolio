"use client";

import { useRef } from "react";
import { HeroProbeProvider } from "@/components/hero/HeroProbeContext.js";
import { ProbeCursor } from "@/components/shell/ProbeCursor.js";

/**
 * Client shell: probe cursor + R3F context only.
 * @param {{ children: React.ReactNode }} props
 */
export function HeroShell({ children }) {
  const heroRef = useRef(null);

  return (
    <HeroProbeProvider>
      <section className="site-shell py-12 md:py-16">
        <div ref={heroRef} className="hero-grid relative [@media(pointer:fine)]:cursor-none">
          <ProbeCursor containerRef={heroRef} />
          {children}
        </div>
      </section>
    </HeroProbeProvider>
  );
}
