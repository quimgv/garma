import {
  GET_REQUESTS,
  REQUESTS_LOADING,
  GET_REQUESTS_FAILED,
  UNMOUNT_REQUESTS,
  IS_REQUESTED,
  SET_MY_REQUEST
} from "../actions/types";

const inistialState = {
  requests: [],
  loading: true
};

export default function(state = inistialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUESTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REQUESTS:
      return {
        ...state,
        requests: [...payload],
        loading: false
      };
      case SET_MY_REQUEST:
        return {
          ...state,
          myRequest: payload
        };
    case IS_REQUESTED:
      return {
        ...state,
        isRequested: payload
      };
    case GET_REQUESTS_FAILED:
    case UNMOUNT_REQUESTS:
      return inistialState;
    default:
      return state;
  }
}
