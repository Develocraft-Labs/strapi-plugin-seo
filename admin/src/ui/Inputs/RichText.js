import React from "react";

import InputWrapper from "./InputWrapper";

import { InputErrors, InputTextArea } from "strapi-helper-plugin";
import useValidatedField from "../../hooks/useValidatedField";

const RichText = ({ title, value, onChange, name }) => {
  const { handleChange, errors } = useValidatedField({ onChange, name });
  return (
    <InputWrapper>
      <h4>{title}</h4>
      <InputTextArea
        name={name}
        error={errors.length > 0}
        value={value}
        onChange={handleChange}
      />
      <InputErrors errors={errors} name={name} />
    </InputWrapper>
  );
};

export default RichText;
