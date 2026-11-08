"use client";

import { AnimatedMetricValue } from "@/components/home/AnimatedMetricValue.js";

export function MetricsStrip({ metrics }) {
  return (
    <section
      className="border-y border-[var(--border)] bg-[var(--cp-panel)]"
      aria-labelledby="metrics-heading"
    >
      <h2 id="metrics-heading" className="sr-only">
        Production metrics
      </h2>
      <div className="site-shell grid gap-10 py-12 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <AnimatedMetricValue value={metric.value} />
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
