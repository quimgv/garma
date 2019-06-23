import React, { Fragment } from "react";

// Redux
import { connect } from "react-redux";

// Components
import Loader from "../Common/Loader";
import OwnAssigned from "../FavourItem/OwnAssignedBadge";
import FavourStatus from "../FavourItem/FavourStatus";
import FavourItemActions from '../FavourItem/FavourItemActions';

const FavourItem = ({ favour, favourLoading }) => {
  if (favourLoading) {
    return <Loader />;
  } else if (favour) {
    const { categories, description, difficulty, title, urgency, value } = favour;
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
  favourLoading: state.favour.loading
});

export default connect(mapStateToProps)(FavourItem);
