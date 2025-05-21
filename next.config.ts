import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  },
};

export default nextConfig;
