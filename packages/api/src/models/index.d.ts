export interface Anime {
  mal_id?: number;
  aniList_id?: number;
  kitsu_id?: number;
  simkl_id?: number;
  title_romaji: string;
  mal_image?: string;
  aniList_image?: string;
  kitsu_image?: string;
  simkl_image?: string;
}

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
export interface AnimeGroupedByTitle {
  [key: string]: Anime;
}

type ErrorMessageObject = { message: string };

type SearchResultSucess = {
  searchString: string;
  createdAt: any;
  data: AnimeGroupedByTitle;
  message?: string;
};
export type SearchAllResult = SearchResultSucess | ErrorMessageObject;
