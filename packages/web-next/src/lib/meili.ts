// using full version to count index
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const mock = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
};
export const searchClient = instantMeiliSearch(process.env.MEILI_URL ?? '', process.env.MEILI_API_KEY ?? '', {
  paginationTotalHits: 24,
  // show nothing when query is empty
  placeholderSearch: false,
  primaryKey: 'id',
});

/**
 * Fetch index count from meilisearch
 *
 * @see https://docs.meilisearch.com/reference/api/stats.html#get-stat-of-an-index
 */
export const getIndexCount = async (indexName: string) => {
  const json = await fetch(`${process.env.MEILI_URL ?? ''}/indexes/${indexName}/stats`, {
    headers: {
      'X-Meili-API-Key': process.env.MEILI_API_KEY ?? '',
    },
  })
    .then((res) => {
      console.debug(res.statusText);
      return res.json();
    })
    .catch((e) => {
      console.error(e);
    });
  return parseInt(json.numberOfDocuments ?? 0);
};
