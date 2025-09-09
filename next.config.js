/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.builder.io' },
      { protocol: 'https', hostname: '**.builder.io' },
      // add others your content uses, e.g. Unsplash, Cloudinary, etc.
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};
module.exports = nextConfig;
