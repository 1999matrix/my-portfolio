import dns from "node:dns";
import { loadRootEnv } from "./src/config/load-root-env.js";

// shortcut: Windows often times out on Supabase direct host AAAA; prefer IPv4
dns.setDefaultResultOrder("ipv4first");
import { defineConfig } from "drizzle-kit";

loadRootEnv(import.meta.url);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  migrations: {
    table: "__drizzle_migrations",
  },
});
