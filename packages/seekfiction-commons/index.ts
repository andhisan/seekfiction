import { AnimeOnAlgolia } from './types';

export const checkAnimeHasImage = (anime: AnimeOnAlgolia) => {
  return anime.mal_image !== undefined || anime.aniList_image !== undefined || anime.kitsu_image !== undefined || anime.simkl_image !== undefined;
};

export { AnimeOnAlgolia };
