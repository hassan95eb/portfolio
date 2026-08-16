import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Step 10: add the WordPress host here so next/image can optimize
    // media coming from the CMS.
    // remotePatterns: [{ protocol: "https", hostname: "cms.example.com" }],
  },
};

export default nextConfig;
