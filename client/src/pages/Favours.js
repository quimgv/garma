import React, { Fragment, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

// Components
import Modal from "../components/Common/Modal";
import CreateFavourForm from '../components/CreateFavourForm';

const Dashboard = ({ history }) => {
  const [showModal, setShowModal] = useState();

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      <Modal
        title="Create Favour"
        body={<CreateFavourForm />}
        show={showModal}
        handleModal={handleModal}
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
    </Fragment>
  );
};

export default Dashboard;
