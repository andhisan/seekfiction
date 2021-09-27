import FirebaseFirestore from '@google-cloud/firestore';

/**
 * All field except title are optional
 * Be careful when render images, they don't share size or format
 */
interface Anime {
  slug?: string;
  mal_id?: number;
  aniList_id?: number;
  kitsu_id?: number;
  simkl_id?: number;
  title_romaji: string;
  mal_image?: string;
  aniList_image?: string;
  kitsu_image?: string;
  simkl_image?: string;
  nsfw?: boolean;
}

interface AnimeFirestoreBase {
  slug?: string | null;
  mal_id?: number | null;
  aniList_id?: number | null;
  kitsu_id?: number | null;
  simkl_id?: number | null;
  title_romaji: string | null;
  mal_image?: string | null;
  aniList_image?: string | null;
  kitsu_image?: string | null;
  simkl_image?: string | null;
  nsfw?: boolean | null;
  apiVersion?: string;
}

/**
 * Use if send data by document.data()
 */
interface AnimeOnFirestore extends AnimeFirestoreBase {
  lastUpdatedAt: FirebaseFirestore.Timestamp;
}

/**
 * Use if get data through Client SDK
 */
interface AnimeRetrievedFromFirestoreClient extends AnimeFirestoreBase {
  lastUpdatedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

type ApiType = 'mal' | 'aniList' | 'kitsu' | 'simkl';

/**
 * The objectID is only on Algolia index
 */
interface AnimeOnAlgolia extends AnimeOnFirestore {
  objectID: string;
}

/**
 * The id is only on Meili index
 */
interface AnimeOnMeili extends AnimeOnFirestore {
  id: string;
}

interface AnimeGroupedByTitle {
  [key: string]: Anime;
}

type ErrorMessageObject = { message: string };

type SearchResultSucess = {
  searchString: string;
  createdAt: any;
  data: AnimeGroupedByTitle;
  message?: string;
};
type SearchAllResult = SearchResultSucess | ErrorMessageObject;

type UpdateResult = {
  message: string;
  foundAnimeCount: number;
  addedAnimeCount: number;
};

export type {
  ApiType,
  Anime,
  AnimeOnFirestore,
  AnimeOnAlgolia,
  AnimeRetrievedFromFirestoreClient,
  AnimeGroupedByTitle,
  SearchAllResult,
  ErrorMessageObject,
  AnimeOnMeili,
  UpdateResult,
};
