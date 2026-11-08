import Link from "next/link";

export function ExperienceList({ items }) {
  return (
    <section className="site-shell py-16" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="font-ui text-2xl">
        Experience
      </h2>
      <ul className="mt-10 flex flex-col gap-10">
        {items.map((job) => (
          <li key={job.id} className="experience-row">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <div>
                <h3 className="text-lg font-medium">{job.role}</h3>
                <p className="text-[var(--text-secondary)]">{job.company}</p>
              </div>
              <p className="font-mono text-xs text-[var(--muted)]">
                {job.startDate} — {job.endDate ?? "Present"}
                {job.location ? ` · ${job.location}` : ""}
              </p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {job.bullets.map((bullet) => (
                <li key={bullet.slice(0, 40)}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectStrip({ projects }) {
  return (
    <section className="site-shell py-16" aria-labelledby="work-heading">
      <div className="flex items-end justify-between gap-4">
        <h2 id="work-heading" className="font-ui text-2xl">
          Selected work
        </h2>
        <Link href="/work" className="text-sm nav-link">
          All projects
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-[var(--border)]">
        {projects.map((project) => (
          <li key={project.id} className="py-6">
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-medium group-hover:text-[var(--link)]">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.summary}
                  </p>
                </div>
                <p className="font-mono text-xs text-[var(--muted)] md:max-w-xs md:text-right">
                  {project.techStack.slice(0, 5).join(" · ")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProofStrip({ metrics }) {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="site-shell grid gap-8 py-10 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="font-display text-3xl text-[var(--signal)]">{metric.value}</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
