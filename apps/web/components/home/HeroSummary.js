"use client";

import { useEffect, useState } from "react";

/** @param {{ summary: string }} props */
export function HeroSummary({ summary }) {
  const [show, setShow] = useState(false);

  // Defer long summary so hero heading stays LCP (prod mobile target <2.5s)
  useEffect(() => {
    const reveal = () => setShow(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(reveal, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const timer = window.setTimeout(reveal, 180);
    return () => window.clearTimeout(timer);
  }, []);

  if (!show) {
    return <section className="site-shell pb-8 md:pb-12" aria-label="Summary" />;
  }

  return (
    <section className="site-shell pb-8 md:pb-12" aria-label="Summary">
      <p className="prose-block text-sm text-[var(--text-secondary)]">{summary}</p>
    </section>
  );
}
