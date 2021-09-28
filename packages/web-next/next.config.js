const WindiCSS = require('windicss-webpack-plugin').default;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSS());
    return config;
  },
  env: {
    CLIENT_AUTH: process.env.CLIENT_AUTH,
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
    domains: [
      'cdn.myanimelist.net',
      's4.anilist.co',
      'media.kitsu.io',
      'simkl.in',
      'pbs.twimg.com',

      // Too many, Google! https://github.com/vercel/next.js/discussions/18311
      'storage.googleapis.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
};
