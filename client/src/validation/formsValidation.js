import isEmpty from "./isEmpty";
import Validator from "validator";

export const createFavourValidation = (title, description, value, urgency, difficulty) => {
  let errors = {};

  if (!Validator.isInt(value, { gt: 0 })) {
    errors.valueError = "Value has to be greater 0";
  }

  if (!Validator.isInt(value, {gt: 0})) {
    errors.valueError = "Value must be a number and greater than 0";
  }

  if (isEmpty(title)) {
    errors.titleError = "This field is required";
  }

  if (isEmpty(description)) {
    errors.descriptionError = "This field is required";
  }

  if (isEmpty(value)) {
    errors.valueError = "This field is required";
  }

  if (isEmpty(urgency)) {
    errors.urgencyError = "This field is required";
  }

  if (isEmpty(difficulty)) {
    errors.difficultyError = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

