import { combineReducers } from 'redux';

import appReducer from './appReducer';
import authReducer from './authReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  file: fileReducer,
});

export default rootReducer;
