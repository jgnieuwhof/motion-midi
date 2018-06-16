import React from 'react';
import { Switch, Router as ReactRouter } from 'react-router';

import history from 'common/history';

const Router = ({ children }) => (
  <ReactRouter {...{ history }}>
    <Switch>{children}</Switch>
  </ReactRouter>
);

export default Router;
