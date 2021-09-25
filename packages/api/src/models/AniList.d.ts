interface AnimeAniList {
  id: number;
  title: { romaji: string };
  coverImage: { extraLarge: string };
}

export interface AniListGraphQLResult {
  data: {
    Page: {
      media: AnimeAniList[];
    };
  };
}
