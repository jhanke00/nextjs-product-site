/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '/a/images/**',
      },
    ],
  },
};

export default nextConfig;
