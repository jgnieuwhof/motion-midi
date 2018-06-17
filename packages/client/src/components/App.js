import React from 'react';
import { Route } from 'react-router';

import '../../node_modules/grommet/grommet.min.css';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Section from 'grommet/components/Section';

import Router from 'components/Router';
import Dashboard from 'components/Dashboard';
import Sidebar from 'components/Sidebar';
import NoMatch from 'components/NoMatch';

const SidebarPage = Component => () => (
  <Split flex="right">
    <Sidebar />
    <Section pad="large" full>
      <Component />
    </Section>
  </Split>
);

export default () => (
  <App centered={false}>
    <Router>
      <Route exact path="/" component={SidebarPage(Dashboard)} />
      <Route component={SidebarPage(NoMatch)} />
    </Router>
  </App>
);
