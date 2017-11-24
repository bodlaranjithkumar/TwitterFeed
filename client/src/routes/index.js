import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from '../components/container/Main';
import feed from '../components/container/feed';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={feed} />
  </Route>
);
