import React from "react";
import { InputsIndex } from "strapi-helper-plugin";
import InputJson from "./InputJSON";
import styled from "styled-components";
import { Column } from "../../components/ui/common";
import useValidatedField from "../../hooks/useValidatedField";

const JsonLdWrap = styled(Column)`
  background-color: white;
  padding-bottom: 1.8rem;
  padding-top: 1.5rem;
  width: 100%;
  .monaco-editor {
    span {
      font-family: "Droid Sans Mono", "monospace", monospace,
        "Droid Sans Fallback";
    }
    div {
      font-family: "Droid Sans Mono", "monospace", monospace,
        "Droid Sans Fallback";
    }
  }
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
        errors={errors}
        touched={touched}
        onChange={handleChange}
        name={name}
        value={value}
        customInputs={{ json: InputJson }}
      />
    </JsonLdWrap>
  );
};

export default JsonLd;
