export const ANIME_COLLECTION = 'algolia_anime';
export const getAnimeIndex = (): string => {
  // https://stackoverflow.com/a/63127747
  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    return 'anime_dev';
  } else {
    return 'anime';
  }
};
