import axios from 'axios';
import * as functions from 'firebase-functions';
import { AdminConfig } from '../../models/AdminConfig';
import { Search } from '../../models/Simkl';
const adminConfig = functions.config() as AdminConfig;

type SimklResult = {
  data: { id: number }[];
} & {
  message?: string;
};

/**
 * Search Simkl API for Simkl ids
 *
 * @param {string} searchString
 * @return {Promise<SimklResult>}
 */
const searchSimkl = async (searchString: string): Promise<SimklResult> => {
  const client_id = adminConfig.simkl.client_id;
  return await axios
    .get('https://api.simkl.com/search/anime', {
      params: {
        q: searchString,
        client_id,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        const json = res.data as Search;
        functions.logger.info(`Searched Simkl API for ${searchString}`);
        const dataArray = json.map((a) => {
          return { id: a.ids.simkl_id };
        });
        // use only id
        return { data: dataArray };
      } else {
        const message = `ERROR from Simkl API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    });
};

export default searchSimkl;
