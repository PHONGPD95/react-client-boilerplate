import { call, put, takeLatest } from 'redux-saga/effects';

import fileApi from '~api/fileApi';

import { ERROR_OCCURRED, TOGGLE_UPLOAD_SUCCEEDED } from '~actions/appAction';
import {
  DELETE_FILE_REQUESTED,
  DELETE_FILE_SUCCEEDED,
  GET_ALL_FILES_REQUESTED,
  GET_ALL_FILES_SUCCEEDED,
  UPLOAD_FILES_REQUESTED,
  UPLOAD_FILES_SUCCEEDED,
} from '~actions/fileAction';

function* getAllFiles(action) {
  const { _resolve, _reject, type } = action;
  try {
    const files = yield call(fileApi.getAll);
    yield put({
      type: GET_ALL_FILES_SUCCEEDED,
      payload: files,
    });

    _resolve(files);
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

function* uploadFiles(action) {
  const { _resolve, _reject, type, payload } = action;
  try {
    const files = yield call(fileApi.upload, payload);
    yield put({
      type: UPLOAD_FILES_SUCCEEDED,
      payload: files,
    });

    yield put({
      type: TOGGLE_UPLOAD_SUCCEEDED,
      payload: false,
    });

    _resolve(files);
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

function* deleteFile(action) {
  const { _resolve, _reject, type, payload } = action;
  try {
    const file = yield call(fileApi.delete, payload);
    yield put({
      type: DELETE_FILE_SUCCEEDED,
      payload: file,
    });

    _resolve(file);
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

function* fileSaga() {
  yield takeLatest(GET_ALL_FILES_REQUESTED, getAllFiles);
  yield takeLatest(UPLOAD_FILES_REQUESTED, uploadFiles);
  yield takeLatest(DELETE_FILE_REQUESTED, deleteFile);
}

export default fileSaga;
