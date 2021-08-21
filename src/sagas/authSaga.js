import { call, put, takeLatest } from 'redux-saga/effects';

import authApi from '~api/authApi';

import { ERROR_OCCURRED, LOAD_APP_SUCCEEDED } from '~actions/appAction';
import {
  GET_CURRENT_USER_REQUESTED,
  GET_CURRENT_USER_SUCCEEDED,
  SIGN_IN_REQUESTED,
  SIGN_IN_SUCCEEDED,
  SIGN_OUT_REQUESTED,
  SIGN_OUT_SUCCEEDED,
  SIGN_UP_REQUESTED,
  SIGN_UP_SUCCEEDED,
} from '~actions/authAction';

function* signUp(action) {
  const { _resolve, _reject, payload, type } = action;
  try {
    const createdUser = yield call(authApi.signUp, payload);
    yield put({
      type: SIGN_UP_SUCCEEDED,
      payload: createdUser,
    });

    _resolve(createdUser);
  } catch (error) {
    yield put({
      type: ERROR_OCCURRED,
      payload: {
        error,
        actionName: type,
      },
    });

    _reject(error);
  }
}

function* signIn(action) {
  const { _resolve, _reject, payload, type } = action;
  try {
    const currentUser = yield call(authApi.signIn, payload);
    yield put({
      type: SIGN_IN_SUCCEEDED,
      payload: currentUser,
    });

    _resolve(currentUser);
  } catch (error) {
    yield put({
      type: ERROR_OCCURRED,
      payload: {
        error,
        actionName: type,
      },
    });

    _reject(error);
  }
}

function* signOut(action) {
  const { _resolve, _reject, type } = action;
  try {
    yield call(authApi.signOut);
    yield put({ type: SIGN_OUT_SUCCEEDED });

    _resolve();
  } catch (error) {
    yield put({
      type: ERROR_OCCURRED,
      payload: {
        error,
        actionName: type,
      },
    });

    _reject(error);
  }
}
function* getMe(action) {
  const { _resolve, _reject, type } = action;
  try {
    const currentUser = yield call(authApi.getMe);
    yield put({
      type: GET_CURRENT_USER_SUCCEEDED,
      payload: currentUser,
    });
    yield put({ type: LOAD_APP_SUCCEEDED });

    _resolve(currentUser);
  } catch (error) {
    yield call(authApi.signOut);
    yield put({ type: SIGN_OUT_SUCCEEDED });

    yield put({
      type: ERROR_OCCURRED,
      payload: {
        error,
        actionName: type,
      },
    });

    _reject(error);
  }
}

function* authSaga() {
  yield takeLatest(SIGN_UP_REQUESTED, signUp);
  yield takeLatest(SIGN_IN_REQUESTED, signIn);
  yield takeLatest(GET_CURRENT_USER_REQUESTED, getMe);
  yield takeLatest(SIGN_OUT_REQUESTED, signOut);
}

export default authSaga;
