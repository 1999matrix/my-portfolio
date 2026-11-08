import { loadRootEnv } from "./config/load-root-env.js";

loadRootEnv(import.meta.url);

import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { loadEnv } from "./config/env.js";
import { healthRoutes, publicRoutes } from "./routes/public.js";
import { closeDb } from "./db/index.js";

const env = loadEnv();

const app = Fastify({
  logger: {
    level: env.NODE_ENV === "production" ? "info" : "debug",
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
});

await app.register(swagger, {
  openapi: {
    info: {
      title: "Portfolio API",
      version: "0.1.0",
    },
  },
});

await app.register(swaggerUi, { routePrefix: "/docs" });

await app.register(healthRoutes);
await app.register(publicRoutes);

const shutdown = async () => {
  await app.close();
  await closeDb();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

try {
  await app.listen({ port: env.API_PORT, host: env.API_HOST });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
