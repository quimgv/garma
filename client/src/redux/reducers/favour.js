import { GET_FAVOURS, CREATE_FAVOUR, FAVOURS_LOADING } from "../actions/types";

const inistialState = {
  favours: [],
  loading: true
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FAVOURS:
      return {
        ...state,
        favours: [...payload],
        loading: false
      };
    case FAVOURS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
