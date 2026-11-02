/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prerender public pages with fetch + revalidate; enable again when routes use "use cache".
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
