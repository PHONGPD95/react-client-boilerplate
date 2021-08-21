import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import fileSaga from './fileSaga';

export default function* rootSaga() {
  yield all([authSaga(), fileSaga()]);
}
