import Link from "next/link";
import { getHomeContent } from "@/lib/content";

export const metadata = {
  title: "Work",
  description: "Case studies and projects — Memora, vulnerability scanner, and production security platforms.",
};

export default async function WorkPage() {
  const { projects } = await getHomeContent();

  return (
    <div className="site-shell py-16">
      <h1 className="font-display text-3xl">Work</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
        Systems I have shipped or built end to end — security platforms, RAG assistants, and low-level tooling.
      </p>
      <ul className="mt-12 divide-y divide-[var(--border)]">
        {projects.map((project) => (
          <li key={project.id} className="py-8">
            <Link href={`/work/${project.slug}`} className="block">
              <h2 className="text-xl font-medium">{project.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.summary}
              </p>
              <p className="mt-4 font-mono text-xs text-[var(--muted)]">
                {project.techStack.join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
