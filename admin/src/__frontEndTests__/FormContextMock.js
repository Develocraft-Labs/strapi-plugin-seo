import React from "react";
import useFormValidations, { ValidatedForm } from "../hooks/useFormValidations";

const FormContextMock = ({ children }) => {
  const ctx = useFormValidations({ fields: {}, values: {} });

  return <ValidatedForm context={ctx}>{children}</ValidatedForm>;
};

export default FormContextMock;
