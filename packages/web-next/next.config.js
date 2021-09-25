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
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    ALGOLIA_ANIME_INDEX: process.env.ALGOLIA_ANIME_INDEX,
    FUNCTIONS: process.env.FUNCTIONS,
    FUNCTIONS_AUTH: process.env.FUNCTIONS_AUTH,
  },
};
