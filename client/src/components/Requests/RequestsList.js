import React from "react";

// Components
import RequestsListItem from '../../components/Requests/RequestsListItem';

// Redux
import { connect } from "react-redux";

const RequestsList = ({ requests }) => {

  return (
    <div>
      {requests.map(request => {
        return (
          <RequestsListItem key={request._id} {...request} />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  requests: state.requests.requests
});

export default connect(mapStateToProps)(RequestsList);
