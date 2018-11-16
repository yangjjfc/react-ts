import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import * as Loadable from 'react-loadable'; //懒加载1

import Login from '../pages/login';

const LoadableComponent = Loadable({
  loader: () => import('../pages/dashboard'),
  loading: (() => null),
});

// import Table from '../pages/table/table'
// import Auth from '../pages/login';
// import Dashboard from '../pages/dashboard'
const supportsHistory = 'pushState' in window.history;
const Routes = (
  <BrowserRouter keyLength={12} forceRefresh={!supportsHistory}>
    <Switch>
      <Route exact={true} path='/' component={Login} />
      <Route path='/app/login' component={LoadableComponent} />
      <Route path='/app/form' component={LoadableComponent} />
      <Route path='/app/table' component={LoadableComponent} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
