import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MyPage from 'src/components/enterPageInterceptor';

const supportsHistory = 'pushState' in window.history;
const Routes = (
  <BrowserRouter keyLength={12} forceRefresh={!supportsHistory}>
    <Switch>
      <Route exact={true} path='*' component={MyPage} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
