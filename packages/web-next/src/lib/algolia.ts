import algoliasearch from 'algoliasearch/lite';
const appId = process.env.ALGOLIA_APP_ID ?? '';
const apiKey = process.env.ALGOLIA_SEARCH_API_KEY ?? '';
export const algolia = algoliasearch(appId, apiKey);
