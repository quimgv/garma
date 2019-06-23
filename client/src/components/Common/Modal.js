import React from "react";
import { Button, Modal } from "react-bootstrap";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";

const ModalComponent = ({ modal, handleModal }) => {
  return (
    <Modal show={modal.show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modal.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{modal.body}</Modal.Body>

      {modal.footer && (
        <Modal.Footer>
          <Button
            variant="outline-danger"
            value={modal.cancelButtonText}
            onClick={handleModal}
          >
            {modal.cancelButtonText}
          </Button>
          <Button
            variant="primary"
            value={modal.confirmButtonText}
            onClick={modal.handleConfirm}
          >
            {modal.confirmButtonText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { handleModal }
)(ModalComponent);
