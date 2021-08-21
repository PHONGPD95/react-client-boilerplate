import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

import { CircularProgress } from '@material-ui/core';

import './style.scss';

function Spinner(props) {
  const { loading = false } = props;

  const { promiseInProgress } = usePromiseTracker();

  const renderSpinner = () => {
    return (
      <div className="global-spinner">
        <CircularProgress />
      </div>
    );
  };

  if (loading) return renderSpinner();

  return promiseInProgress && renderSpinner();
}

export default Spinner;
