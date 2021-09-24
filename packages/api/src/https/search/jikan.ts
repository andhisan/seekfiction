import * as functions from 'firebase-functions';
import withAuth from '../../lib/withAuth';
import axios from 'axios';

/**
 * Search anime by string
 *
 * @param {functions.https.Request} request
 * @param {functions.https.Response} response
 * @return {*}
 */
const searchJikan = functions.region('us-central1').https.onRequest(async (request, response: any) => {
  return withAuth(request, response, async () => {
    const searchString = request.query.q;
    if (typeof searchString === 'string') {
      try {
        await axios
          .get('https://api.jikan.moe/v4/anime', {
            params: {
              q: searchString,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              const json = res.data;
              functions.logger.info(`Searched Jikan API for ${searchString}`);
              return response.status(200).json(json);
            } else {
              const message = `ERROR from Jikan API: ${res.statusText}`;
              functions.logger.error(message);
              return response.status(res.status).json({
                message,
              });
            }
          });
      } catch (e) {
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

export default searchJikan;
