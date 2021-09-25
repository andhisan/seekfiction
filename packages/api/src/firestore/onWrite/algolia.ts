import * as functions from 'firebase-functions';
import algolia from '../../_helper/algolia';
import { syncAlgoliaWithFirestore } from '../../_helper/firebase-algolia-sync';

import { ANIME_COLLECTION, ANIME_INDEX } from '../../_helper/config';

const syncTestAnime = functions.firestore.document(`/${ANIME_COLLECTION}/{id}`).onWrite((change, context) => {
  const index = algolia.initIndex(ANIME_INDEX);
  return syncAlgoliaWithFirestore(index, change, context);
});

export default syncTestAnime;
