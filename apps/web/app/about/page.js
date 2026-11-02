import { getHomeContent } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "Experience, achievements, and education for Shashwat Dwivedi.",
};

export default async function AboutPage() {
  const data = await getHomeContent();

  return (
    <div className="site-shell py-16">
      <h1 className="font-display text-3xl">About</h1>
      <p className="prose-block mt-4 text-sm text-[var(--text-secondary)]">{data.profile.summary}</p>

      <section className="mt-12">
        <h2 className="font-display text-xl">Achievements</h2>
        <ul className="mt-6 space-y-6">
          {data.achievements.map((item) => (
            <li key={item.id} className="border-l-2 border-[var(--border)] pl-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl">Education</h2>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          B.Tech., Computer Science & Engineering — Ajay Kumar Garg Engineering College, Ghaziabad (2020–2024)
        </p>
      </section>
    </div>
  );
}
