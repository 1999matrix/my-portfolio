export const metadata = {
  title: "Playground",
  description: "Ask my work — RAG chatbot grounded in this portfolio (coming soon).",
};

export default function PlaygroundPage() {
  return (
    <div className="site-shell py-16">
      <h1 className="font-display text-3xl">Ask my work</h1>
      <p className="mt-4 max-w-2xl text-sm text-[var(--text-secondary)]">
        Phase 6 adds a streaming RAG chatbot backed by the same Postgres corpus as this site. The API
        route and ingestion job are not wired yet.
      </p>
      <p className="mt-6 font-mono text-xs text-[var(--muted)]">
        Planned: hybrid pgvector + BM25 retrieval, SSE answers, citations to projects and experience.
      </p>
    </div>
  );
}
