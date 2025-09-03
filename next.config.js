/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only compile TS/TSX pages so .jsx duplicates are ignored
  pageExtensions: ['ts', 'tsx'],

  images: { 
    domains: ['localhost','res.cloudinary.com','images.unsplash.com','files.stripe.com']
  },
  experimental: { typedRoutes: false },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }]
  }
};
module.exports = nextConfig;
