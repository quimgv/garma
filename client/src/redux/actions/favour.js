import {
  CREATE_FAVOUR,
  GET_FAVOURS,
  FAVOURS_LOADING,
  GET_FAVOURS_FAILED,
  GET_CURRENT_FAVOUR,
  GET_CURRENT_FAVOUR_FAILED,
  UNMOUNT_CURRENT_FAVOUR
} from "./types";

import { loadUser } from "./auth";
import { clearAlerts, setAlert } from "./alert";
import { updateUser } from "./user";
import { handleServerErrors } from "../../utils/helperFunctions";

import axios from "axios";

export const favoursLoading = () => ({ type: FAVOURS_LOADING });

export const createFavour = favour => async dispatch => {
  try {
    await axios.post("/favour/", favour);
    dispatch({
      type: CREATE_FAVOUR
    });
    dispatch(loadUser()); // To update user score in navbar
    dispatch(getFavours());
    dispatch(setAlert("Favour created", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const getFavours = (
  categoriesSearch,
  limit = 10,
  skip = 0
) => async dispatch => {
  let queryParams = `?limit=${limit}&skip=${skip}`;

  // if (categoriesSearch.length > 0) {
  //   queryParams = queryParams.concat("&categories=" + categoriesSearch.join());
  // }

  try {
    dispatch(favoursLoading());
    const res = await axios.get(`/favour/${queryParams}`);

    setTimeout(() => dispatch({ type: GET_FAVOURS, payload: res.data }), 1000);

  } catch (err) {
    dispatch({ type: GET_FAVOURS_FAILED });
    handleServerErrors(err, dispatch, setAlert);
    console.log(err);
  }
};

export const getCurrentFavour = favourId => async dispatch => {
  try {
    dispatch(favoursLoading());
    const res = await axios.get("/favour/" + favourId);
    dispatch({
      type: GET_CURRENT_FAVOUR,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_CURRENT_FAVOUR_FAILED });
    handleServerErrors(err, dispatch, setAlert);
    console.log(err);
  }
};

export const unmountCurrentFavour = () => ({ type: UNMOUNT_CURRENT_FAVOUR });

export const editFavour = (favourId, updates) => async dispatch => {
  try {
    await axios.patch("/favour/" + favourId, updates);
    dispatch(getCurrentFavour(favourId));
    dispatch(setAlert("Favour updated", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
    console.log(err);
  }
};

export const deleteFavour = favourId => async dispatch => {
  try {
    const res = await axios.delete("/favour/" + favourId);
    dispatch(setAlert(`Favour "${res.data.title}" deleted`, "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
    console.log(err);
  }
};

export const markAsCompletedHelper = favourId => async dispatch => {
  try {
    await axios.patch("/favour/" + favourId, {
      helper: { status: "Completed" }
    });
    dispatch(getCurrentFavour(favourId));
    dispatch(clearAlerts());
    dispatch(setAlert("Favour marked as completed", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
    console.log(err);
  }
};

export const markAsCompletedOwner = favourId => async dispatch => {
  try {
    const res = await axios.patch("/favour/" + favourId, {
      helper: { status: "Completed" },
      owner: { status: "Completed" },
      status: "Completed"
    });

    // Give points to helper
    await dispatch(
      updateUser(res.data.helper.user._id, {
        score: res.data.helper.user.score + res.data.value
      })
    );
    dispatch(getCurrentFavour(favourId));
    dispatch(clearAlerts());
    dispatch(setAlert("Favour marked as completed", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
    console.log(err);
  }
};
