import React from "react";
import styled from "styled-components";
import { Column } from "../ui/common";

const Header = styled.h3`
  color: #2c2cfa;
  font-size: 2rem;
`;

const PreviewSpan = styled.span`
  font-size: inherit;
`;

const Wrapper = styled.div`
  color: gray;
  font-size: 1.4rem;
  width: 500px;
`;

const DesktopPreview = styled(Column)`
  padding: 1rem;
  height: fit-content;
`;

const SmallText = styled.small`
  display: flex;
  font-weight: 500;
  align-items: center;
  padding: 0rem 0rem 0.5rem 0rem;
  color: #047f04;
  font-size: 1.5rem;
`;

const TextIcon = styled.i`
  font-size: 0.8rem;
  padding: 0rem 0rem 0rem 0.6rem;
`;

/**
 * Component that renders desktop version of Google Preview.
 * @returns {JSX.Element} Desktop google preview.
 */
const Desktop = ({ ogUrl, title, metaDescription, month, day, year }) => {
  return (
    <DesktopPreview fullWidth data-testid="desktop-preview">
      <Header>{title}</Header>
      <SmallText>
        {ogUrl} <TextIcon>▼</TextIcon>
      </SmallText>
      <Wrapper>
        <PreviewSpan>{`${month} ${day}, ${year} -`}</PreviewSpan>{" "}
        <PreviewSpan>{metaDescription}</PreviewSpan>
      </Wrapper>
    </DesktopPreview>
  );
};

export default Desktop;
