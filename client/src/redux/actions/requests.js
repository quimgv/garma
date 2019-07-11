import axios from "axios";

import { clearAlerts, setAlert } from "../actions/alert";
import { handleServerErrors } from "../../utils/helperFunctions";
import {
  GET_REQUESTS,
  GET_REQUESTS_FAILED,
  UNMOUNT_REQUESTS,
  IS_REQUESTED,
  SET_MY_REQUEST,
  REQUESTS_LOADING,
  CHECK_PENDING_REQUESTS,
  CHECK_PENDING_REQUESTS_FAILED
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
  } else if (requestFilter === "all") {
    filters += "owner=" + userId + "&helper=" + userId;
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

export const checkPendingRequests = userId => async dispatch => {
  try {
    const requests = await axios.get(
      `/favourRequests/?owner=${userId}&status=Pending&op=$and`
    );

    dispatch({
      type: CHECK_PENDING_REQUESTS,
      payload: requests.data.length > 0 ? true : false
    });
  } catch (err) {
    dispatch({ type: CHECK_PENDING_REQUESTS_FAILED });
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

export const acceptRequest = (requestId, pagePath) => async dispatch => {
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
    if (pagePath === "/requests/") {
      dispatch(getRequests(null, res.data.owner._id));
    } else if (pagePath === "/favour/:id") {
      dispatch(getCurrentFavour(res.data.favour));
      dispatch(getRequests(res.data.favour));
    }
    dispatch(checkPendingRequests(res.data.owner._id));
    dispatch(clearAlerts());
    dispatch(setAlert(`${res.data.helper.name}'s request accepted`, "info"));

    // Return request response to update the content
    // displayed conditionally depending on the page
    return res;
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const declineRequest = (requestId, pagePath) => async dispatch => {
  try {
    // Set request as declined
    const res = await axios.patch("/favourRequests/" + requestId, {
      status: "Declined"
    });

    // Display new content & alerts
    if (pagePath === "/requests/") {
      dispatch(getRequests(null, res.data.owner));
    } else if (pagePath === "/favour/:id") {
      dispatch(getRequests(res.data.favour));
    }
    console.log('RESPUESTA',res.data)
    dispatch(checkPendingRequests(res.data.owner));
    dispatch(clearAlerts());
    dispatch(setAlert(`${res.data.helper.name}'s request declined`, "info"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};
