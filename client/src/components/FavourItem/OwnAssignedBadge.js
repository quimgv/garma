import React from "react";
import { Badge } from "react-bootstrap";
import './OwnAssignedBadge.css';

// Redux
import { connect } from "react-redux";

const OwnAssigned = ({ favour, user }) => {
    // console.log(favour.owner.user._id, user._id)
  if (user && favour) {
    if (favour.owner.user._id === user._id) {
      return (
        <Badge pill variant="primary" className="mt-2 mr-2 ownBadge">
          Own
        </Badge>
      );
    } else if (favour.helper.user && favour.helper.user._id === user._id) {
      return (
        <Badge pill variant="primary" className="mt-2 mr-2 ownBadge">
          Assigned
        </Badge>
      );
    } else {
      return <div />;
    }
  } else {
    return <div />;
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  favour: state.favour.favours[0]
});

export default connect(mapStateToProps)(OwnAssigned);
