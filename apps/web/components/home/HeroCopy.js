import Link from "next/link";
import { HeroLeadDeferred } from "@/components/home/HeroLeadDeferred.js";

/**
 * Server-rendered hero copy — LCP stays on display name, not lead paragraph.
 * @param {{ profile: { name: string; headline: string; location: string } }} props
 */
export function HeroCopy({ profile }) {
  return (
    <div>
      <p className="type-label">{profile.location}</p>
      <h1 className="font-display type-display mt-3 text-balance">{profile.name}</h1>
      <HeroLeadDeferred text={profile.headline} />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/work" className="button-primary">
          View work
        </Link>
        <Link href="/playground" className="button-ghost">
          Ask my work
        </Link>
      </div>
    </div>
  );
}
