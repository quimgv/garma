import axios from "axios";
import { loadUser } from "../actions/auth";
import { setAlert } from "../actions/alert";
import { handleServerErrors } from "../../utils/helperFunctions";

export const updateUser = (userId, update) => async dispatch => {

    try {
        await axios.patch('/users/' + userId, update);
        dispatch(loadUser());
    } catch(err) {
        handleServerErrors(err, dispatch, setAlert);
    }

}