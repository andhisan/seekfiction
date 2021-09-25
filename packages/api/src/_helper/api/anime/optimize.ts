import { Anime, AnimeGroupedByTitle } from '@sasigume/seekfiction-commons';
// import * as functions from 'firebase-functions';

export const groupAnimesByTitleRomaji = (animes: Anime[]): AnimeGroupedByTitle => {
  const result: AnimeGroupedByTitle = {};
  animes.map((anime) => {
    const key = anime.title_romaji;

    // Add slug if it has
    result[key] = { ...result[key], ...anime, slug: anime.slug, nsfw: anime.nsfw };
  });
  return result;
};
