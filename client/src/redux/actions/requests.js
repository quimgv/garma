import axios from "axios";

import { setAlert } from "../actions/alert";
import { handleServerErrors } from "../../utils/helperFunctions";

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
    dispatch(setAlert("Favour requested", "success"));
  } catch (err) {
    handleServerErrors(err, dispatch, setAlert);
  }
};
