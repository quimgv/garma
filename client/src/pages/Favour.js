import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// Components
import FavourItem from "../components/FavourItem/FavourItem";

// Redux
import { connect } from "react-redux";
import {
  getCurrentFavour,
  unmountCurrentFavour
} from "../redux/actions/favour";
import {
  getFavourRequests,
  unmountRequests,
  isRequested, setMyRequest
} from "../redux/actions/requests";

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
    }
  }, [user, favour, requests]);
  return (
    <Row className="justify-content-md-center">
      <Col lg={8}>
        <FavourItem />
      </Col>
    </Row>
  );
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
