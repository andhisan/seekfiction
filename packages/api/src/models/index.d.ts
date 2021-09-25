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
