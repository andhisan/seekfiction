import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';
import { AdminConfig } from '@/models/AdminConfig';
const adminConfig = functions.config() as AdminConfig;

const algolia = algoliasearch(adminConfig.algolia.app_id, adminConfig.algolia.admin_api_key);

export default algolia;
