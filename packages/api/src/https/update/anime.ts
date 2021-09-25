import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import withAuth from '../../_helper/withAuth';
import { searchApiAnime } from '../../_helper/api/anime';
import { ANIME_COLLECTION } from '../../_helper/config';
import { Anime } from '@sasigume/seekfiction-commons';
import { Buffer } from 'buffer';
import { covnertUndefinedToNull } from '../../_helper/convert';
import { encode } from 'url-safe-base64';
const collection = admin.firestore().collection(ANIME_COLLECTION);
/**
 * Update anime from all API by string
 *
 * @param {functions.https.Request} request
 * @param {functions.Response} response
 * @return {void}
 */
const updateAnime = functions.region('us-central1').https.onRequest(async (request, response: functions.Response) => {
  return withAuth(request, response, async () => {
    const searchString = request.query.q;
    if (typeof searchString === 'string') {
      try {
        const result = await searchApiAnime(searchString);
        // Update only if there is data
        if ('data' in result) {
          // Retrieve titles from data
          const animeRomajiTitles = Object.keys(result.data);

          // Create or update firestore document by title
          animeRomajiTitles.map((title) => {
            const encoded = Buffer.from(title).toString('base64');
            const encodedURLsafe = encode(encoded);
            const animeData = result.data[title] as Anime;

            // Set each document
            // Key is encoded romaji title
            collection.doc(encodedURLsafe).set(
              {
                lastUpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
                // undefined is not allowed by default in Firestore
                ...covnertUndefinedToNull(animeData),
              },
              { merge: true },
            );
          });
          const count = animeRomajiTitles.length;
          return response.status(200).json({ message: `Updated ${count} documents` });
        } else {
          return response.status(500).json({ message: result.message });
        }
      } catch (e) {
        functions.logger.error(e);
        return response.status(500).json({
          message: `ERROR: ${JSON.stringify(e)}`,
        });
      }
    } else {
      return response.status(422).json({
        message: 'Please specify search string',
      });
    }
  });
});

export default updateAnime;
