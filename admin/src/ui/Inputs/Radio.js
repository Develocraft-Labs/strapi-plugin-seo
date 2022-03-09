import React from "react";
import styled from "styled-components";

const RadioInput = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const Label = styled.label`
  margin: 0;
  padding: 0rem 0.5rem;
`;

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.paddingLeft ?? "0rem"};
`;

const Radio = ({
  label,
  onChange,
  onClick,
  name,
  id,
  checked,
  paddingLeft,
}) => {
  return (
    <RadioWrap paddingLeft={paddingLeft}>
      <RadioInput
        checked={checked}
        name={name}
        type="radio"
        onChange={onChange}
        onClick={onClick}
        value={label}
        id={id}
        readOnly={true}
      />
      <Label htmlFor={label}>{label}</Label>
    </RadioWrap>
  );
};

export default Radio;
