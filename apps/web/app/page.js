import Link from "next/link";
import { NetworkHero } from "@/components/hero/NetworkHero";
import { SkillKeyboard } from "@/components/SkillKeyboard";
import {
  ExperienceList,
  ProjectStrip,
  ProofStrip,
} from "@/components/sections";
import { getHomeContent } from "@/lib/content";

export default async function HomePage() {
  const data = await getHomeContent();
  const { profile } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    email: profile.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    sameAs: [profile.linkedInUrl, profile.githubUrl].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="site-shell py-12 md:py-16">
        <div className="hero-grid">
          <div>
            <p className="font-mono text-xs text-[var(--muted)]">{profile.location}</p>
            <h1 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[var(--text-secondary)]">
              {profile.headline}
            </p>
            <p className="prose-block mt-4 text-sm text-[var(--text-secondary)]">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="button-primary">
                View work
              </Link>
              <Link href="/playground" className="button-ghost">
                Ask my work
              </Link>
            </div>
          </div>
          <NetworkHero />
        </div>
      </section>

      <ProofStrip metrics={data.proofMetrics} />
      <ProjectStrip projects={data.projects} />
      <ExperienceList items={data.experience} />
      <SkillKeyboard skillGroups={data.skillGroups} />
    </>
  );
}
