import React, { Fragment, useEffect } from "react";

// Components
import FavoursListItem from "./FavoursListItem";
import Loader from "../components/Common/Loader";

// Redux
import { connect } from "react-redux";
import { getFavours } from "../redux/actions/favour";

const FavoursList = ({ getFavours, favours, favoursLoading }) => {
  useEffect(() => {
    getFavours();
  }, []);

  if (favoursLoading) {
    return <Loader position />;
  } else if (favours !== null && favours.length !== 0) {
    return (
      <Fragment>
        {favours.map(favour => (
          <FavoursListItem key={favour._id} {...favour} />
        ))}
      </Fragment>
    );
  } else {
    return "There are not favours...";
  }
};

const mapStateToProps = state => ({
  favours: state.favour.favours,
  favoursLoading: state.favour.loading
});

export default connect(
  mapStateToProps,
  { getFavours }
)(FavoursList);
