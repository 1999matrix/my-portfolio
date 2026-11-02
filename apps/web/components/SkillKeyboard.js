"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Manish-style keyboard hint: press a letter to highlight a skill group.
 * Only encodes real skill data passed from the server.
 */
export function SkillKeyboard({ skillGroups }) {
  const [active, setActive] = useState(null);

  const letterMap = useMemo(() => {
    const map = new Map();
    skillGroups.forEach((group, index) => {
      const letter = group.group.charAt(0).toUpperCase();
      if (!map.has(letter)) map.set(letter, index);
    });
    return map;
  }, [skillGroups]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const letter = event.key.toUpperCase();
      if (letterMap.has(letter)) {
        setActive(letterMap.get(letter));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [letterMap]);

  return (
    <section className="site-shell py-16" aria-labelledby="skills-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="skills-heading" className="font-display text-2xl">
            Skills
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Press a letter key to jump to a group.
          </p>
        </div>
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <li
            key={group.group}
            className={`skill-panel ${active === index ? "skill-panel--active" : ""}`}
          >
            <h3 className="font-mono text-xs text-[var(--signal)]">
              {group.group}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {group.skills.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
