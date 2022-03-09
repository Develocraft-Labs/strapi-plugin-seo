import React from "react";
import styled from "styled-components";

const CheckMarkSvg = styled.svg`
  fill: rgb(109, 187, 26);
`;

const CheckMark = () => (
  <CheckMarkSvg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
  </CheckMarkSvg>
);

export default CheckMark;
