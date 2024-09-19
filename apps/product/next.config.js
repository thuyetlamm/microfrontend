const NextFederationPlugin = require("@module-federation/nextjs-mf");

const CHECKOUT_APP_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_APP_URL || "http://localhost:3002";

const INSPIRE_APP_URL =
  process.env.NEXT_PUBLIC_INSPIRE_APP_URL || "http://localhost:3003";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    checkout: `checkout@${CHECKOUT_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  transpilePackages: ["@repo/data-context", "@repo/ui", "@repo/utils"],
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "product",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./products": "./pages/products/index",
          "./product": "./pages/products/[id]",
          "./search": "./components/search",
          "./latest-products": "./components/latest-products",
          "./related-products": "./components/related-products",
          "./pages-map": "./pages-map.js",
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
