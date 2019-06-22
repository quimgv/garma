import {
  GET_FAVOURS,
  FAVOURS_LOADING,
  GET_FAVOURS_FAILED,
  GET_CURRENT_FAVOUR_FAILED,
  GET_CURRENT_FAVOUR,
  UNMOUNT_CURRENT_FAVOUR
} from "../actions/types";

const inistialState = {
  favoursList: [],
  currentFavour: null,
  favoursCount: null,
  loading: true
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FAVOURS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FAVOURS:
      return {
        ...state,
        favours: [...payload.favours],
        currentFavour: null,
        favoursCount: payload.favoursCount,
        loading: false
      };
    case GET_CURRENT_FAVOUR:
      return {
        favoursList: [],
        currentFavour: payload,
        loading: false,
        favoursCount: null
      };
    case GET_FAVOURS_FAILED:
    case GET_CURRENT_FAVOUR_FAILED:
    case UNMOUNT_CURRENT_FAVOUR:
      return inistialState;
    default:
      return state;
  }
}
