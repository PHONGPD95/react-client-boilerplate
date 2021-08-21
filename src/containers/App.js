import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import Spinner from '~components/Spinner';

import { GET_CURRENT_USER_REQUESTED } from '~actions/authAction';
import { LOAD_APP_SUCCEEDED } from '~actions/appAction';

import storage from '~constants/storage';

import { readStorage } from '~utils/handleStorage';

import Router from './routes';
import { trackPromise } from 'react-promise-tracker';

const theme = createTheme({});

function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((state) => state.app);

  useEffect(() => {
    const authTokers = readStorage(storage.AUTH);
    if (authTokers) {
      trackPromise(dispatch({ type: GET_CURRENT_USER_REQUESTED })).catch((err) => {
        console.log(err.message);
        dispatch({ type: LOAD_APP_SUCCEEDED });
      });
    } else dispatch({ type: LOAD_APP_SUCCEEDED });
  }, []);

  if (!isLoaded) return <Spinner loading={true} />;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      <Spinner />
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
