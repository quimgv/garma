import React from "react";
import { Badge } from "react-bootstrap";
import { favourStatusVariant } from "../FavourHelpers";

// Redux
import { connect } from "react-redux";

const FavourStatus = ({ favourStatus }) => {
  return (
    <Badge
      pill
      variant={favourStatusVariant(favourStatus)}
      className="mt-2 mr-2 ${}"
    >
      {favourStatus}
    </Badge>
  );
};

const mapStateToProps = state => {
  return {
    favourStatus: state.favour.currentFavour.status
  };
};

export default connect(mapStateToProps)(FavourStatus);
