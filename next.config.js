/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/movies" },
    };
  },
};

module.exports = nextConfig;
