import * as functions from 'firebase-functions';
import withAuth from '../../lib/withAuth';
import { searchAllApi } from '../../lib/search-all-api';

/**
 * Search anime from all API by string
 *
 * @param {functions.https.Request} request
 * @param {functions.https.Response} response
 * @return {*}
 */
const searchAll = functions.region('us-central1').https.onRequest(async (request, response: any) => {
  return withAuth(request, response, async () => {
    const searchString = request.query.q;
    if (typeof searchString === 'string') {
      try {
        const data = await searchAllApi(searchString);
        if (!data.message) {
          return response.status(200).json(data);
        } else {
          return response.status(500).json({
            message: JSON.stringify(data),
          });
        }
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

export default searchAll;
