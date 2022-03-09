import React, { useCallback, useContext, useReducer } from "react";
import { validateInput } from "strapi-helper-plugin";

const ValidatedFormContext = React.createContext(null);

const touchAll = (fields) => {
  const touched = {};

  Object.keys(fields).forEach((name) => {
    touched[name] = true;
  });

  return touched;
};

const validationsReducer = (state = {}, action) => {
  if (action.type === "VALIDATE_FORM") {
    return {
      errors: {
        ...state.errors,
        ...action.payload,
      },
      touched: touchAll(state.touched),
    };
  }
  if (action.type === "VALIDATE_FIELD") {
    return {
      errors: {
        ...state.errors,
        [action.payload.name]: action.payload.errors,
      },
      touched: {
        ...state.touched,
        [action.payload.name]: true,
      },
    };
  }
};

const getErrors = (fields, values) => {
  const formErrors = {};

  Object.keys(fields).forEach((name) => {
    const fieldValidations = fields[name];
    const errors = validateInput(values[name], fieldValidations, name);
    formErrors[name] = errors;
  });

  return formErrors;
};

const getTouched = (fields) => {
  const touched = {};

  Object.keys(fields).forEach((name) => {
    touched[name] = false;
  });

  return touched;
};

const getInitial = ({ fields, values }) => ({
  errors: getErrors(fields, values),
  touched: getTouched(fields),
});

/**
 * Keeps track of form errors and touched fields.
 */
const useFormValidations = ({ fields, values }) => {
  const [state, dispatch] = useReducer(
    validationsReducer,
    { fields, values },
    getInitial
  );

  const validateForm = useCallback(
    (values) => {
      const payload = getErrors(fields, values);

      dispatch({ type: "VALIDATE_FORM", payload });

      return Object.values(payload).every((err) => err.length === 0);
    },
    [fields]
  );

  const validateField = useCallback(
    (name, value) => {
      const fieldValidations = fields[name];

      const payload = {
        name,
        errors: validateInput(value, fieldValidations, name),
      };

      dispatch({ type: "VALIDATE_FIELD", payload });
    },
    [fields]
  );

  return {
    validateField,
    validateForm,
    ...state,
  };
};

export const useValidatedFormContext = () => useContext(ValidatedFormContext);

export const ValidatedForm = ({ children, context }) => (
  <ValidatedFormContext.Provider value={context}>
    {children}
  </ValidatedFormContext.Provider>
);

export default useFormValidations;
