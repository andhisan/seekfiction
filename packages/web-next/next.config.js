const WindiCSS = require('windicss-webpack-plugin').default;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSS());
    return config;
  },
  env: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_APP_ID: process.env.ALGOLIA_SEARCH_API_KEY,
  },
};
