import * as functions from 'firebase-functions';
import { AdminConfig } from '../models/AdminConfig';
const adminConfig = functions.config() as AdminConfig;

/**
 * Authenticate request with key configured with functions:config:set
 *
 * @param {functions.https.Request} request
 * @param {functions.https.Response} response
 * @param {Function} next
 * @return {*}
 */
const withAuth = (request: functions.https.Request, response: any, next: Function) => {
  const secret = request.headers.authorization as string | undefined;

  if (secret !== adminConfig.web.auth) {
    return response.status(401).json({
      message: 'Invalid token',
    });
  } else {
    next();
  }
};

export default withAuth;
