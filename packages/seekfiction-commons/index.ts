interface AnimeForFirestore {
  mal_id?: number | null;
  aniList_id?: number | null;
  kitsu_id?: number | null;
  simkl_id?: number | null;
  title_romaji: string | null;
  mal_image?: string | null;
  aniList_image?: string | null;
  kitsu_image?: string | null;
  simkl_image?: string | null;
}

interface AnimeOnAlgolia extends AnimeForFirestore {
  objectID: string;
}

export const checkAnimeHasImage = (anime: AnimeOnAlgolia) => {
  return anime.mal_image !== undefined || anime.aniList_image !== undefined || anime.kitsu_image !== undefined || anime.simkl_image !== undefined;
};

export { AnimeForFirestore, AnimeOnAlgolia };
