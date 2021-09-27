import { AnimeRetrievedFromFirestoreClient, UserDocument } from '@sasigume/seekfiction-commons';
import firestore, { doc, setDoc, getDoc, getFirestore, increment } from 'firebase/firestore';

import initApp from '@/lib/firebase/init-app';
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
      nsfw: data.nsfw ?? null,
      lastUpdatedAt:
        {
          seconds: data.lastUpdatedAt.seconds ?? null,
          nanoseconds: data.lastUpdatedAt.nanoseconds ?? null,
        } ?? null,
      apiVersion: data.apiVersion ?? null,
    };
  },
};

export const updateUser = async (
  uid: string,
  data: {
    [key: string]: any;
    addedAnimeCount: number;
  }
): Promise<boolean> => {
  const app = initApp();
  const db = getFirestore(app);
  const docRef = doc(db, 'users', uid);

  // IMPORTANT: merge data
  return setDoc(docRef, { ...data, totalAddedAnimeCount: increment(data.addedAnimeCount) }, { merge: true })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
};
export const userConverter = {
  toFirestore(user: UserDocument) {
    return user;
  },
  fromFirestore(snapshot: firestore.DocumentSnapshot, options: firestore.SnapshotOptions): UserDocument | null {
    const data = snapshot.data(options)!;

    // Setting all data to null safe
    // to avoid "not serialized" error of Nextjs
    return {
      totalAddedAnimeCount: data.totalAddedAnimeCount ?? null,
    };
  },
};

export const getUser = async (uid: string): Promise<UserDocument | null> => {
  const app = initApp();
  const db = getFirestore(app);
  const docRef = doc(db, 'users', uid).withConverter(userConverter);
  const docSnapShot = await getDoc(docRef).catch((e) => {
    console.error(e);
    throw e;
  });
  if (docSnapShot.exists()) {
    return docSnapShot.data();
  }
  return null;
};
