/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    ],
  },
};
export default nextConfig;
