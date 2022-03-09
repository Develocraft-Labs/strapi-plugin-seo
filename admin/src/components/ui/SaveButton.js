import styled from "styled-components";

const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0px 15px;
  font-weight: 600;
  font-size: 1.3rem;
  border-radius: 2px;
  cursor: pointer;
  outline: 0px;

  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  margin-left: 1rem;
  margin-right: 0px;
  min-width: 150px;
  align-self: center;
  color: rgb(255, 255, 255);
  background-color: rgb(109, 187, 26);
  border: 1px solid rgb(109, 187, 26);
  &:disabled {
    color: rgb(180, 182, 186);
    background-color: rgb(233, 234, 235);
    border: 1px solid rgb(233, 234, 235);
  }
`;

export default SaveButton;
