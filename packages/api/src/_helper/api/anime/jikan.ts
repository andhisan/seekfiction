import axios from 'axios';
import * as functions from 'firebase-functions';
import { Search } from '../../../models/Jikan';

type JikanResult = {
  data: { mal_id: number; title_romaji: string; mal_image: string }[];
} & {
  message?: string;
};

/**
 * Search Jikan API for MyAnimeList ids
 *
 * @param {string} searchString Anime title to search
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
          // Jikan returns romaji title as default since it's MAL
          return {
            mal_id: a.mal_id,
            title_romaji: a.title ?? '',
            mal_image: a.images.jpg.large_image_url ?? a.images.jpg.image_url,
          };
        });
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
