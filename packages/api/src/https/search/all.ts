import * as functions from 'firebase-functions';
import withAuth from '@/_helper/withAuth';
import { searchAllApi } from '@/_helper/api';

/**
 * Search anime from all API by string
 *
 * @param {functions.https.Request} request
 * @param {functions.https.Response} response
 * @return {void}
 */
const searchAll = functions.region('us-central1').https.onRequest(async (request, response: any) => {
  return withAuth(request, response, async () => {
    const searchString = request.query.q;
    if (typeof searchString === 'string') {
      try {
        const data = await searchAllApi(searchString);
        return response.status(200).json(data);
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

export default searchAll;
