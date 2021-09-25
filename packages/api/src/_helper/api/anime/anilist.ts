import axios from 'axios';
import * as functions from 'firebase-functions';
import { AniListGraphQLResult } from '../../../models/AniList';

type AniListResult = {
  data: { aniList_id: number; title_romaji: string; aniList_image: string }[];
} & {
  message?: string;
};

/**
 * Search AniList API for AniList ids
 *
 * @param {string} searchString Anime title to search
 * @return {Promise<AniListResult>}
 */
const searchAniList = async (searchString: string): Promise<AniListResult> => {
  // We have to use special page query for multiple results
  // Check https://anilist.gitbook.io/anilist-apiv2-docs/overview/graphql/pagination
  const query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      media(id: $id, search: $search, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
        isAdult
      }
    }
  }
  `;
  const variables = {
    search: searchString,
    page: 1,
    perPage: 50,
  };
  return await axios(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: JSON.stringify({ query, variables }),
  })
    .then((res) => {
      const json = res.data as AniListGraphQLResult;
      if (json.data.Page.media.length > 0) {
        functions.logger.info(`Searched AniList API for ${searchString}`);
        const dataArray = json.data.Page.media.map((a) => {
          return {
            aniList_id: a.id,
            // Return romaji title
            title_romaji: a.title.romaji ?? '',
            // AniList API's 'large' seems to be actually 'medium' size
            aniList_image: a.coverImage.extraLarge ?? '',
            nsfw: a.isAdult,
          };
        });
        return { data: dataArray };
      } else {
        const message = `ERROR from AniList API: ${res.statusText}`;
        functions.logger.error(message);
        return { data: [], message };
      }
    })
    .catch((e) => {
      functions.logger.error(e);
      return { data: [], message: JSON.stringify(e) };
    });
};

export default searchAniList;
