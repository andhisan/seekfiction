export interface AnimeForFirestore {
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

export interface AnimeOnAlgolia extends AnimeForFirestore {
  objectID: string;
}
