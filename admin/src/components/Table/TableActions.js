import React from "react";
import styled from "styled-components";
import EditTool from "../../ui/Svgs/EditTool";

export const ActionButton = styled.button`
  width: fit-content;
  margin: 0rem 0.8rem;
`;

export const TableActionsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TableActions = ({ handleEdit, index }) => {
  return (
    <TableActionsWrap>
      <ActionButton
        onClick={handleEdit}
        data-testid={`edit-seo-button-${index}`}
      >
        <EditTool />
      </ActionButton>
    </TableActionsWrap>
  );
};

export default TableActions;
