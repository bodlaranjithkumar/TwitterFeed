import { takeLatest, put } from 'redux-saga/effects';
import config from '../config/default';
import api from '../libs/restApiHelper';
import {
  FEED_FETCH_START,
  FEED_FETCH_SUCCESS,
  FEED_FETCH_ERROR
} from '../actions/feed';

// A worker saga. Does all the hard API working code.
// Worker sagas will get resumed whenever the Saga-Middleware gets a response back from the yielded code.
export function* fetchFeed() {
  try {
    const response = yield api.GET(`${config.twitterFeedApi}/feed`);
    yield put({ type: FEED_FETCH_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FEED_FETCH_ERROR, payload: error });
  }
}

// A single entry point to start all the sagas at once. Using a generator function.
export default function* feedSaga() {
  yield takeLatest(FEED_FETCH_START, fetchFeed);
}
