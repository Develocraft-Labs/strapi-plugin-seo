import React from "react";
import SvgContainer from "../../ui/Svgs/Container";
import Cirlce from "../../ui/Svgs/Rect";
import styled from "styled-components";
import { Column } from "../ui/common";

const CircleSvg = styled(SvgContainer)`
  height: 2rem;
  width: 2rem;
`;

const MetaText = styled.span`
  color: black;
  overflow-wrap: break-word;
`;

const Content = styled.div`
  color: gray;
  font-size: 1.4rem;
`;

const Title = styled.h3`
  color: #7676fb;
  font-size: 1.6rem;
  overflow-wrap: break-word;
`;

const UrlSpan = styled.span`
  padding: 0rem 0rem 0rem 1rem;
  font-size: 1.3rem;
`;

const UrlPreview = styled.small`
  display: flex;
  align-items: center;
  padding: 0rem 0rem 1.3rem 0rem;
  overflow-wrap: break-word;
`;

const MobilePreview = styled(Column)`
  box-shadow: 0 0px 10px #e3e9f3;
  padding: 1rem;
  border-radius: 1rem;
  width: 290px;
  height: fit-content;
`;

/**
 * Component that renders mobile version of Google Preview.
 * @returns {JSX.Element} Mobile google preview.
 */
const Mobile = ({ ogUrl, title, metaDescription, month, day, year }) => {
  return (
    <MobilePreview data-testid="mobile-preview">
      <UrlPreview>
        <i className="fa fa-globe" aria-hidden="true" />{" "}
        <UrlSpan>{ogUrl}</UrlSpan>
      </UrlPreview>
      <Title>{title}</Title>
      <Content>
        <span>{`${month} ${day}, ${year} `}</span>
        <CircleSvg>
          <Cirlce
            x="0.6rem"
            y="0.7rem"
            rx="2rem"
            ry="2rem"
            fill="gray"
            height="0.3rem"
            width="0.3rem"
          />
        </CircleSvg>
        <MetaText>{metaDescription}</MetaText>
      </Content>
    </MobilePreview>
  );
};
export default Mobile;
