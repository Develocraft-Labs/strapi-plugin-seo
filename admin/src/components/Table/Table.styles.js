import styled, { css } from "styled-components";

export const Thead = styled.thead`
  background: #f3f3f3;
  height: 43px;
  overflow: hidden;
`;

export const TableComponent = styled.table`
  border-radius: 3px;
  border-collapse: initial;
  box-shadow: rgb(227 233 243) 0px 2px 4px;
  color: #212529;
  table-layout: fixed;
  margin-bottom: 0px;
  width: 100%;
`;

export const cellCss = css`
  border: none;
  padding: 0;
  whitespace: nowrap;
`;

export const Cell = styled.tr`
  ${cellCss};
`;

export const ItemRow = styled(Cell)`
  height: 54px;
  background: rgb(255, 255, 255);
  border: none;
  padding: 0rem;
  white-space: nowrap;
`;

export const HeadingCell = styled.th`
  ${cellCss};
  height: 43px;
  font-size: 1.3rem;
  border: none;
  text-transform: capitalize;
  vertical-align: middle;
  padding: 0rem 1.5625rem;
`;
