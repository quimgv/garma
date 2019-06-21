import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// Components
import FavourItem from "../components/FavourItem/FavourItem";

// Redux
import { connect } from "react-redux";
import {
  getCurrentFavour,
  unmountCurrentFavour
} from "../redux/actions/favour";

const FavourPage = ({ getCurrentFavour, unmountCurrentFavour, match }) => {
  useEffect(() => {
    console.log("Favour Item mounted");
    getCurrentFavour(match.params.id);

    return () => {
      console.log("Favour Item unmounted");
      unmountCurrentFavour();
    };
  }, []);
  return (
    <Row className="justify-content-md-center">
      <Col lg={8}>
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
