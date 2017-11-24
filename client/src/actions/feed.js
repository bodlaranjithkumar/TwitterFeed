export const FEED_FETCH_START = 'FEED_FETCH_START';
export const FEED_FETCH_SUCCESS = 'FEED_FETCH_SUCCESS';
export const FEED_FETCH_ERROR = 'FEED_FETCH_ERROR';

export function fetchFeed() {
  return { type: FEED_FETCH_START };
}
