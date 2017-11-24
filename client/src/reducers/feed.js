import { FEED_FETCH_SUCCESS, FEED_FETCH_ERROR } from '../actions/feed';

export default function feed(state = {}, action) {
  switch (action.type) {
    case FEED_FETCH_SUCCESS:
      //console.log(action.payload);
      return Object.assign({}, state, action.payload);
    case FEED_FETCH_ERROR:
      return state;
    default:
      return state;
  }
}
