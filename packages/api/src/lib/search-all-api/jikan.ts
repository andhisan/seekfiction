import axios from 'axios';
import * as functions from 'firebase-functions';
import { Search } from '../../models/Jikan';

type JikanResult = {
  data: { id: number; title_romaji: string; image: string }[];
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
      const json = res.data as Search;
      if (json.data.length > 0) {
        functions.logger.info(`Searched Jikan API for ${searchString}`);
        const dataArray = json.data.map((a) => {
          return { id: a.mal_id, title_romaji: a.title ?? '', image: a.images.jpg.image_url ?? '' };
        });
        // use only id
        return { data: dataArray };
      } else {
        const message = `ERROR from Jikan API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    })
    .catch((e) => {
      functions.logger.error(e);
      return { data: [], message: e };
    });
};

export default searchJikan;
