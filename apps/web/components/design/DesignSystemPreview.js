"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  easeEnter,
  springDrift,
  springPanel,
  springSnappy,
  staggerChildren,
} from "@/lib/motion-presets";

const swatches = [
  { name: "Void / canvas", varName: "--cp-void" },
  { name: "Panel", varName: "--cp-panel" },
  { name: "Elevated", varName: "--cp-elevated" },
  { name: "Accent (brand)", varName: "--cp-accent" },
  { name: "State OK", varName: "--cp-state-ok" },
  { name: "State warn", varName: "--cp-state-warn" },
  { name: "State critical", varName: "--cp-state-critical" },
];

const radii = [
  { label: "Field", token: "--radius-field" },
  { label: "Control", token: "--radius-control" },
  { label: "Panel", token: "--radius-panel" },
  { label: "Shell", token: "--radius-shell" },
];

function Swatch({ name, varName }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full border border-[var(--border)]"
        style={{ background: `var(${varName})` }}
      />
      <p className="type-label">{name}</p>
      <p className="font-mono text-[10px] text-[var(--muted)]">{varName}</p>
    </div>
  );
}

function MotionChip({ label, transition, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[var(--radius-control)] border px-3 py-2 text-left text-xs transition-colors ${
        active
          ? "border-[var(--cp-accent)] bg-[var(--cp-elevated)]"
          : "border-[var(--border)] bg-[var(--cp-panel)]"
      }`}
    >
      {label}
    </button>
  );
}

export function DesignSystemPreview() {
  const reduceMotion = useReducedMotion();
  const [preset, setPreset] = useState("snappy");
  const transition =
    preset === "panel"
      ? springPanel
      : preset === "drift"
        ? springDrift
        : preset === "ease"
          ? easeEnter
          : springSnappy;

  return (
    <div className="site-shell py-[var(--layout-section)]">
      <header className="max-w-[var(--measure-prose)]">
        <p className="type-label">Control Plane · Step 2</p>
        <h1 className="font-display type-display mt-3">Design tokens</h1>
        <p className="type-lead mt-4">
          Direction A palette with editorial type and spacing. Semantic greens are status-only;
          brand accent is steel blue-gray.
        </p>
        {reduceMotion ? (
          <p className="mt-3 font-mono text-xs text-[var(--cp-state-warn)]">
            prefers-reduced-motion: on — motion demos use instant transitions.
          </p>
        ) : null}
      </header>

      <section className="mt-[var(--space-16)]">
        <h2 className="font-display type-h2">Light canvas (before / after)</h2>
        <p className="type-lead mt-3">
          Replaced warm cream <span className="font-mono text-xs">#F4F1EA</span> with cool slate{" "}
          <span className="font-mono text-xs">#E9EEF3</span> for Instrument Serif pairings.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-panel)] border border-[var(--border)] p-4">
            <p className="type-label">Before (banned warm)</p>
            <div
              className="mt-3 h-24 rounded-[var(--radius-control)] border border-[var(--border)]"
              style={{ background: "var(--cp-canvas-legacy-warm, #f4f1ea)" }}
            />
            <p className="font-display mt-4 text-2xl">Control plane</p>
          </div>
          <div className="rounded-[var(--radius-panel)] border border-[var(--border)] p-4">
            <p className="type-label">After (cool slate)</p>
            <div className="mt-3 h-24 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--cp-void)]" />
            <p className="font-display mt-4 text-2xl">Control plane</p>
          </div>
        </div>
      </section>

      <section className="mt-[var(--space-16)]">
        <h2 className="font-display type-h2">Color</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map((s) => (
            <Swatch key={s.varName} {...s} />
          ))}
        </div>
      </section>

      <section className="mt-[var(--space-16)]">
        <h2 className="font-display type-h2">Typography</h2>
        <div className="mt-6 space-y-8 rounded-[var(--radius-panel)] border border-[var(--border)] bg-[var(--cp-panel)] p-[var(--space-8)] shadow-[var(--shadow-1)]">
          <div>
            <p className="type-label">Display · Instrument Serif (OFL)</p>
            <p className="font-display type-display mt-2">Control plane</p>
          </div>
          <div>
            <p className="type-label">Heading · Instrument Serif</p>
            <p className="font-display type-h1 mt-2">Backend infrastructure</p>
          </div>
          <div>
            <p className="type-label">Lead · Source Sans 3 (OFL)</p>
            <p className="type-lead mt-2">
              Long measure prose for case studies and about copy. Max width follows editorial
              guardrails.
            </p>
          </div>
          <div>
            <p className="type-label">Mono · IBM Plex Mono (OFL)</p>
            <p className="font-mono mt-2 text-sm text-[var(--text-secondary)]">
              trace_id=8f3a · region=ap-south-1 · latency_p99=42ms
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[var(--space-16)]">
        <h2 className="font-display type-h2">Spacing & radii</h2>
        <div className="mt-6 flex flex-wrap items-end gap-[var(--space-6)]">
          {radii.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-2">
              <div
                className="h-14 w-14 border border-[var(--border)] bg-[var(--cp-elevated)]"
                style={{ borderRadius: `var(${r.token})` }}
              />
              <span className="type-label">{r.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((level) => (
            <div
              key={level}
              className="rounded-[var(--radius-panel)] bg-[var(--cp-panel)] p-[var(--space-6)]"
              style={{ boxShadow: `var(--shadow-${level})` }}
            >
              <p className="type-label">Elevation {level}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[var(--space-16)]">
        <h2 className="font-display type-h2">Motion tokens</h2>
        <p className="type-lead mt-3">
          CSS variables in <span className="font-mono text-xs">styles/tokens/motion.css</span>{" "}
          plus JS presets in <span className="font-mono text-xs">lib/motion-presets.js</span>.
        </p>
        <ul className="mt-4 grid gap-2 font-mono text-xs text-[var(--text-secondary)] sm:grid-cols-2">
          <li>--motion-duration-base: 250ms</li>
          <li>--motion-ease-out: cubic-bezier(0.22, 1, 0.36, 1)</li>
          <li>--motion-stagger-base: 60ms</li>
          <li>springSnappy · springPanel · springDrift</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <MotionChip
            label="springSnappy"
            active={preset === "snappy"}
            onClick={() => setPreset("snappy")}
          />
          <MotionChip
            label="springPanel"
            active={preset === "panel"}
            onClick={() => setPreset("panel")}
          />
          <MotionChip
            label="springDrift"
            active={preset === "drift"}
            onClick={() => setPreset("drift")}
          />
          <MotionChip
            label="easeEnter"
            active={preset === "ease"}
            onClick={() => setPreset("ease")}
          />
        </div>

        <motion.div
          key={preset}
          className="mt-8 flex h-32 items-center justify-center rounded-[var(--radius-shell)] border border-[var(--border)] bg-[var(--cp-elevated)]"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : transition}
        >
          <span className="font-mono text-sm text-[var(--cp-accent-strong)]">Replay preset</span>
        </motion.div>

        <motion.ul
          className="mt-6 space-y-2"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : staggerChildren.base,
              },
            },
          }}
        >
          {["Intro max 1.5s", "Scroll choreography", "Cursor context (desktop)"].map((line) => (
            <motion.li
              key={line}
              className="rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--cp-panel)] px-4 py-3 text-sm"
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: reduceMotion ? { duration: 0 } : springSnappy,
                },
              }}
            >
              {line}
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </div>
  );
}
