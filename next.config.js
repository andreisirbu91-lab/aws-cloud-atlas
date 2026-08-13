/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  turbopack: {
    // Prevent a package-lock.json in the parent user directory from being
    // mistaken for this application's workspace root.
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
