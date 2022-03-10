import React from "react";
import { InputErrors, InputsIndex } from "strapi-helper-plugin";
import styled from "styled-components";
import { Column } from "../../components/ui/common";
import useValidatedField from "../../hooks/useValidatedField";
import InputJSON from "./InputJSON";

const JsonLdWrap = styled(Column)`
  background-color: white;
  padding-bottom: 1.8rem;
  padding-top: 1.5rem;
  width: 100%;
`;

const JsonLd = ({ title, value, onChange, name }) => {
  const { handleChange, touched, errors } = useValidatedField({
    onChange,
    name,
  });

  return (
    <JsonLdWrap>
      <h4>{title}</h4>
      <InputsIndex
        type="json"
        error={errors.length > 0}
        touched={touched}
        onChange={handleChange}
        name={name}
        value={value}
        customInputs={{ json: InputJSON }}
      />
      <InputErrors errors={errors} name={name} />
    </JsonLdWrap>
  );
};

export default JsonLd;
