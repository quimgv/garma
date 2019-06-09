import React from "react";
import { Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateFavourSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .max(500, "Too Long!")
    .required("Required"),
  value: Yup.number()
    .typeError("This field must be a number")
    .positive("Number must be positive")
    .required("Required")
});

const CreateFavourForm = ({ handleModal, ...props }) => {

  const handleCreateFavour = values => {
    console.log(values);
    handleModal();
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", value: "" }}
        validationSchema={CreateFavourSchema}
        onSubmit={handleCreateFavour}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group>
              <Form.Label>Favour Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add title"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.title}
                name="title"
                isValid={!!props.values.title && !props.errors.title}
                isInvalid={!!props.errors.title}
              />
              <FormControl.Feedback type="invalid">
                <div>{props.errors.title}</div>
              </FormControl.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Favour Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Add description"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name="description"
                isValid={
                  !!props.values.description && !props.errors.description
                }
                isInvalid={!!props.errors.description}
              />
              <FormControl.Feedback type="invalid">
                <div>{props.errors.description}</div>
              </FormControl.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Value</Form.Label>
              {console.log(props)}
              <Form.Control
                type="text"
                placeholder="10"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.value}
                name="value"
                isValid={!!props.values.value && !props.errors.value}
                isInvalid={!!props.errors.value}
              />
              <FormControl.Feedback type="invalid">
                <div>{props.errors.value}</div>
              </FormControl.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Create favour
              </Button>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default CreateFavourForm;
