import React, { useState } from "react";

import Desktop from "../Desktop/Desktop";
import Mobile from "../Mobile/Mobile";
import Radio from "../../ui/Inputs/Radio";
import shortenPreviewUrl from "../../utils/googlePreviewUrl";
import styled from "styled-components";
import { Row } from "../ui/common";

const DesktopWrap = styled.div`
  width: 290px;
  overflow-x: scroll;
`;

const PreviewContainer = styled.div`
  height: fit-content;
`;

const ModeList = styled(Row)`
  align-items: center;
  padding: 1rem 0rem 2rem 0rem;
`;

const PreviewMode = styled.h6`
  font-size: 1.5rem;
  padding: 2rem 0rem 0rem 0rem;
`;

const PreviewTitle = styled.h4`
  font-weight: 400;
`;

/**
 * Component that renders Google Preview.
 * @returns {JSX.Element} Either Mobile or Desktop versions.
 */
const GooglePreview = ({ title, metaDescription, ogUrl }) => {
  const [mobileValue, setMobileValue] = useState(true);
  const [desktopValue, setDesktopValue] = useState(false);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const handleChange = (e) => {
    if (e.target.name === "mobile") {
      setMobileValue(true);
      setDesktopValue(false);
    } else {
      setMobileValue(false);
      setDesktopValue(true);
    }
  };

  return (
    <div>
      <PreviewTitle>Google Preview</PreviewTitle>
      <hr />
      <PreviewMode>Preview as:</PreviewMode>
      <ModeList onChange={handleChange}>
        <Radio
          name="mobile"
          label={"Mobile result"}
          id="mobile"
          checked={mobileValue}
        />
        <Radio
          name="desktop"
          label={"Desktop result"}
          id="desktop"
          checked={desktopValue}
          paddingLeft="1rem"
        />
      </ModeList>
      <PreviewContainer>
        {mobileValue ? (
          <Mobile
            title={title}
            metaDescription={metaDescription}
            ogUrl={shortenPreviewUrl(ogUrl, "mobile")}
            month={month}
            day={day}
            year={year}
          />
        ) : null}
        {desktopValue ? (
          <DesktopWrap>
            <Desktop
              title={title}
              metaDescription={metaDescription}
              ogUrl={shortenPreviewUrl(ogUrl, "desktop")}
              month={month}
              day={day}
              year={year}
            />
          </DesktopWrap>
        ) : null}
      </PreviewContainer>
    </div>
  );
};

export default GooglePreview;
