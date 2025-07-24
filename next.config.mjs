/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "http://localhost:1337/uploads",
      "http://138.68.136.194/uploads",
      "http://192.168.80.25:1337/uploads",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.80.25",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "138.68.136.194",

        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "confident-event-38746b3315.strapiapp.com",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "atelic-strapi.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "atelic-strapi.collabdash.io",
        pathname: "/uploads/**",
      },
    ],
  },
};
export default nextConfig;
