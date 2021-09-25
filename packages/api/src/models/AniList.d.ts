interface AnimeAniList {
  id: number;
  title: { romaji: string };
  coverImage: { extraLarge: string };
  isAdult: boolean;
}

export interface AniListGraphQLResult {
  data: {
    Page: {
      media: AnimeAniList[];
    };
  };
}
