"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/media-query";
import { StaticGraph } from "@/components/hero/StaticGraph.js";

// shortcut: R3F loads only after idle post-paint, keeps three/r3f out of first chunk
const NetworkScene = dynamic(
  () => import("./NetworkScene.js").then((mod) => mod.NetworkScene),
  { ssr: false, loading: () => <StaticGraph /> },
);

/** @param {{ onDegrade?: () => void; overlay?: boolean }} props */
export function NetworkHero({ onDegrade: onDegradeExternal, overlay = false }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const coarsePointer = useMediaQuery("(pointer: coarse)", false);
  const narrowViewport = useMediaQuery("(max-width: 768px)", false);
  const [degraded, setDegraded] = useState(false);
  const [paintReady, setPaintReady] = useState(false);

  const onDegrade = useCallback(() => {
    setDegraded(true);
    onDegradeExternal?.();
  }, [onDegradeExternal]);
  const useStatic = reduceMotion || coarsePointer || narrowViewport || degraded;

  useEffect(() => {
    if (useStatic) return undefined;
    const enable = () => setPaintReady(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(enable, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const t = window.setTimeout(enable, 1);
    return () => window.clearTimeout(t);
  }, [useStatic]);

  const showCanvas = !useStatic && paintReady;

  const inner = showCanvas ? <NetworkScene onDegrade={onDegrade} /> : overlay ? null : <StaticGraph />;

  if (overlay) {
    if (!inner) return null;
    return <div className="absolute inset-0">{inner}</div>;
  }

  return (
    <div className="hero-canvas relative h-full min-h-[280px] overflow-hidden rounded-[var(--radius-panel)] border border-[var(--border)]">
      {inner}
    </div>
  );
}
