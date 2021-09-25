import { Anime, AnimeGroupedByTitle } from '@/models';
// import * as functions from 'firebase-functions';

export const groupAnimesByTitleRomaji = (animes: Anime[]): AnimeGroupedByTitle => {
  const result: AnimeGroupedByTitle = {};
  animes.map((anime) => {
    const key = anime.title_romaji;
    result[key] = { ...result[key], ...anime };
  });
  return result;
};
