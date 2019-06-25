import React, { Fragment } from "react";

import { isOwner } from "../FavourHelpers";

// Redux
import { connect } from "react-redux";

// Components
import Loader from "../../Common/Loader";
import OwnAssigned from "./OwnAssignedBadge";
import FavourStatus from "./FavourStatus";
import FavourItemActions from './FavourItemActions';

const FavourItem = ({ favour, favourLoading, user }) => {
  if (favourLoading) {
    return <Loader />;
  } else if (favour) {
    const { categories, description, difficulty, helper, title, urgency, value } = favour;
    return (
      <Fragment>
        <div className="card mb-4">
          <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h5 className="card-title">{title}</h5>
              <OwnAssigned />
            </div>
            <p>{description}</p>
            <p>Value: {value}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Urgency: {urgency}</p>
            <p>Status: <FavourStatus /></p>
            <p>Categories: {categories.map(category => '#' + category)}</p>
            {helper.user && isOwner(favour.owner.user._id, user._id) && <p>Assigned to: {helper.user.name}</p>}
            <FavourItemActions />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <div />;
  }
};

const mapStateToProps = state => ({
  favour: state.favour.currentFavour,
  favourLoading: state.favour.loading,
  user: state.auth.user
});

export default connect(mapStateToProps)(FavourItem);
