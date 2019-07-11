import axios from "axios";

import { clearAlerts, setAlert } from "../actions/alert";
import { handleServerErrors } from "../../utils/helperFunctions";
import {
  GET_REQUESTS,
  GET_REQUESTS_FAILED,
  UNMOUNT_REQUESTS,
  IS_REQUESTED,
  SET_MY_REQUEST,
  REQUESTS_LOADING
} from "./types";

import { getCurrentFavour } from "./favour";

export const requestFavour = (
  favourId,
  helperId,
  ownerId,
  message
) => async dispatch => {
  try {
    await axios.post(`/favourRequests/${favourId}`, {
      helper: helperId,
      owner: ownerId,
      message
    });
    dispatch(getRequests(favourId));
    dispatch(setAlert("Favour requested", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const getRequests = (
  favourId,
  userId,
  requestFilter
) => async dispatch => {
  let filters = "";

  if (favourId || userId) filters = "?";

  if (favourId) {
    filters += "favour=" + favourId;
  } else if (requestFilter === "received") {
    filters += "owner=" + userId;
  } else if (requestFilter === "sent") {
    filters += "helper=" + userId;
  }

  try {
    const requests = await axios.get(`/favourRequests/${filters}`);

    dispatch({ type: REQUESTS_LOADING });

    setTimeout(() => {
      dispatch({
        type: GET_REQUESTS,
        payload: requests.data
      });
    }, 600);
  } catch (err) {
    dispatch({ type: GET_REQUESTS_FAILED });
  }
};

export const isRequested = isRequested => dispatch => {
  dispatch({
    type: IS_REQUESTED,
    payload: isRequested
  });
};

export const setMyRequest = request => dispatch => {
  dispatch({
    type: SET_MY_REQUEST,
    payload: request
  });
};

export const takeRequestBack = requestId => async dispatch => {
  try {
    const res = await axios.delete("/favourRequests/" + requestId);
    dispatch(getRequests(res.data.favour));
    dispatch(clearAlerts());
    dispatch(setAlert("Request taken back", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const unmountRequests = () => ({ type: UNMOUNT_REQUESTS });

export const acceptRequest = requestId => async dispatch => {
  try {
    // Set request as accepted
    const res = await axios.patch("/favourRequests/" + requestId, {
      status: "Accepted"
    });

    // Set helper as helper of the favour and status in progress
    await axios.patch("/favour/" + res.data.favour, {
      status: "In progress",
      owner: { status: "In progress" },
      helper: { user: res.data.helper._id, status: "In progress" }
    });

    // Set rest of requests as declined
    await axios.patch("/favourRequests/updateMany", {
      action: "declineRestOfRequests",
      favourId: res.data.favour,
      requestId,
      update: { status: "Declined" }
    });

    // Display new content & alerts
    dispatch(getCurrentFavour(res.data.favour));
    dispatch(getRequests(res.data.favour));
    dispatch(clearAlerts());
    dispatch(setAlert(`${res.data.helper.name}'s request accepted`, "info"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const declineRequest = requestId => async dispatch => {
  try {
    // Set request as declined
    const res = await axios.patch("/favourRequests/" + requestId, {
      status: "Declined"
    });

    // Display new content & alerts
    dispatch(getRequests(res.data.favour));
    dispatch(clearAlerts());
    dispatch(setAlert(`${res.data.helper.name}'s request declined`, "info"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const readRequests = () => async (dispatch, getState) => {
  let requestsId = [];
  const requestsUnread = getState().requests.requests.filter(
    request =>
      request.read === false && request.owner._id === getState().auth.user._id
  );
  for (let request of requestsUnread) {
    requestsId.push(request._id);
  }

  console.log("RequestsId", requestsId);

  try {
    // Set unread requests as read
    if (requestsId.length > 0) {
      await axios.patch("/favourRequests/updateMany", {
        action: "setUnreadRequestsAsRead",
        requestsId,
        update: { read: true }
      });
    }
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};
