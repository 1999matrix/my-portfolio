import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="site-shell py-16">
      <Link href="/work" className="text-sm nav-link">
        Back to work
      </Link>
      <h1 className="font-display mt-6 text-3xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">{project.summary}</p>
      {project.body ? (
        <div className="prose-block mt-8 whitespace-pre-line text-sm text-[var(--text-secondary)]">
          {project.body}
        </div>
      ) : null}
      <p className="mt-8 font-mono text-xs text-[var(--muted)]">
        {project.techStack.join(" · ")}
      </p>
      {project.repoUrl ? (
        <p className="mt-6">
          <a href={project.repoUrl} className="nav-link text-sm" rel="noopener noreferrer" target="_blank">
            Repository
          </a>
        </p>
      ) : null}
    </article>
  );
}
