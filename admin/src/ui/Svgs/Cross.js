import React from "react";
import styled from "styled-components";

const CrossSvg = styled.svg`
  fill: rgb(220 86 86);
`;

const Cross = () => (
  <CrossSvg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
  </CrossSvg>
);

export default Cross;
