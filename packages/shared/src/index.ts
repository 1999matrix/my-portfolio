import { z } from "zod";

export const publishStatusSchema = z.enum(["draft", "published", "scheduled"]);

export const publicProfileSchema = z.object({
  name: z.string(),
  headline: z.string(),
  summary: z.string(),
  location: z.string().nullable(),
  email: z.string().email(),
  phone: z.string().nullable(),
  linkedInUrl: z.string().url().nullable(),
  githubUrl: z.string().url().nullable(),
});

export const publicExperienceSchema = z.object({
  id: z.string().uuid(),
  company: z.string(),
  role: z.string(),
  location: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  bullets: z.array(z.string()),
  sortOrder: z.number(),
});

export const publicProjectSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  techStack: z.array(z.string()),
  repoUrl: z.string().url().nullable(),
  sortOrder: z.number(),
});

export const publicAchievementSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
  sortOrder: z.number(),
});

export const publicSkillGroupSchema = z.object({
  group: z.string(),
  skills: z.array(z.string()),
  sortOrder: z.number(),
});

export const publicHomeSchema = z.object({
  profile: publicProfileSchema,
  experience: z.array(publicExperienceSchema),
  projects: z.array(publicProjectSchema),
  achievements: z.array(publicAchievementSchema),
  skillGroups: z.array(publicSkillGroupSchema),
  proofMetrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

export type PublicHome = z.infer<typeof publicHomeSchema>;

export const healthSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string(),
});
