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
  reactStrictMode: true,
    // CORS configuration
    async headers() {
        return [
            {
                // Apply these headers to all routes in the application
                source: "/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Allow access from all origins
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, PATCH, OPTIONS", // Allowed HTTP methods
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Authorization", // Allowed headers
                    },
                ],
            },
        ];
    },
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
