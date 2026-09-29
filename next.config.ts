import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent a lockfile elsewhere in the user profile from becoming the
    // inferred workspace root during local and CI production builds.
    root: process.cwd(),
  },
  images: {
    // Step 10: add the WordPress host here so next/image can optimize
    // media coming from the CMS.
    // remotePatterns: [{ protocol: "https", hostname: "cms.example.com" }],
  },
};

export default nextConfig;
