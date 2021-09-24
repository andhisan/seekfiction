import axios from 'axios';
import * as functions from 'firebase-functions';

type AniListGraphQLResult = {
  data: {
    Page: {
      media: [{ id: number; title: { romaji: string }; coverImage: { large: string } }];
    };
  };
};

type AniListResult = {
  data: { id: number; title_romaji: string; image: string }[];
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
          large
        }
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
            id: a.id,
            // Return romaji title
            title_romaji: a.title.romaji ?? '',
            // AniList API's 'large' seems to be actually 'medium' size
            image: a.coverImage.large ?? '',
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
      return { data: [], message: e };
    });
};

export default searchAniList;
