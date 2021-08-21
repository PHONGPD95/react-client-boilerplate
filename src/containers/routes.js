import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthLayout from '~containers/AuthLayout';
import MainLayout from '~containers/MainLayout';

export default () => (
  <Switch>
    <Route exact path={['/']} component={MainLayout} />
    <Route path={['/sign-in', '/sign-up']} component={AuthLayout} />
  </Switch>
);
