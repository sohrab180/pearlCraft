/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.mypearlcraft.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
