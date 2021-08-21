import {
  DELETE_FILE_SUCCEEDED,
  GET_ALL_FILES_SUCCEEDED,
  UPLOAD_FILES_SUCCEEDED,
} from '~actions/fileAction';

const initialState = {
  list: [],
  limit: 10,
  offset: 0,
  total: 0,
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FILES_SUCCEEDED: {
      const { docs, limit, offset, totalDocs } = action.payload;

      const clonedList = [...docs];

      return {
        ...state,
        list: clonedList,
        limit,
        offset,
        total: totalDocs,
      };
    }

    case UPLOAD_FILES_SUCCEEDED: {
      const clonedList = [...state.list];

      clonedList.push(...action.payload);

      return {
        ...state,
        list: clonedList,
        total: state.total + action.payload.length,
      };
    }

    case DELETE_FILE_SUCCEEDED: {
      const clonedList = [...state.list];

      const index = clonedList.findIndex((item) => item.id === action.payload.id);

      const existingFile = clonedList[index];
      if (!existingFile) return state;

      clonedList.splice(index, 1);

      return {
        ...state,
        list: clonedList,
      };
    }

    default:
      return state;
  }
};

export default fileReducer;
