import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

import './style.scss';

function Auth() {
  return (
    <div className="auth-layout">
      <Switch>
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </Switch>
    </div>
  );
}

export default Auth;
