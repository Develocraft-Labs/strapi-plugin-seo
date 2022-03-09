import React from "react";
import styled from "styled-components";

const TrashCanSvg = styled.svg`
  height: 1.8rem;
  width: 1.5rem;
  margin-right: 1rem;
  fill: rgb(246, 77, 10);
`;

const TrashCan = () => (
  <TrashCanSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1.1rem"
    height="1.1rem"
  >
    <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
  </TrashCanSvg>
);

export default TrashCan;
