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

export const favourStatusVariant = status => {
  switch (status) {
    case "Open":
      return "success";
    case "In progress":
      return "warning";
    default:
      return "primary";
  }
};

export const requestStatusVariant = status => {
  switch (status) {
    case "Accepted":
      return "success";
    case "Declined":
      return "danger";
    case "Pending":
      return "warning";
    default:
      return "primary";
  }
};

export const isOwner = (favourOwnerId, currentUserId) => {
  if (favourOwnerId === currentUserId) {
    return true;
  }
  return false;
};

export const isHelper = (favourHelperId, currentUserId) => {
  if (favourHelperId === currentUserId) {
    return true;
  }
  return false;
};
