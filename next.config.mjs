/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  // The blog OG image route (app/(main)/blog/[slug]/opengraph-image.tsx) reads its
  // font files with fs.readFile at request time. File tracing can't always follow
  // that dynamic path, so include the fonts explicitly or the deployed route 500s.
  outputFileTracingIncludes: {
    "/blog/\\[slug\\]/opengraph-image": ["./app/**/blog/**/og-*.ttf"],
  },
}

export default nextConfig
