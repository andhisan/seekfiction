import firestore from 'firebase/firestore';
import { AnimeRetrievedFromFirestoreClient } from '@sasigume/seekfiction-commons';

export const converter = {
  toFirestore(anime: AnimeRetrievedFromFirestoreClient) {
    return anime;
  },
  fromFirestore(snapshot: firestore.DocumentSnapshot, options: firestore.SnapshotOptions): AnimeRetrievedFromFirestoreClient | null {
    const data = snapshot.data(options)!;

    // Setting all data to null safe
    // to avoid "not serialized" error of Nextjs
    return {
      title_romaji: data.title_romaji ?? null,
      mal_id: data.mal_id ?? null,
      aniList_id: data.aniList_id ?? null,
      kitsu_id: data.kitsu_id ?? null,
      simkl_id: data.simkl_id ?? null,
      mal_image: data.mal_image ?? null,
      aniList_image: data.aniList_image ?? null,
      kitsu_image: data.kitsu_image ?? null,
      simkl_image: data.simkl_image ?? null,
      lastUpdatedAt:
        {
          seconds: data.lastUpdatedAt.seconds ?? null,
          nanoseconds: data.lastUpdatedAt.nanoseconds ?? null,
        } ?? null,
      apiVersion: data.apiVersion ?? null,
    };
  },
};
