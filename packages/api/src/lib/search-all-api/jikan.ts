import axios from 'axios';
import * as functions from 'firebase-functions';
import { Search } from '../../models/Jikan';

type JikanResult = {
  data: { id: number }[];
} & {
  message?: string;
};

/**
 * Search Jikan API for MyAnimeList ids
 *
 * @param {string} searchString
 * @return {Promise<JikanResult>}
 */
const searchJikan = async (searchString: string): Promise<JikanResult> => {
  return await axios
    .get('https://api.jikan.moe/v4/anime', {
      params: {
        q: searchString,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        const json = res.data as Search;
        functions.logger.info(`Searched Jikan API for ${searchString}`);
        const dataArray = json.data.map((a) => {
          return { id: a.mal_id };
        });
        // use only id
        return { data: dataArray };
      } else {
        const message = `ERROR from Jikan API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    });
};

export default searchJikan;
