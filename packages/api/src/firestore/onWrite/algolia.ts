import * as functions from 'firebase-functions';
import algolia from '../../lib/algolia';
import { syncAlgoliaWithFirestore } from '../../lib/firebase-algolia-sync';

import { ANIME_COLLECTION, ANIME_INDEX } from '../../lib/config/database';

const syncTestAnime = functions.firestore.document(`/${ANIME_COLLECTION}/{id}`).onWrite((change, context) => {
  const index = algolia.initIndex(ANIME_INDEX);
  return syncAlgoliaWithFirestore(index, change, context);
});

export default syncTestAnime;
