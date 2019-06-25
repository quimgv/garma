export const handleServerErrors = (err, dispatch, setAlert) => {
  if (err.response.data.showErr) {
    let errors = err.response.data.showErr;

    const errorsArr = Object.keys(errors);
    errorsArr.forEach(errorKey => {
      dispatch(setAlert(errors[errorKey], "danger"));
    });
  } else {
    dispatch(
      setAlert(
        "Upss, something wrong has happened. Please contact us",
        "danger"
      )
    );
  }
};
