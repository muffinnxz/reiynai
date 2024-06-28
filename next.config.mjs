/** @type {import('next').NextConfig} */
const nextConfig = {
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
