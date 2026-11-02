export function GET() {
  const body = `# Shashwat Dwivedi portfolio

> Backend software engineer — distributed systems, security platforms, RAG/LLM applications.

- Home: ${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/
- Work: projects Memora and cross-platform vulnerability scanner
- Contact: techshashwat5@gmail.com
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
