"use client";

import { useEffect, useState } from "react";

/** @param {{ text: string }} props */
export function HeroLeadDeferred({ text }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reveal = () => setShow(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(reveal, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const timer = window.setTimeout(reveal, 250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!show) {
    return <div className="mt-4 h-[4.5rem] max-w-[var(--measure-prose)]" aria-hidden />;
  }

  return (
    <p className="type-lead mt-4 text-[var(--text-md)] text-balance">{text}</p>
  );
}
