import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, FormControl } from "react-bootstrap";
import _ from "lodash";

// Redux
import { connect } from "react-redux";
import { createFavour, editFavour } from "../../redux/actions/favour";
import { handleModal } from "../../redux/actions/modal";

// Validation
import { createFavourValidation } from "../../validation/formsValidation";

const CreateFavourForm = ({
  action,
  createFavour,
  editFavour,
  favour,
  handleModal
}) => {
  const initialState = {
    title: "",
    description: "",
    value: "",
    urgency: "",
    difficulty: "",
    categories: [],
    titleError: "",
    descriptionError: "",
    valueError: "",
    urgencyError: "",
    difficultyError: "",
    categoriesError: "",
    categoriesControl: [
      {
        name: "Physical",
        isChecked: false
      },
      {
        name: "Financial",
        isChecked: false
      },
      {
        name: "Advice",
        isChecked: false
      },
      {
        name: "Transport",
        isChecked: false
      },
      {
        name: "Small favour",
        isChecked: false
      },
      {
        name: "Social media",
        isChecked: false
      },
      {
        name: "Other",
        isChecked: false
      }
    ]
  };

  const [formData, setFormData] = useState(initialState);

  const {
    title,
    description,
    value,
    urgency,
    difficulty,
    categories,
    titleError,
    descriptionError,
    valueError,
    urgencyError,
    difficultyError,
    categoriesControl
  } = formData;

  useEffect(() => {
    let categoriesToFill = [];
    if (favour && favour.categories.length > 0) {
      favour.categories.forEach(category => {
        categoriesToFill.push({
          name: category,
          isChecked: true
        });
      });
    }

    if (favour) {
      setFormData({
        ...formData,
        title: favour.title,
        description: favour.description,
        value: favour.value,
        urgency: favour.urgency,
        difficulty: favour.difficulty,
        categories: favour.categories,
        categoriesControl: [..._.merge(categoriesControl, categoriesToFill)]
      });
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const action = e.target.attributes.getNamedItem("action").value;

    let valueFormat = value.toString();

    // Form Validation
    const { errors, isValid } = createFavourValidation(
      title,
      description,
      valueFormat,
      urgency,
      difficulty
    );

    const resetErrors = {
      titleError: "",
      descriptionError: "",
      valueError: "",
      urgencyError: "",
      difficultyError: ""
    };

    if (!isValid) {
      return setFormData({ ...formData, ...resetErrors, ...errors });
    }

    if (action === "create") {
      createFavour({
        title,
        description,
        value,
        urgency,
        difficulty,
        categories
      });
    } else if (action === "edit") {
      let updates = {
        title,
        description,
        value: valueFormat,
        urgency,
        difficulty,
        categories
      };
      editFavour(favour && favour._id, updates);
    }

    setFormData(initialState);
    handleModal();
  };

  const handleOnChange = e => {
    if (e.target.type === "checkbox") {
      // Check control categories
      categoriesControl.forEach((category, idx) => {
        if (e.target.name === category.name) {
          categoriesControl[idx].isChecked = !category.isChecked;
        }
      });

      // Edit categories field
      if (categories.includes(e.target.name)) {
        const indexCat = categories.indexOf(e.target.name);
        categories.splice(indexCat, 1);
      } else {
        categories.push(e.target.name);
      }
      setFormData({ ...formData, categories, categoriesControl });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Favour Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add title"
            onChange={handleOnChange}
            value={title}
            name="title"
            isValid={!!titleError}
            isInvalid={titleError}
          />
          <FormControl.Feedback type="invalid">
            <div>{titleError}</div>
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Favour Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Add description"
            onChange={handleOnChange}
            value={description}
            name="description"
            isValid={!!descriptionError}
            isInvalid={descriptionError}
          />
          <FormControl.Feedback type="invalid">
            <div>{descriptionError}</div>
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="text"
            placeholder="10"
            onChange={handleOnChange}
            value={value}
            name="value"
            isValid={!!valueError}
            isInvalid={valueError}
          />
          <FormControl.Feedback type="invalid">
            <div>{valueError}</div>
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Urgency</Form.Label>
          <Form.Control
            as="select"
            name="urgency"
            onChange={handleOnChange}
            isValid={!!urgencyError}
            isInvalid={urgencyError}
            value={urgency}
          >
            <option>Choose...</option>
            <option>Urgent</option>
            <option>Within week</option>
            <option>Within month</option>
            <option>Anytime</option>
          </Form.Control>
          <FormControl.Feedback type="invalid">
            <div>{urgencyError}</div>
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            as="select"
            name="difficulty"
            onChange={handleOnChange}
            isValid={!!difficultyError}
            isInvalid={difficultyError}
            value={difficulty}
          >
            <option>Choose...</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Anytime</option>
          </Form.Control>
          <FormControl.Feedback type="invalid">
            <div>{difficultyError}</div>
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Categories</Form.Label>
          <Row>
            <Col>
              {categoriesControl.map((category, idx) => (
                <Form.Check
                  key={idx}
                  inline
                  type="checkbox"
                  name={category.name}
                  label={category.name}
                  checked={category.isChecked}
                  onChange={handleOnChange}
                />
              ))}
            </Col>
          </Row>

          <FormControl.Feedback type="invalid">
            <div>{valueError}</div>
          </FormControl.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            onClick={e => handleSubmit(e)}
            action={action}
          >
            {action === "create" ? "Create favour" : "Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  favour: state.favour.currentFavour
});

export default connect(
  mapStateToProps,
  { createFavour, editFavour, handleModal }
)(CreateFavourForm);
