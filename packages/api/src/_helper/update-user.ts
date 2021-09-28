import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Update user's anime count
 * @param {string} uid User UID
 * @param {number}count Anime count to add
 */
export const updateUserAnimeCount = async (uid: string, count: number) => {
  const docRef = admin.firestore().collection('users').doc(uid);
  await docRef
    .set(
      {
        totalAddedAnimeCount: admin.firestore.FieldValue.increment(count),
      },
      { merge: true },
    )
    .catch((e) => {
      functions.logger.error(e);
    });
};
