interface Anime {
  title: string;
  title_romaji: string;
  year: number;
  type: string;
  poster: string;
  ids: {
    simkl_id: number;
    slug: string;
  };
}

export type Search = Anime[];
