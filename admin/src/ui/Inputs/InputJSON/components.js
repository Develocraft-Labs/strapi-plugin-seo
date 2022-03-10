import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
  line-height: 18px;
  border: 1px solid ${(p) => (!p.hasError ? "#e3e9f3" : "#dc3545")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "initial")};
  border-radius: 4px;

  .CodeMirror {
    font-size: 13px !important;
  }

  > div {
    border-radius: 3px;

    > div:last-of-type {
      min-height: 315px;
      max-height: 635px;
      font-weight: 500;
      font-size: 1.3rem !important;
    }
  }

  .colored {
    background-color: yellow;
    color: black !important;
  }
`;

export default Wrapper;
