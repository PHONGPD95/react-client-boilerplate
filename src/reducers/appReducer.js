import { toast } from 'react-toastify';

import { ERROR_OCCURRED, LOAD_APP_SUCCEEDED, TOGGLE_UPLOAD_SUCCEEDED } from '~actions/appAction';

const initialState = {
  isLoaded: false,
  isUploaderOpen: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_OCCURRED: {
      const { error = {}, actionName = '', silence = false } = action.payload;

      console.log({
        detail: `Redux action ${actionName} error.`,
        error,
      });

      if (!silence) {
        const notification = error.message || error;

        toast.error(notification);
      }

      return state;
    }

    case LOAD_APP_SUCCEEDED:
      return { ...state, isLoaded: true };

    case TOGGLE_UPLOAD_SUCCEEDED:
      return { ...state, isUploaderOpen: action.payload };

    default:
      return state;
  }
};

export default appReducer;
