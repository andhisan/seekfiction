import * as functions from 'firebase-functions';
import { syncMeiliWithFirestore } from '../../_helper/firebase-meilisearch-sync';
import { getAnimeIndex, MEILI_ANIME_COLLECTION } from '../../_helper/config';

/**
 * Sync firestore with MeiliSearch index
 */
const syncAnimeWithMeili = functions.firestore
  .document(`/${MEILI_ANIME_COLLECTION}/{id}`)
  .onWrite((change, context) => {
    // anime_index changes depends on environment
    return syncMeiliWithFirestore(getAnimeIndex(), change, context);
  });

export default syncAnimeWithMeili;
