import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';

export const setAlert = ( msg, alertType, dismissible = true, timeout ) => (dispatch, getState) => {

    if(getState().alert.filter(alert => alert.msg === msg).length > 0) {
        return;
    }

    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { 
            msg, 
            alertType, 
            id,
            dismissible 
        }
    });

    if(timeout) {
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }
};

export const clearAlerts = () => dispatch => {
    dispatch({
        type: CLEAR_ALERTS
    });
}