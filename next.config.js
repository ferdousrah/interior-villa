/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'localhost'],
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig