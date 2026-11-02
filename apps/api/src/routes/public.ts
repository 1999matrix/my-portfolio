import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { healthSchema, publicHomeSchema } from "@portfolio/shared";
import { z } from "zod";
import { getPublicHome, getProjectBySlug } from "../services/content.js";

export async function healthRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/health",
    {
      schema: {
        response: { 200: healthSchema },
      },
    },
    async () => ({
      status: "ok" as const,
      timestamp: new Date().toISOString(),
    }),
  );

  app.get("/ready", async (_req, reply) => {
    try {
      await getPublicHome();
      return { status: "ready" };
    } catch {
      return reply.status(503).send({ status: "not_ready" });
    }
  });
}

export async function publicRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/v1/public/home",
    {
      schema: {
        response: { 200: publicHomeSchema },
      },
    },
    async () => getPublicHome(),
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/v1/public/projects/:slug",
    {
      schema: {
        params: z.object({ slug: z.string() }),
        response: {
          200: z.object({
            slug: z.string(),
            title: z.string(),
            summary: z.string(),
            body: z.string().nullable(),
            techStack: z.array(z.string()),
            repoUrl: z.string().url().nullable(),
          }),
          404: z.object({ error: z.string() }),
        },
      },
    },
    async (req, reply) => {
      const project = await getProjectBySlug(req.params.slug);
      if (!project) {
        return reply.status(404).send({ error: "not_found" });
      }
      return {
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        body: project.body,
        techStack: project.techStack,
        repoUrl: project.repoUrl,
      };
    },
  );
}
