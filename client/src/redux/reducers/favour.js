import { GET_FAVOURS, CREATE_FAVOUR, FAVOURS_LOADING, GET_FAVOURS_FAILED } from "../actions/types";

const inistialState = {
  favours: [],
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
        favours: [...payload],
        loading: false
      };
    case GET_FAVOURS_FAILED:
      return {
        favours: [],
        loading: false
      };
    default:
      return state;
  }
}
