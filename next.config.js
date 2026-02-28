/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Prevent intermediary caches (ISP, university proxies, routers) from
        // caching HTML pages. Static assets (_next/static) still cache fine
        // since they use content-hash filenames.
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
