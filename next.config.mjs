/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["http://localhost:1337/uploads"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "confident-event-38746b3315.strapiapp.com",
        pathname: "/uploads/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "atelic-strapi.onrender.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};
export default nextConfig;
