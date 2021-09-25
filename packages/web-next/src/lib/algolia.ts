import algoliasearch from 'algoliasearch/lite';
import { MultipleQueriesQuery } from '@algolia/client-search';

const appId = process.env.ALGOLIA_APP_ID ?? '';
const apiKey = process.env.ALGOLIA_SEARCH_API_KEY ?? '';

const mock = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
};
const searchClient = algoliasearch(appId, apiKey);

// Pass empty
export const algolia = {
  ...searchClient,
  search(requests: MultipleQueriesQuery[]) {
    if (requests.every(({ params }) => !params?.query)) {
      return Promise.resolve(mock);
    }
    return searchClient.search(requests);
  },
};
