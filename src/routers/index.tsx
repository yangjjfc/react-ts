import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import Table from '../pages/table/table'
// import Auth from '../pages/login';
import App from '../pages/dashboard';
// import Dashboard from '../pages/dashboard'

const Routes = (
  <BrowserRouter keyLength={12}>
    <Switch>
      <Route exact={true} path='/' component={App} />
      <Route path='/app/login' component={App} />
      <Route path='/app/form' component={App} />
      <Route path='/app/table' component={App} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
