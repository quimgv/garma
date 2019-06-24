import axios from "axios";

import { setAlert } from "../actions/alert";
import { handleServerErrors } from "../../utils/helperFunctions";
import {
  GET_FAVOUR_REQUESTS,
  GET_FAVOUR_REQUESTS_FAILED,
  UNMOUNT_REQUESTS,
  IS_REQUESTED,
  SET_MY_REQUEST
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
    dispatch(getFavourRequests(favourId));
    dispatch(setAlert("Favour requested", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const getFavourRequests = favourId => async dispatch => {
  try {
    const res = await axios.get(`/favourRequests/favour/${favourId}`);
    dispatch({
      type: GET_FAVOUR_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_FAVOUR_REQUESTS_FAILED });
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
    dispatch(getFavourRequests(res.data.favour));
    dispatch(setAlert("Request taken back", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const unmountRequests = () => ({ type: UNMOUNT_REQUESTS });

export const acceptRequest = requestId => async dispatch => {
  try {
    const res = await axios.patch("/favourRequests/" + requestId, {
      status: "Accepted"
    });
    const favour = await axios.patch("/favour/" + res.data.favour, {
      status: "In progress",
      owner: { status: "In progress" },
      helper: { user: res.data.helper._id, status: "In progress" }
    });
    const declineRest = await axios.patch("/favourRequests/updateMany", {
      action: "declineRestOfRequests",
      favourId: res.data.favour,
      requestId,
      update: { status: "Declined" }
    });
    console.log("Request", res.data);
    console.log("Favour", favour.data);
    console.log("Decline Rest", declineRest);
    dispatch(getCurrentFavour(res.data.favour));
    dispatch(getFavourRequests(res.data.favour));
    dispatch(setAlert(`${res.data.helper.name}'s request accepted`, "info"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const declineRequest = requestId => async dispatch => {
  try {
    const res = await axios.patch("/favourRequests/" + requestId, {
      status: "Declined"
    });
    dispatch(getFavourRequests(res.data.favour));
    dispatch(setAlert(`${res.data.helper.name}'s request declined`, "info"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};
