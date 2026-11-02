import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

let pool: pg.Pool | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!pool) {
    pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  }
  return drizzle(pool, { schema });
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
