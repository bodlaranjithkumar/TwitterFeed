import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import feed from './feed';

export default combineReducers({
  feed,
  routing,
});
