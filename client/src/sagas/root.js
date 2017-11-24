import feedSaga from './feed';

// A single entry point to start all the sagas at once. Using a generator function.
export default function* rootSaga() {
  yield [
    feedSaga(),
  ];
}
