import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import withAuth from '../../_helper/withAuth';
import { searchApiAnime } from '../../_helper/api/anime';
import { MEILI_ANIME_COLLECTION } from '../../_helper/config';
import { Anime, UpdateResult } from '@sasigume/seekfiction-commons';
import { Buffer } from 'buffer';
import { covnertUndefinedToNull } from '../../_helper/convert';
import { encode } from 'url-safe-base64';
import { updateUserAnimeCount } from '../../_helper/update-user';

const collection = admin.firestore().collection(MEILI_ANIME_COLLECTION);
/**
 * Update (add) anime from all API by search string
 *
 * @param {functions.https.Request} request
 * @param {functions.Response} response
 * @return {void}
 */
const updateAnime = functions.region('us-central1').https.onRequest(async (request, response: functions.Response) => {
  return withAuth(request, response, async (): Promise<UpdateResult> => {
    const searchString = request.query.q;
    const uidString = request.query.uid;
    const updateResult: UpdateResult = {
      message: 'Unknown error occured while updating',
      foundAnimeCount: 0,
      addedAnimeCount: 0,
    };
    if (typeof searchString === 'string') {
      try {
        const result = await searchApiAnime(searchString);
        // Update only if there is data
        if ('data' in result) {
          // Retrieve titles from data
          const animeRomajiTitles = Object.keys(result.data);
          updateResult.foundAnimeCount = animeRomajiTitles.length;
          if (animeRomajiTitles.length > 0) {
            // wait until all write done
            return Promise.all(
              animeRomajiTitles.map(async (title) => {
                const encoded = Buffer.from(title).toString('base64');
                const encodedURLsafe = encode(encoded);
                const animeData = result.data[title] as Anime;
                const docRef = collection.doc(encodedURLsafe);
                const docSnapShot = await docRef.get();

                /**
                /* Skip if already exists.
                /* we actually keep data up-to-date, but writing data
                /* requires costs!
                /** */
                if (docSnapShot.exists) {
                  return;
                }

                // Key is url-safe encoded romaji title
                return collection
                  .doc(encodedURLsafe)
                  .set(covnertUndefinedToNull(animeData), { merge: true })
                  .then(() => {
                    updateResult.addedAnimeCount = updateResult.addedAnimeCount + 1;
                    return;
                  })
                  .catch((e) => {
                    functions.logger.error(e);
                    return e;
                  });
              }),
            ).then(() => {
              updateResult.message = `Found ${updateResult.foundAnimeCount} anime, added ${updateResult.addedAnimeCount} documents`;

              if (typeof uidString === 'string') {
                updateUserAnimeCount(uidString, updateResult.addedAnimeCount).catch((e) => {
                  functions.logger.error(e);
                });
              }
              response.status(200).json(updateResult);
              return updateResult;
            });
          } else {
            updateResult.message = `No anime found`;
            response.status(404).json(updateResult);
            return updateResult;
          }
        } else {
          // if no data at all.
          // this occurs only if api helper func is broken.
          updateResult.message = result.message;
          response.status(500).json(updateResult);
          return updateResult;
        }
      } catch (e) {
        updateResult.message = JSON.stringify(e);
        functions.logger.error(e);
        response.status(500).json(updateResult);
        return updateResult;
      }
    } else {
      updateResult.message = 'Please specify search string';
      response.status(422).json(updateResult);
      return updateResult;
    }
  });
});

export default updateAnime;
