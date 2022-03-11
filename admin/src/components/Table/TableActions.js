import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditTool from "../../ui/Svgs/EditTool";

export const ActionButton = styled(Link)`
  width: fit-content;
  margin: 0rem 0.8rem;
`;

export const TableActionsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TableActions = ({ editPath, index }) => {
  return (
    <TableActionsWrap>
      <ActionButton to={editPath} data-testid={`edit-seo-button-${index}`}>
        <EditTool />
      </ActionButton>
    </TableActionsWrap>
  );
};

export default TableActions;
