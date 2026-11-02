"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NetworkScene = dynamic(
  () => import("./NetworkScene.js").then((mod) => mod.NetworkScene),
  {
    ssr: false,
    loading: () => (
      <div className="hero-poster flex h-full min-h-[280px] items-center justify-center">
        <p className="font-mono text-xs text-[var(--muted)]">Loading network…</p>
      </div>
    ),
  },
);

function StaticFallback() {
  return (
    <svg
      className="hero-poster h-full min-h-[280px] w-full"
      viewBox="0 0 400 240"
      role="img"
      aria-label="Abstract network topology"
    >
      <rect width="400" height="240" fill="#0c1222" />
      {[...Array(12)].map((_, i) => {
        const x = 40 + (i % 4) * 90;
        const y = 40 + Math.floor(i / 4) * 70;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#5b8fd4" />
            {i < 11 && (
              <line
                x1={x}
                y1={y}
                x2={x + 50}
                y2={y + (i % 2 === 0 ? 30 : -20)}
                stroke="#3d8f8f"
                strokeOpacity="0.5"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function NetworkHero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);

    try {
      const canvas = document.createElement("canvas");
      setWebgl(!!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      ));
    } catch {
      setWebgl(false);
    }

    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion || !webgl) {
    return <StaticFallback />;
  }

  return (
    <div className="hero-canvas relative h-full min-h-[280px] overflow-hidden rounded-sm border border-[var(--border)]">
      <NetworkScene />
    </div>
  );
}
