import { eq, asc } from "drizzle-orm";
import { getDb } from "../db/index.js";
import {
  profiles,
  experience,
  projects,
  achievements,
  skillGroups,
  proofMetrics,
} from "../db/schema.js";

export async function getPublicHome() {
  const db = getDb();

  const [profile] = await db.select().from(profiles).limit(1);
  if (!profile) {
    throw new Error("Profile not seeded");
  }

  const exp = await db
    .select()
    .from(experience)
    .where(eq(experience.status, "published"))
    .orderBy(asc(experience.sortOrder));

  const projs = await db
    .select()
    .from(projects)
    .where(eq(projects.status, "published"))
    .orderBy(asc(projects.sortOrder));

  const ach = await db
    .select()
    .from(achievements)
    .where(eq(achievements.status, "published"))
    .orderBy(asc(achievements.sortOrder));

  const skills = await db
    .select()
    .from(skillGroups)
    .orderBy(asc(skillGroups.sortOrder));

  const metrics = await db
    .select()
    .from(proofMetrics)
    .orderBy(asc(proofMetrics.sortOrder));

  return {
    profile: {
      name: profile.name,
      headline: profile.headline,
      summary: profile.summary,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      linkedInUrl: profile.linkedInUrl,
      githubUrl: profile.githubUrl,
    },
    experience: exp.map((row) => ({
      id: row.id,
      company: row.company,
      role: row.role,
      location: row.location,
      startDate: row.startDate,
      endDate: row.endDate,
      bullets: row.bullets,
      sortOrder: row.sortOrder,
    })),
    projects: projs.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      techStack: row.techStack,
      repoUrl: row.repoUrl,
      sortOrder: row.sortOrder,
    })),
    achievements: ach.map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      sortOrder: row.sortOrder,
    })),
    skillGroups: skills.map((row) => ({
      group: row.group,
      skills: row.skills,
      sortOrder: row.sortOrder,
    })),
    proofMetrics: metrics.map((row) => ({
      label: row.label,
      value: row.value,
    })),
  };
}

export async function getProjectBySlug(slug: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  if (!row || row.status !== "published") {
    return null;
  }
  return row;
}
