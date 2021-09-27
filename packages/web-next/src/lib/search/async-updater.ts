import type { UpdateResult } from '@sasigume/seekfiction-commons';
import { User } from '@firebase/auth';

/**
 * Send update request on server side
 *
 * @param context
 * @returns
 */
export const asyncUpdater = async (user: User, q: string): Promise<UpdateResult> => {
  let message = 'Error message not returned from API';
  let foundAnimeCount = 0;
  let addedAnimeCount = 0;
  const basePath = process.env.NEXT_PUBLIC_VERCEL_ENV == 'production' ? 'https://sf.sasigu.me' : `//` + process.env.NEXT_PUBLIC_VERCEL_URL;
  if (!user) {
    throw new Error('Please sign in');
  } else {
    return await fetch(basePath + '/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        method: 'GET',
        path: process.env.FUNCTIONS + '/update-anime?q=' + q,
      }),
      headers: {
        Authorization: process.env.FUNCTIONS_AUTH ?? '',
      },
    })
      .then(async (res) => {
        const json = (await res.json()) as UpdateResult;
        if (res.ok) {
          message = json.message ?? null;
          foundAnimeCount = json.foundAnimeCount ?? null;
          addedAnimeCount = json.addedAnimeCount ?? null;

          return {
            message,
            foundAnimeCount,
            addedAnimeCount,
          };
        } else {
          console.error(res.statusText);
          throw new Error(`Error occured while requesting update: ${res.statusText}`);
        }
      })
      .catch((e) => {
        console.error(e);
        throw new Error(`${e}`);
      });
  }
};
