import axios from 'axios';
import * as functions from 'firebase-functions';
import { Search } from '../../models/Kitsu';

type KitsuResult = {
  data: { id: number }[];
} & {
  message?: string;
};

/**
 * Search Kitsu API for Kitsu ids
 *
 * @param {string} searchString
 * @return {Promise<KitsuResult>}
 */
const searchKitsu = async (searchString: string): Promise<KitsuResult> => {
  return await axios
    .get('https://kitsu.io/api/edge/anime', {
      params: {
        'filter[text]': searchString,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        const json = res.data as Search;
        functions.logger.info(`Searched Kitsu API for ${searchString}`);
        const dataArray = json.data.map((a) => {
          return { id: parseInt(a.id) };
        });
        // use only id
        return { data: dataArray };
      } else {
        const message = `ERROR from Kitsu API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    });
};

export default searchKitsu;
