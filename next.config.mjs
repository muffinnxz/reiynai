/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://reiynai.firebaseapp.com/__/auth/:path*`
      }
    ];
  }
};

export default nextConfig;
