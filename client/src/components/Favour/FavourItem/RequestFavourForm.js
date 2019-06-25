import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import isEmpty from "../../../validation/isEmpty";

// Redux
import { connect } from "react-redux";
import { requestFavour } from "../../../redux/actions/requests";
import { handleModal } from '../../../redux/actions/modal';

const RequestFavourForm = ({ favour, handleModal, requestFavour, user }) => {
  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState();

  const handleRequest = () => {
    if (isEmpty(message)) {
      return setMessageError("This field is required!");
    }
    requestFavour(favour._id, user._id, favour.owner.user._id, message);
    handleModal();
  };
  return (
    <Form>
      <FormGroup>
        <Form.Label>Why do you want to do this favour?</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={e => {
            setMessage(e.target.value);
          }}
          isInvalid={!!messageError && true}
        />
        <FormControl.Feedback type="invalid">
          <div>{messageError}</div>
        </FormControl.Feedback>
      </FormGroup>
      <FormGroup>
        <Button onClick={handleRequest}>Request</Button>
      </FormGroup>
    </Form>
  );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    favour: state.favour.currentFavour
  });

export default connect(
  mapStateToProps,
  { requestFavour, handleModal }
)(RequestFavourForm);
