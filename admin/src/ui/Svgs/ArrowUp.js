import React from "react";
import styled from "styled-components";

const ArrowUpSvg = styled.svg`
  fill: rgb(195, 197, 200);
`;

const ArrowUp = () => {
  return (
    <ArrowUpSvg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
    </ArrowUpSvg>
  );
};

export default ArrowUp;
