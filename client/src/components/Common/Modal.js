import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComponent = ({
  title,
  body,
  show,
  handleModal,
  handleConfirm,
  handleCancel,
  confirmButtonText = 'Confirm',
  cancelButtonText  = 'Cancel',
  footer = true
}) => {
  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      {footer && (
        <Modal.Footer>
            <Button
              variant="outline-danger"
              value={cancelButtonText}
              onClick={e => handleCancel(e)}
            >
              {cancelButtonText}
            </Button>
            <Button
              variant="primary"
              value={confirmButtonText}
              onClick={e => handleConfirm(e)}
            >
              {confirmButtonText}
            </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalComponent;
