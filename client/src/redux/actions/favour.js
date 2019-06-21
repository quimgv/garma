import { CREATE_FAVOUR, GET_FAVOURS, FAVOURS_LOADING } from "./types";

import { loadUser } from "../actions/auth";
import { setAlert } from "../actions/alert";
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
    dispatch(setAlert("Favour created", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};

export const getFavours = (categoriesSearch, limit, skip) => async dispatch => {
//   let queryParams = "?limit=" + limit;

//   if (skip) {
//     queryParams = queryParams.concat("&skip=" + skip);
//   }

//   if (categoriesSearch.length > 0) {
//     queryParams = queryParams.concat("&categories=" + categoriesSearch.join());
//   }

  try {
      dispatch(favoursLoading());
    //   const res = await axios.get(`/favour/${queryParams}`);
    const res = await axios.get(`/favour`);
    dispatch({
        type: GET_FAVOURS,
        payload: res.data
      });
    // setTimeout(() => {
    //     dispatch({
    //         type: GET_FAVOURS,
    //         payload: res.data
    //       });
    // }, 3000)
    

  } catch (err) {
    console.log(err);
  }
};
