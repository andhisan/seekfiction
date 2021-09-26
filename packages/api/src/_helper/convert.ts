import { Anime, AnimeOnFirestore } from '@sasigume/seekfiction-commons';
import * as admin from 'firebase-admin';
import { getVersion } from './version';
/**
 * Convert undefined property to null
 * @param {Anime} anime Anime data includes undefined value
 * @return {AnimeForFirestore}
 */
export const covnertUndefinedToNull = (anime: Anime): AnimeOnFirestore => {
  return {
    lastUpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    apiVersion: getVersion(),
    // IMPORTANT: undefined is not allowed
    title_romaji: anime.title_romaji ?? null,
    slug: anime.slug ?? null,
    nsfw: anime.nsfw ?? null,
    mal_id: anime.mal_id ?? null,
    aniList_id: anime.aniList_id ?? null,
    kitsu_id: anime.kitsu_id ?? null,
    simkl_id: anime.simkl_id ?? null,
    mal_image: anime.mal_image ?? null,
    aniList_image: anime.aniList_image ?? null,
    kitsu_image: anime.kitsu_image ?? null,
    simkl_image: anime.simkl_image ?? null,
  };
};

export const convertSimklPosterUrl = (id: string): string => {
  return `https://simkl.in/posters/${id}_m.webp`;
};
