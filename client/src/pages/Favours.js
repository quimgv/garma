import React, { Fragment, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

// Components
import Modal from "../components/Common/Modal";
import CreateUpdateFavourForm from "../components/CreateUpdateFavourForm";
import FavoursList from "../components/FavoursList";

// Redux
import { connect } from 'react-redux';
import { handleModal } from '../redux/actions/modal';

const FavoursPage = ({ handleModal }) => {

  const modalContent = {
    title: "Create Favour",
    body: <CreateUpdateFavourForm action='create'/>,
    footer: false
  }

  return (
    <Fragment>
      <Modal />
      <Row>
        <Col xs={12}>
          <div style={{ marginBottom: "20px" }}>
            <Button
              variant="primary"
              block
              size="lg"
              className="mt-2 mr-2 rounded-pill"
              onClick={() => handleModal(modalContent)}
            >
              Create favour
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card mb-4">
            <div className="card-body favour-page">
              <FavoursList />
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default connect(null, { handleModal })(FavoursPage);
