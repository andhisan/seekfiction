import * as functions from 'firebase-functions';
import meilisearch from './meilisearch';

// Original script by nayfin
// Rewrited to TS
// https://github.com/nayfin/algolia-firestore-sync

// Takes an the Meili index and key of document to be deleted
const removeObject = (indexName: string, key: string) => {
  const index = meilisearch.index(indexName);
  // then it deletes the document
  return index.deleteDocument(key).catch((err: Error) => {
    if (err) throw err;
    functions.logger.info(`Key Removed from Meili Index ${indexName}`);
  });
};

/**
 * Takes an the Meili index and data to be added or updated to
 * IMPORTANT: use "updateDocuments" here
 *
 * @see https://docs.meilisearch.com/reference/api/documents.html#add-or-update-documents
 * @param {string} indexName
 * @param {*} data
 * @return {*}
 */
const upsertObject = (indexName: string, data: any) => {
  const index = meilisearch.index(indexName);
  // then it adds or updates it
  return index.updateDocuments([data]).catch((err: Error) => {
    if (err) throw err;
    functions.logger.info(`Document ${data.uid} Updated in Meili Index ${indexName}`);
  });
};

// Takes an Meili index and a Firestore event and uses event data to keep them in sync
export const syncMeiliWithFirestore = (
  indexName: string,
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext,
) => {
  const data = change.after.exists ? change.after.data() : null; // extract data from Firestore event
  const key = context.params.id; // gets the id of the document changed
  // If no data then it was a delete event
  if (!data) {
    // so delete the document from Meili index
    return removeObject(indexName, key);
  }
  // add id param to data object and set it to key of Firestore document
  // IMPORTANT: Meili use "id" not "objectID"
  data['id'] = key;
  // upsert the data to the Meili index
  return upsertObject(indexName, data);
};
