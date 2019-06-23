import React from "react";
import { Button, Modal } from "react-bootstrap";

// Redux
import { connect } from "react-redux";
import { handleModal } from "../../redux/actions/modal";

const ModalComponent = ({ body, cancelButtonText, confirmButtonText, footer, handleConfirm, handleModal, reduxModal, show, title  }) => {
  return (
    <Modal show={show || reduxModal.show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title || reduxModal.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body || reduxModal.body}</Modal.Body>

      {footer || reduxModal.footer ? (
        <Modal.Footer>
          <Button
            variant="outline-danger"
            value={cancelButtonText || reduxModal.cancelButtonText}
            onClick={handleModal}
          >
            {cancelButtonText || reduxModal.cancelButtonText}
          </Button>
          <Button
            variant="primary"
            value={confirmButtonText || reduxModal.confirmButtonText}
            onClick={handleConfirm || reduxModal.handleConfirm}
          >
            {confirmButtonText || reduxModal.confirmButtonText}
          </Button>
        </Modal.Footer>
      ) : <div />}
    </Modal>
  );
};

const mapStateToProps = state => ({
  reduxModal: state.modal
});

export default connect(
  mapStateToProps,
  { handleModal }
)(ModalComponent);
