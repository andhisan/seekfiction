import axios from 'axios';
import * as functions from 'firebase-functions';
import { AdminConfig } from '../../../models/AdminConfig';
import { Search } from '../../../models/Simkl';
import { convertSimklPosterUrl } from '../../convert';
const adminConfig = functions.config() as AdminConfig;

type SimklResult = {
  data: { simkl_id: number; title_romaji: string; simkl_image: string }[];
} & {
  message?: string;
};

/**
 * Search Simkl API for Simkl ids
 *
 * @param {string} searchString Anime title to search. Titles on Simkl are mostly English, not romaji
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
      const json = res.data as Search;
      if (json.length > 0) {
        functions.logger.info(`Searched Simkl API for ${searchString}`);
        const dataArray = json.map((a) => {
          return {
            simkl_id: a.ids.simkl_id,
            title_romaji: a.title_romaji ?? '',
            simkl_image: convertSimklPosterUrl(a.poster) ?? '',
          };
        });
        // use only id
        return { data: dataArray };
      } else {
        const message = `ERROR from Simkl API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    })
    .catch((e) => {
      functions.logger.error(e);
      return { data: [], message: JSON.stringify(e) };
    });
};

export default searchSimkl;
