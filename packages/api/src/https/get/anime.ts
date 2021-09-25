import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import withAuth from '../../_helper/withAuth';
import { ANIME_COLLECTION } from '../../_helper/config';
import { AnimeOnFirestore } from '@sasigume/seekfiction-commons';
const collection = admin.firestore().collection(ANIME_COLLECTION);
/**
 * Get anime firestore data by id
 *
 * @param {functions.https.Request} request
 * @param {functions.Response} response
 * @return {void}
 */
const getAnime = functions.region('us-central1').https.onRequest(async (request, response: functions.Response) => {
  return withAuth(request, response, async () => {
    const id = request.query.id;
    if (typeof id === 'string') {
      try {
        const doc = await collection.doc(id).get();
        if (doc.exists) {
          const data = doc.data() as AnimeOnFirestore;
          return response.status(200).json(data);
        } else {
          return response.status(404).json({ message: 'Not found' });
        }
      } catch (e) {
        functions.logger.error(e);
        return response.status(500).json({
          message: `ERROR: ${JSON.stringify(e)}`,
        });
      }
    } else {
      return response.status(422).json({
        message: 'Please specify id',
      });
    }
  });
});

export default getAnime;
