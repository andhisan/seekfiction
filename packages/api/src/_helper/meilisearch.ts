import { MeiliSearch } from 'meilisearch';
import * as functions from 'firebase-functions';
import { AdminConfig } from '../models/AdminConfig';
const adminConfig = functions.config() as AdminConfig;

const meilisearch = new MeiliSearch({
  host: adminConfig.meili.url,
  apiKey: adminConfig.meili.key,
});

export default meilisearch;
