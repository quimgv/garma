import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  title,
  body,
  show,
  handleModal,
  handleConfirm,
  handleCancel,
  confirmButtonText,
  cancelButtonText,
  footer
}) => {
  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      {footer && (
        <Modal.Footer>
          {cancelButtonText && (
            <Button
              variant="outline-danger"
              value={cancelButtonText || "Cancel"}
              onClick={e => handleCancel(e)}
            >
              {cancelButtonText || "Cancel"}
            </Button>
          )}
          {confirmButtonText && (
            <Button
              variant="primary"
              value={confirmButtonText || "Confirm"}
              onClick={e => handleConfirm(e)}
            >
              {confirmButtonText || "Confirm"}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ConfirmModal;
