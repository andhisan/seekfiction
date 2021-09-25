interface AnimeAniList {
  id: number;
  title: { romaji: string };
  coverImage: { large: string };
}

export interface AniListGraphQLResult {
  data: {
    Page: {
      media: AnimeAniList[];
    };
  };
}
