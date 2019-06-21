import React, { Fragment, useEffect } from "react";

// Redux
import { connect } from 'react-redux';

// Components
import Loader from '../Common/Loader';
import OwnAssigned from '../FavourItem/OwnAssignedBadge';

const FavourItem = ({ favour, favourLoading }) => {

  if (favourLoading) {
    return <Loader />;
  } else if(favour) {
    return (
      <Fragment>
        <div className="card mb-4">
          <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h5 className="card-title">{favour.title}</h5>
              <OwnAssigned />
            </div>
            <p>{favour.description}</p>
            <p>Value: 10</p>
            <p>Status: Completed</p>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <div />;
  }

  
};

const mapStateToProps = state => ({
  favour: state.favour.favours[0],
  favourLoading: state.favour.loading
})

export default connect(mapStateToProps)(FavourItem);
