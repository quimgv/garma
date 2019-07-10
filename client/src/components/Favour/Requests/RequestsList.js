import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";

// Components
import RequestsListItem from "./RequestsListItem";
import Loader from "../../Common/Loader";

// Redux
import { connect } from "react-redux";
import { getRequests, unmountRequests } from "../../../redux/actions/requests";

const RequestsList = ({
  getRequests,
  isLoading,
  match,
  requests,
  requestFilter,
  unmountRequests,
  user
}) => {
  const favourURLId = match.params.id ? match.params.id : null;
  const requestFilterReq = requestFilter ? requestFilter : null;

  useEffect(() => {
    getRequests(favourURLId, user && user._id, requestFilterReq);
    return () => {
      unmountRequests();
    };
  }, [requestFilter]);

  if (isLoading) {
    return <Loader position />;
  } else if (requests.length > 0) {
    return (
      <Fragment>
        {requests.map(request => {
          return <RequestsListItem key={request._id} {...request} />;
        })}
      </Fragment>
    );
  } else {
    return <div>There are not requests...</div>;
  }
};

const mapStateToProps = state => ({
  requests: state.requests.requests,
  isLoading: state.requests.loading,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRequests, unmountRequests }
  )(RequestsList)
);
