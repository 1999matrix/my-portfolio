# Project: Shashwat Dwivedi portfolio

Monorepo (pnpm): `apps/web` (Next.js App Router, JavaScript + JSDoc), `apps/api` (TypeScript Fastify), `packages/shared`.

## Commands

- `pnpm dev` — web + api (+ Redis via docker compose)
- `pnpm db:migrate` — Drizzle migrations against Supabase Postgres
- `pnpm db:seed` — seed resume content
- `pnpm test` — unit + integration
- `pnpm lint` — eslint + prettier check

## Always

- Plan first for anything touching more than 3 files.
- Run lint and tests before saying a task is done.
- Never invent portfolio content. Use `TODO(owner)`.
- Follow `.cursor/rules/design-anti-slop.mdc` for every UI change.

## Database

Production Postgres: Supabase project `dubsiwxlyvijostbjxcp`. Set `DATABASE_URL` in `.env` (see `.env.example`).
