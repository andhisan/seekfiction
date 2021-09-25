import * as functions from 'firebase-functions';
import withAuth from '../_helper/withAuth';

// include functions in these directories
export * as search from './search';
export * as update from './update';

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
