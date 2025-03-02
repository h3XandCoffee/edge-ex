/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
//experimental: {
//  appDir: true, // Ensures Next.js uses /app instead of /pages
//},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],

//    test: /\.css$/,
//    use: ["style-loader", "css-loader"],

//    test: /\.less$/,
//    use: [
//      {
//        loader: "style-loader",
//      },
//      {
//        loader: "css-loader",
//      },
//      {
//        loader: "less-loader",
//        options: {
//          lessOptions: {
//            javascriptEnabled: true, // Required for Ant Design compatibility
//          },
//        },
//      },
//    ],
    });

    return config;
  },
};

module.exports = nextConfig;
