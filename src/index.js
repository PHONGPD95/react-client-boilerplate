import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { toast } from 'react-toastify';

import App from '~containers/App';

import rootReducer from '~reducers/rootReducer';

import rootSaga from '~sagas/rootSaga';

import '~styles/index.scss';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') middleware.push(createLogger());

const store = createStore(
  rootReducer,
  applyMiddleware(
    () => (next) => (action) => {
      return new Promise((resolve, reject) =>
        next({ ...action, _resolve: resolve, _reject: reject })
      );
    },
    ...middleware
  )
);

sagaMiddleware.run(rootSaga);

toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
