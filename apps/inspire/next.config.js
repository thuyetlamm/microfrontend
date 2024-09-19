const NextFederationPlugin = require("@module-federation/nextjs-mf");

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
        name: "inspire",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./latest-products": "./components/latest-products",
          "./related-products": "./components/related-products",
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
