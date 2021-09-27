import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import withAuth from '../../_helper/withAuth';
import { searchApiAnime } from '../../_helper/api/anime';
import { MEILI_ANIME_COLLECTION } from '../../_helper/config';
import { Anime } from '@sasigume/seekfiction-commons';
import { Buffer } from 'buffer';
import { covnertUndefinedToNull } from '../../_helper/convert';
import { encode } from 'url-safe-base64';
const collection = admin.firestore().collection(MEILI_ANIME_COLLECTION);
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
          if (animeRomajiTitles.length > 0) {
            // wait until all write done
            return Promise.all(
              animeRomajiTitles.map((title) => {
                const encoded = Buffer.from(title).toString('base64');
                const encodedURLsafe = encode(encoded);
                const animeData = result.data[title] as Anime;

                // Set each document
                // Key is encoded romaji title
                return collection
                  .doc(encodedURLsafe)
                  .set(covnertUndefinedToNull(animeData), { merge: true })
                  .then((result) => {
                    // return true if write succeed
                    if (result.writeTime) {
                      return true;
                    }
                    return false;
                  });
              }),
            ).then((result) => {
              return response.status(200).json({ message: `Updated ${result.length} documents` });
            });
          } else {
            return response.status(404).json({ message: `No anime found` });
          }
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
