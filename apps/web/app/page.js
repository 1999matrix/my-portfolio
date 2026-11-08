import dynamic from "next/dynamic";
import { HeroCopy } from "@/components/home/HeroCopy.js";
import { DeferredNetworkHero } from "@/components/home/HomeDeferred.js";
import { HeroShell } from "@/components/home/HeroShell.js";
import { StaticGraph } from "@/components/hero/StaticGraph.js";
import { ExperienceList, ProjectStrip } from "@/components/sections";
import { getHomeContent } from "@/lib/content";

const SkillKeyboard = dynamic(() =>
  import("@/components/SkillKeyboard").then((mod) => mod.SkillKeyboard),
);

const MetricsStrip = dynamic(
  () => import("@/components/home/MetricsStrip.js").then((mod) => mod.MetricsStrip),
);

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
      <HeroShell>
        <HeroCopy profile={profile} />
        <div className="hero-canvas relative h-full min-h-[280px] overflow-hidden rounded-[var(--radius-panel)] border border-[var(--border)]">
          <StaticGraph />
          <DeferredNetworkHero overlay />
        </div>
      </HeroShell>
      <MetricsStrip metrics={data.proofMetrics} />
      <ProjectStrip projects={data.projects} />
      <ExperienceList items={data.experience} />
      <SkillKeyboard skillGroups={data.skillGroups} />
    </>
  );
}
