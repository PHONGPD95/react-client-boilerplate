import {
  GET_CURRENT_USER_SUCCEEDED,
  SIGN_IN_SUCCEEDED,
  SIGN_OUT_SUCCEEDED,
} from '~actions/authAction';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCEEDED:
    case GET_CURRENT_USER_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };

    case SIGN_OUT_SUCCEEDED:
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
