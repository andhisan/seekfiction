import { AnimeOnAlgolia, ApiType } from '@sasigume/seekfiction-commons';

export const urlConverter = (type: ApiType, id: AnimeOnAlgolia['mal_id'], slug: AnimeOnAlgolia['slug']) => {
  if (type == 'mal') return `https://myanimelist.net/anime/${id}`;
  if (type == 'aniList') return `https://anilist.co/anime/${id}`;
  if (type == 'kitsu') return `https://kitsu.io/explore/anime/${slug}`;
  if (type == 'simkl') return `https://simkl.com/anime/${id}`;
  return `https://myanimelist.net/anime/${id}`;
};
