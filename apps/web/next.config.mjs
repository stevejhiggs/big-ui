/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/shadcn'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
