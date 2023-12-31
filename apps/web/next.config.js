const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@luego/db", "@luego/api", "@luego/auth"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  }
};
