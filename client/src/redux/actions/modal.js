import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const handleModal = modalContent => (dispatch, getState) => {
  const { show } = getState().modal;

  if (show === false) {
    dispatch({ type: SHOW_MODAL, payload: modalContent });
  } else if (show === true) {
    dispatch({ type: HIDE_MODAL });
  }
};
