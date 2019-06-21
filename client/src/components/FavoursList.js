import React, { useEffect } from "react";

// Components
import FavoursListItem from './FavoursListItem';

// Redux
import { connect } from "react-redux";
import { getFavours } from "../redux/actions/favour";

const FavoursList = ({ getFavours, favours }) => {
  useEffect(() => {
    getFavours();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body favour-page">
        {favours.map(favour => <FavoursListItem key={favour._id} {...favour} />)}
        {console.log(favours)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  favours: state.favour.favours
});

export default connect(
  mapStateToProps,
  { getFavours }
)(FavoursList);
