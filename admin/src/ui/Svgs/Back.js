import React from "react";
import styled from "styled-components";

const BackSvg = styled.svg`
  font-size: 1.8rem;
  font-weight: bolder;
  fill: rgb(120, 126, 143);
`;

const BackArrow = () => (
  <BackSvg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
  >
    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
  </BackSvg>
);

export default BackArrow;
