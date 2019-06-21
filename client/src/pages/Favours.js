import React, { Fragment, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

// Components
import Modal from "../components/Common/Modal";
import CreateFavourForm from "../components/CreateFavourForm";
import FavoursList from '../components/FavoursList';

const FavoursPage = ({ history }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      <Modal
        title="Create Favour"
        body={<CreateFavourForm handleModal={handleModal} />}
        show={showModal}
        handleModal={handleModal}
        footer={false}
      />
      <Row>
        <Col xs={12}>
          <div style={{ marginBottom: "20px" }}>
            <Button
              variant="primary"
              block
              size="lg"
              className="mt-2 mr-2 rounded-pill"
              onClick={handleModal}
            >
              Create favour
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <FavoursList />
        </Col>
      </Row>
    </Fragment>
  );
};

export default FavoursPage;
