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
