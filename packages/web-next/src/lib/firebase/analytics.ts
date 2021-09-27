import { getAnalytics, logEvent } from 'firebase/analytics';

/**
 * Log search query as GA4 search event
 *
 * @param query Search word
 * @see https://developers.google.com/gtagjs/reference/ga4-events#search
 */
export const logSearch = (query: string) => {
  const analytics = getAnalytics();
  logEvent(analytics, 'search', {
    search_term: query,
  });
  console.info(`Logged search query.`);
};
