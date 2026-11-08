"use client";

import { createContext, useContext, useRef } from "react";

const HeroProbeContext = createContext(null);

export function HeroProbeProvider({ children }) {
  const probeRef = useRef({ x: 0, y: 0, active: false });
  return (
    <HeroProbeContext.Provider value={probeRef}>{children}</HeroProbeContext.Provider>
  );
}

export function useHeroProbeRef() {
  const ctx = useContext(HeroProbeContext);
  if (!ctx) {
    throw new Error("useHeroProbeRef must be used within HeroProbeProvider");
  }
  return ctx;
}
