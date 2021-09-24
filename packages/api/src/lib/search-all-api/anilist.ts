import axios from 'axios';
import * as functions from 'firebase-functions';

type AniListGraphQLResult = {
  data: {
    Page: {
      media: [{ id: number }];
    };
  };
};

type AniListResult = {
  data: { id: number }[];
} & {
  message?: string;
};

/**
 * Search AniList API for AniList ids
 *
 * @param {string} searchString
 * @return {Promise<AniListResult>}
 */
const searchAniList = async (searchString: string): Promise<AniListResult> => {
  const query = `
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      media(id: $id, search: $search) {
        id
      }
    }
  }
  `;
  const variables = {
    search: searchString,
    page: 1,
    perPage: 5,
  };
  return await axios(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: JSON.stringify({ query, variables }),
  }).then((res) => {
    if (res.status == 200) {
      const json = res.data as AniListGraphQLResult;
      functions.logger.info(`Searched AniList API for ${searchString}`);
      const dataArray = json.data.Page.media.map((a) => {
        return {
          id: a.id,
        };
      });
      return { data: dataArray };
    } else {
      const message = `ERROR from AniList API: ${res.statusText}`;
      functions.logger.error(message);
      return { data: [], message };
    }
  });
};

export default searchAniList;
