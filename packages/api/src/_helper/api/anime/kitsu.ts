import axios from 'axios';
import * as functions from 'firebase-functions';
import { Search } from '../../../models/Kitsu';

type KitsuResult = {
  data: { kitsu_id: number; title_romaji: string; kitsu_image: string; slug: string }[];
} & {
  message?: string;
};

/**
 * Search Kitsu API for Kitsu ids
 *
 * @param {string} searchString Anime title to search
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
      const json = res.data as Search;
      if (json.data.length > 0) {
        functions.logger.info(`Searched Kitsu API for ${searchString}`);
        const dataArray = json.data.map((a) => {
          return {
            // Kitsu API returns string, not number
            kitsu_id: parseInt(a.id),
            // en_jp means Romaji title
            title_romaji: a.attributes.titles.en_jp ?? a.attributes.titles.en,
            kitsu_image: a.attributes.posterImage.original ?? a.attributes.coverImage.original,
            slug: a.attributes.slug,
          };
        });
        return { data: dataArray };
      } else {
        const message = `ERROR from Kitsu API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    })
    .catch((e) => {
      functions.logger.error(e);
      return { data: [], message: e };
    });
};

export default searchKitsu;
