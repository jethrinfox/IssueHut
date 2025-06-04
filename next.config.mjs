/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import nextAnalizer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextAnalizer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  turbopack: {},
  productionBrowserSourceMaps: true,
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
  serverExternalPackages: ["@node-rs/argon2"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withBundleAnalyzer(config);
