import React from "react";
import { InputErrors, InputText } from "strapi-helper-plugin";
import useValidatedField from "../../hooks/useValidatedField";

import InputWrapper from "./InputWrapper";

const TextField = ({
  title,
  value,
  onChange,
  name,
  placeHolder = "",
  inputWrapperStyles = {},
}) => {
  const { handleChange, errors } = useValidatedField({ onChange, name });

  return (
    <InputWrapper inputWrapperStyles={inputWrapperStyles}>
      {title ? title && <h4>{title}</h4> : null}
      <InputText
        error={errors.length > 0}
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeHolder}
      />
      <InputErrors errors={errors} name={name} />
    </InputWrapper>
  );
};

export default TextField;
