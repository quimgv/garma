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
    await axios.post(`/favour/requests/${favourId}`, {
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
  let requests;

  try {
    if (favourId) {
      requests = await axios.get(`/favour/requests/${favourId}/favour`);
    } else if (requestFilter === "received") {
      requests = await axios.get(`/favour/requests/${userId}/owner`);
    } else if (requestFilter === "sent") {
      requests = await axios.get(`/favour/requests/${userId}/helper`);
    } else {
      requests = await axios.get(`/favour/requests/${userId}/user`);
    }
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
    const res = await axios.delete("/favour/requests/" + requestId);
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
    const res = await axios.patch("/favour/requests/" + requestId, {
      status: "Accepted"
    });

    // Set helper as helper of the favour and status in progress
    await axios.patch("/favour/" + res.data.favour, {
      status: "In progress",
      owner: { status: "In progress" },
      helper: { user: res.data.helper._id, status: "In progress" }
    });

    // Set rest of requests as declined
    await axios.patch("/favour/requests/updateMany", {
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
    const res = await axios.patch("/favour/requests/" + requestId, {
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
