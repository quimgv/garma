import {
  GET_REQUESTS,
  REQUESTS_LOADING,
  GET_REQUESTS_FAILED,
  UNMOUNT_REQUESTS,
  IS_REQUESTED,
  SET_MY_REQUEST,
  CHECK_PENDING_REQUESTS,
  CHECK_PENDING_REQUESTS_FAILED
} from "../actions/types";

const inistialState = {
  requests: [],
  pendingRequests: false,
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
    case CHECK_PENDING_REQUESTS:
      return {
        ...state,
        pendingRequests: payload
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
    case CHECK_PENDING_REQUESTS_FAILED:
      return inistialState;
    default:
      return state;
  }
}
