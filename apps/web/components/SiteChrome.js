import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell flex items-center justify-between gap-6 py-5">
        <Link href="/" className="font-display text-lg tracking-tight">
          Shashwat Dwivedi
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ email }) {
  return (
    <footer className="site-footer mt-auto border-t border-[var(--border)]">
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
