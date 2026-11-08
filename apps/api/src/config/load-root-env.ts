import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

/** Walk up to the pnpm workspace root and load `.env` (override empty cwd values). */
export function loadRootEnv(entryModuleUrl: string) {
  let dir = path.dirname(fileURLToPath(entryModuleUrl));
  const root = path.parse(dir).root;

  while (dir !== root) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      dotenv.config({ path: path.join(dir, ".env"), override: true });
      return;
    }
    dir = path.dirname(dir);
  }

  dotenv.config({ override: true });
}
