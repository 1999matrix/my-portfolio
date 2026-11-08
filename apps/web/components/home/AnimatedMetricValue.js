"use client";

/**
 * Adapted from 21st.dev #1844 (preetsuthar17/animated-counter) — spring count pattern.
 * Restyled for DB proof strings like "−40%".
 */

import { motion, useMotionValueEvent, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useMemo, useState } from "react";

function parseMetricValue(raw) {
  const trimmed = String(raw).trim();
  const sign = trimmed.startsWith("−") || trimmed.startsWith("-") ? "−" : "";
  const numeric = parseInt(trimmed.replace(/[^0-9]/g, ""), 10);
  return {
    sign,
    value: Number.isFinite(numeric) ? numeric : 0,
    suffix: trimmed.includes("%") ? "%" : "",
  };
}

function MetricText({ sign, display, suffix, className }) {
  return (
    <p
      className={`font-display text-3xl tabular-nums text-[var(--cp-accent-strong)] md:text-4xl ${className}`}
    >
      {sign}
      <motion.span>{display}</motion.span>
      {suffix}
    </p>
  );
}

export function AnimatedMetricValue({ value, className = "" }) {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <MetricText
        sign={parsed.sign}
        display={parsed.value}
        suffix={parsed.suffix}
        className={className}
      />
    );
  }

  return <AnimatedMetricInner parsed={parsed} className={className} />;
}

function AnimatedMetricInner({ parsed, className }) {
  const spring = useSpring(0, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    spring.set(parsed.value);
  }, [parsed.value, spring]);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  return (
    <MetricText
      sign={parsed.sign}
      display={display}
      suffix={parsed.suffix}
      className={className}
    />
  );
}
