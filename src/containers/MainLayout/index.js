import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NavBar from '~components/Navbar';

import storage from '~constants/storage';

import { readStorage } from '~utils/handleStorage';

import FileManager from './FileManager';

import './style.scss';

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  const auth = readStorage(storage.AUTH);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth) return <Component {...rest} />;

        return (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function PrivateLayout() {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="main-content">
        <Switch>
          <PrivateRoute path="/" exact component={FileManager} />
        </Switch>
      </div>
    </div>
  );
}

export default PrivateLayout;
