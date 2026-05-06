import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    remotePatterns: [
      // Production: S3 bucket
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET ?? "bkia-website"}.s3.${process.env.NEXT_PUBLIC_S3_REGION ?? "ap-southeast-7"}.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
      // Development: local NestJS server
      {
        protocol: "http",
        hostname: "localhost",
        port: "9090",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
