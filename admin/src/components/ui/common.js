import styled, { css } from "styled-components";

export const ellipsisCss = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${(p) =>
    p.fullWidth &&
    css`
      width: 100%;
    `}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const shadowCss = css`
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 4px #e3e9f3;
`;

export const FlexWrapRow = styled(Row)`
  padding-top: ${(p) => p.distance ?? 2}rem;
  margin-left: -${(p) => p.distance ?? 2}rem;
  margin-top: -${(p) => p.distance ?? 2}rem;
  flex-wrap: wrap;
  background-color: transparent;
  > * {
    margin-left: ${(p) => p.distance ?? 2}rem;
    margin-top: ${(p) => p.distance ?? 2}rem;
    flex: ${(p) => p.flex ?? 1};
    min-width: 300px;
  }
  @media (max-width: 768px) {
    margin-left: 0;
    > * {
      margin-left: 0;
      min-width: 100%;
      max-width: 100%;
    }
  }
`;

export const EvenColumn = styled(Column)`
  justify-content: space-evenly;
`;

export const BoxColumn = styled(Column)`
  padding: ${(p) => p.padding ?? "2rem"};
  ${shadowCss}
`;

export const Ellipsis = styled.p`
  ${ellipsisCss};
  margin: 0;
`;
