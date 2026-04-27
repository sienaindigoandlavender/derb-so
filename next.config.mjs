/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.derb.so" }],
        destination: "https://derb.so/:path*",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "page_id" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "p" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/questions/why-streets-feel-narrower",
        destination: "/questions/what-is-a-medina",
        permanent: true,
      },
      {
        source: "/questions/why-ground-feels-warmer",
        destination: "/questions/why-is-it-so-cold-inside-in-winter",
        permanent: true,
      },
      {
        source: "/questions/why-houses-inward-facing",
        destination: "/questions/why-is-the-riad-so-hard-to-find",
        permanent: true,
      },
      {
        source: "/questions/why-riad-far-from-square",
        destination: "/questions/why-is-the-riad-so-hard-to-find",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
