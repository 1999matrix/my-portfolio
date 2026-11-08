# Shashwat Dwivedi — portfolio monorepo

pnpm workspace: **apps/web** (Next.js), **apps/api** (Fastify + Drizzle), **packages/shared** (Zod).

## Setup (under 10 minutes)

1. Install [pnpm](https://pnpm.io) and Node 20+.
2. Copy `.env.example` → `.env` at the repo root (and symlink or duplicate for `apps/api` — load via dotenv from root when running commands below).
3. In [Supabase](https://supabase.com/dashboard/project/dubsiwxlyvijostbjxcp/settings/database), set `DATABASE_URL`:
   - **Local migrate on Windows / no IPv6:** use **Connection pooling → Session mode → URI** (host `*.pooler.supabase.com`, user `postgres.<project-ref>`, port `5432`). Do not use `db.<ref>.supabase.co` if you see `ETIMEDOUT` on an IPv6 address.
   - **Direct** `db.*:5432` is IPv6-only on many projects; it works only if your network has working IPv6.
4. From repo root:

```bash
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

- Web: http://localhost:3000  
- API: http://localhost:4000/health  
- OpenAPI: http://localhost:4000/docs  

Optional: `docker compose up -d` for local Redis (needed in later phases).

## Without database

The web app falls back to static resume content in `apps/web/lib/content.js` if the API is down.

## Phases

| Phase | Status |
|-------|--------|
| 0 Rules + AGENTS | Done |
| 1 Foundation | Done (monorepo, schema, seed, health) |
| 2 API auth + admin | Not started |
| 3 Admin UI | Not started |
| 4 Public pages + SEO | Partial (pages, sitemap, robots, llms.txt) |
| 5 3D hero | Partial (R3F network, reduced-motion fallback) |
| 6 RAG playground | Placeholder |
| 7 Live demos | Not started |
| 8 Hardening | Not started |

## Design references

Layout cues from [Manish Choudhary](https://manishchodhary-portfolio.vercel.app/) (keyboard skills, experience tags), [Robert Ritacca](https://robertritacca.com/) (minimal hero), with telemetry/network visual language — not copied chrome.

Legacy `backend/` and empty `frontend/` folders can be removed; use `apps/*` only.
