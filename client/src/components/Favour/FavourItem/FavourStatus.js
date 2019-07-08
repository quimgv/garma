import React from "react";
import {
  isOwner,
  isHelper
} from "../FavourHelpers";

// Redux
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";

const FavourStatus = ({ favour, user, requests, setAlert }) => {
  let favourStatus;
  if (favour.status === "Open") {
    favourStatus = "Open";
    const hasBeenRequested =
      requests.filter(request => favour._id === request.favour._id && request.status === 'Pending').length > 0;
    const hasBeenRequestedByUser =
      requests.filter(request => user._id === request.helper._id).length > 0;
    if (isOwner(favour.owner.user._id, user._id) && hasBeenRequested) {
      setAlert("You have pending requests, waiting for your decision", "info");
    } else if (hasBeenRequestedByUser) {
      setAlert("Waiting for owner's favour confirmation", "info");
    }
  } else if (favour.status === "In progress") {
    favourStatus = "In progress";
    if (isOwner(favour.owner.user._id, user._id)) {
      setAlert("Waiting for helper to complete the favour", "info");
      if (favour.helper.status === "Completed") {
        setAlert(
          "Waiting for you to confirm that the favour is completed",
          "info"
        );
      }
    } else if (
      favour.helper.user &&
      isHelper(favour.helper.user._id, user._id)
    ) {
      setAlert("Waiting for you to complete the favour", "info");
      if (favour.helper.status === "Completed") {
        setAlert(
          "Waiting for the owner to confirm that the favour is completed",
          "info"
        );
      }
    }
  } else if (favour.status === "Completed") {
    favourStatus = 'Completed'
    if (favour.helper.user && isHelper(favour.helper.user._id, user._id)) {
      favourStatus += " by you";
    } else {
      favourStatus += " by " + favour.helper.user.name;
    }
  }
  return <p>Status: {favourStatus}</p>;
};

const mapStateToProps = state => {
  return {
    favour: state.favour.currentFavour,
    user: state.auth.user,
    requests: state.requests.requests
  };
};

export default connect(
  mapStateToProps,
  { setAlert }
)(FavourStatus);
