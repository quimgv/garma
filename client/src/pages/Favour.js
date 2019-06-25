import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// Components
import FavourItem from "../components/Favour/FavourItem/FavourItem";
import RequestsList from "../components/Favour/Requests/RequestsList";
import Loader from "../components/Common/Loader";

// Redux
import { connect } from "react-redux";
import {
  getCurrentFavour,
  unmountCurrentFavour
} from "../redux/actions/favour";
import {
  getFavourRequests,
  unmountRequests,
  isRequested,
  setMyRequest
} from "../redux/actions/requests";
import { isOwner } from "../components/Favour/FavourHelpers";

const FavourPage = ({
  favour,
  getCurrentFavour,
  getFavourRequests,
  isRequested,
  setMyRequest,
  unmountCurrentFavour,
  unmountRequests,
  match,
  requests,
  user
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCurrentFavour(match.params.id);
    getFavourRequests(match.params.id);
    return () => {
      unmountCurrentFavour();
      unmountRequests();
    };
  }, []);

  useEffect(() => {
    if (user && requests && favour) {
      const request = requests.filter(request => {
        return user._id === request.helper._id;
      });

      if (request.length === 0) {
        isRequested(false);
      } else {
        isRequested(true);
        setMyRequest(request[0]);
      }
      setLoading(false);
    }
  }, [user, favour, requests]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <FavourItem />
          {requests.length > 0 && isOwner(favour.owner.user._id, user._id) && (
            <div className="card mb-4">
              <div className="card-body">
                <div className="card-header">
                  <h5 className="card-title">Requests</h5>
                </div>
                <RequestsList />
              </div>
            </div>
          )}
        </Col>
      </Row>
    );
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  favour: state.favour.currentFavour,
  requests: state.requests.requests
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getCurrentFavour,
      getFavourRequests,
      isRequested,
      setMyRequest,
      unmountCurrentFavour,
      unmountRequests
    }
  )(FavourPage)
);
