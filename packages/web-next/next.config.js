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
    MEILI_URL: process.env.MEILI_URL,
    MEILI_API_KEY: process.env.MEILI_API_KEY,
    MEILI_ANIME_INDEX: process.env.MEILI_ANIME_INDEX,
    FUNCTIONS: process.env.FUNCTIONS,
    FUNCTIONS_AUTH: process.env.FUNCTIONS_AUTH,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
  images: {
    domains: ['cdn.myanimelist.net', 's4.anilist.co', 'media.kitsu.io', 'simkl.in'],
  },
};
