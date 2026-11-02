export const metadata = {
  title: "Contact",
  description: "Reach Shashwat Dwivedi for backend and platform engineering roles.",
};

export default function ContactPage() {
  return (
    <div className="site-shell py-16">
      <h1 className="font-display text-3xl">Contact</h1>
      <p className="mt-4 max-w-xl text-sm text-[var(--text-secondary)]">
        Email works best for interview conversations and technical questions about my work.
      </p>
      <ul className="mt-8 space-y-3 text-sm">
        <li>
          <a className="nav-link" href="mailto:techshashwat5@gmail.com">
            techshashwat5@gmail.com
          </a>
        </li>
        <li>
          <a
            className="nav-link"
            href="https://linkedin.com/in/shashwat-dwivedi-181577a8"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            className="nav-link"
            href="https://github.com/1999matrix"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </li>
      </ul>
      <p className="mt-10 text-xs text-[var(--muted)]">
        Contact form with Turnstile ships in a later phase; use email for now.
      </p>
    </div>
  );
}
