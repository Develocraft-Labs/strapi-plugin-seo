import React from "react";
import styled from "styled-components";
import { Column } from "../../components/ui/common";

const Wrapper = styled(Column)`
  flex-direction: column;
  padding-bottom: 1.8rem;
`;

const InputWrapper = ({ children, inputWrapperStyles = {}, className }) => {
  return (
    <Wrapper style={inputWrapperStyles} className={className}>
      {children}
    </Wrapper>
  );
};

export default InputWrapper;
