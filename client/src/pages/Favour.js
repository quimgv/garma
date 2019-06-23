import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// Components
import FavourItem from "../components/FavourItem/FavourItem";
import Modal from "../components/Common/Modal";

// Redux
import { connect } from "react-redux";
import {
  getCurrentFavour,
  unmountCurrentFavour
} from "../redux/actions/favour";

const FavourPage = ({ getCurrentFavour, unmountCurrentFavour, match }) => {
  useEffect(() => {
    getCurrentFavour(match.params.id);
    return () => {
      unmountCurrentFavour();
    };
  }, []);
  return (
    <Row className="justify-content-md-center">
      <Col lg={8}>
        <Modal />
        <FavourItem />
      </Col>
    </Row>
  );
};

export default withRouter(
  connect(
    null,
    { getCurrentFavour, unmountCurrentFavour }
  )(FavourPage)
);
