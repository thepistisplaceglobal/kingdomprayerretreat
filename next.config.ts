import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/kpr",
      //   destination: "https://kpr.thepistisplaceglobal.org",
      //   permanent: false,
      // }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i9.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    qualities: [70, 75, 85, 100],
  }
};

export default nextConfig;
