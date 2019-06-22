import React from "react";
import { Badge } from "react-bootstrap";
import { favourStatusVariant } from "../../utils/helperFunctions";

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
    favourStatus: state.favour.favours[0].status
  };
};

export default connect(mapStateToProps)(FavourStatus);
