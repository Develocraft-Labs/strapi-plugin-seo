import React from "react";
import styled from "styled-components";

const Plus = styled.svg`
  height: 1.3rem;
  width: fit-content;
  padding: 0rem 0.7rem;
  fill: rgba(0, 0, 0, 1);
`;

const PlusSymbol = () => (
  <Plus
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
  >
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
  </Plus>
);

export default PlusSymbol;
