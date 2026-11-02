/** Static resume content when API/DB is unavailable (matches seed). */
export const fallbackHome = {
  profile: {
    name: "Shashwat Dwivedi",
    headline:
      "Backend software engineer — distributed systems and AI/LLM applications",
    summary:
      "Backend engineer with 2+ years building security software for thousands of endpoints and RAG chatbots grounded in company data. Cut API response time by 55% and vulnerability detection latency by 40% in production.",
    location: "Bangalore, India",
    email: "techshashwat5@gmail.com",
    phone: "+91-9911007561",
    linkedInUrl: "https://linkedin.com/in/shashwat-dwivedi-181577a8",
    githubUrl: "https://github.com/1999matrix",
  },
  experience: [
    {
      id: "exp-techbridge",
      company: "Techbridge Consultancy Services Pvt. Ltd.",
      role: "Software Engineer — CyberSIO Security Platform",
      location: "Gurugram, India",
      startDate: "2024-05",
      endDate: null,
      sortOrder: 0,
      bullets: [
        "Built backend services for AstraAI, a RAG security chatbot pulling answers from 8 security tools (SIEM, UEBA, SOAR, NAC, PAM, IAM, patch management, vulnerability assessment).",
        "Built patch management and vulnerability assessment services monitoring 5,000+ endpoints with real-time scan progress over SSE; cut vulnerability detection time by 40% via parallel threat-intel processing and batch writes.",
        "Designed Kafka-based event-driven architecture for TB-SOAR so high-volume SIEM alerts scale per service without dragging down the whole system.",
        "Built a Windows agent that collects OS, hardware, software, and security telemetry and streams it to backend APIs.",
      ],
    },
    {
      id: "exp-abekus",
      company: "Abekus EdTech Platform",
      role: "Software Engineering Intern",
      location: "Noida, India",
      startDate: "2023-02",
      endDate: "2023-09",
      sortOrder: 1,
      bullets: [
        "Cut average API response time by 30% with Redis caching on high-traffic endpoints.",
        "Made PostgreSQL queries about 35% faster for 50,000+ active users by fixing N+1 queries and adding indexes.",
        "Worked with product and engineering before exam season peak traffic — zero downtime during peak.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-memora",
      slug: "memora",
      title: "Memora — Enterprise AI knowledge assistant",
      summary:
        "Multi-tenant RAG assistant with hybrid vector + BM25 retrieval, eight connector syncs, and cited answers over SSE.",
      techStack: [
        "Python",
        "FastAPI",
        "NestJS",
        "PostgreSQL",
        "pgvector",
        "Redis",
        "BullMQ",
        "OpenAI API",
        "RAG",
        "BM25",
        "SSE",
      ],
      repoUrl: "https://github.com/1999matrix/Memora",
      sortOrder: 0,
    },
    {
      id: "proj-scanner",
      slug: "vulnerability-scanner",
      title: "Cross-platform vulnerability scanner",
      summary:
        "Multithreaded port scanner at 500+ ports/sec with in-memory CVE cache cutting redundant DB lookups by 60%.",
      techStack: ["C++", "Go", "Nmap", "Socket programming", "Multithreading"],
      repoUrl: "https://github.com/1999matrix/vulnerability-scanner",
      sortOrder: 1,
    },
  ],
  achievements: [
    {
      id: "ach-innovathon",
      title: "TechBridge Innovathon 2025 — 1st place",
      body: "Led a team building an AI-powered SIEM chatbot with real-time log analysis; best project among 30+ teams.",
      sortOrder: 0,
    },
    {
      id: "ach-rajasthan",
      title: "Rajasthan IT Day Hackathon 2023 — 1st runner-up",
      body: "Government-facing solution; 2nd among 500+ teams.",
      sortOrder: 1,
    },
    {
      id: "ach-cf",
      title: "Codeforces Specialist",
      body: "Max rating 1400+; 450+ problems solved on Codeforces and LeetCode.",
      sortOrder: 2,
    },
  ],
  skillGroups: [
    { group: "Languages", skills: ["JavaScript", "Python", "C++"], sortOrder: 0 },
    {
      group: "Backend and APIs",
      skills: [
        "Node.js",
        "Express",
        "NestJS",
        "FastAPI",
        "REST",
        "GraphQL",
        "WebSockets",
        "SSE",
      ],
      sortOrder: 1,
    },
    {
      group: "Distributed systems",
      skills: ["Apache Kafka", "Redis", "BullMQ", "event-driven architecture"],
      sortOrder: 2,
    },
    {
      group: "Data and AI",
      skills: [
        "PostgreSQL",
        "pgvector",
        "RAG",
        "OpenAI API",
        "LangChain",
        "BM25",
        "Llama 3",
      ],
      sortOrder: 3,
    },
    {
      group: "Cloud and DevOps",
      skills: ["AWS EC2", "AWS S3", "Docker", "CI/CD", "Linux", "Git"],
      sortOrder: 4,
    },
  ],
  proofMetrics: [
    { label: "Vulnerability detection latency", value: "−40%" },
    { label: "API p95 latency (query + pool tuning)", value: "−55%" },
    { label: "Abekus API response time (Redis cache)", value: "−30%" },
  ],
};

const projectBodies = {
  memora: `Memora ingests documents from Google Drive, GitHub, Notion, Confluence, Jira, Slack, SharePoint, and PostgreSQL with incremental sync. NestJS and FastAPI services coordinate embeddings in pgvector, job queues in BullMQ, and caching in Redis.`,
  "vulnerability-scanner": `C++ and Go services wrap Nmap and raw socket scanning with adjustable depth and rate limits. CVE metadata is cached in memory during large sweeps to avoid repeated database hits.`,
};

export async function getHomeContent() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${base}/v1/public/home`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("api_error");
    return res.json();
  } catch {
    return fallbackHome;
  }
}

export async function getProject(slug) {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${base}/v1/public/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("not_found");
    return res.json();
  } catch {
    const project = fallbackHome.projects.find((p) => p.slug === slug);
    if (!project) return null;
    return {
      ...project,
      body: projectBodies[slug] ?? null,
    };
  }
}
