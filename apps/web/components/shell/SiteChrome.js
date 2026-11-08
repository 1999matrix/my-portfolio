"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { springPanel } from "@/lib/motion-presets";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell flex items-center justify-between gap-4 py-4 md:py-5">
        <Link href="/" className="font-display text-lg tracking-tight">
          Shashwat Dwivedi
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className="relative nav-link font-ui text-sm">
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -inset-x-2 -inset-y-1 rounded-[var(--radius-control)] bg-[var(--cp-elevated)]"
                    transition={reduceMotion ? { duration: 0 } : springPanel}
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="button-ghost font-ui text-xs md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="border-t border-[var(--border)] md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : springPanel}
          >
            <ul className="site-shell flex flex-col gap-1 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-[var(--radius-control)] px-2 py-3 font-ui text-sm nav-link"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter({ email }) {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="site-shell flex flex-col gap-2 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Backend systems, security platforms, RAG.</p>
        <p>
          <a href={`mailto:${email}`} className="nav-link">
            {email}
          </a>
        </p>
      </div>
    </footer>
  );
}
