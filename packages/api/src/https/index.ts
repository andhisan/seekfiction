import * as functions from 'firebase-functions';
import withAuth from '../lib/withAuth';

// include functions under search directory
export * as search from './search';

/**
 * Return API Status
 *
 * @param {functions.https.Request} request
 * @param {functions.https.Response} response
 * @return {void}
 */
exports.status = functions.region('us-central1').https.onRequest(async (request, response) => {
  return withAuth(request, response, async () => {
    return response.status(200).json({
      message: `OK`,
    });
  });
});
