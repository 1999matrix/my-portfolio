const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap() {
  const routes = ["", "/work", "/about", "/contact", "/playground", "/work/memora", "/work/vulnerability-scanner"];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
