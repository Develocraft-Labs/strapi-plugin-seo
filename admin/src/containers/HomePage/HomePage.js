import React, { memo } from "react";
import { PluginHeader } from "strapi-helper-plugin";

import pluginPkg from "../../../../package.json";
import Home from "../../Home";
import pluginId from "../../pluginId";
import styled from "styled-components";

const HeaderWrap = styled.div`
  padding: 18px 30px 0px;
`;

/**
 *
 * Component that renders home page.
 *
 */
const HomePage = () => {
  return (
    <div>
      <HeaderWrap>
        <PluginHeader
          title={pluginPkg.presentationName}
          description={pluginPkg.description}
          titleId={pluginId}
        />
      </HeaderWrap>
      <Home />
    </div>
  );
};

export default memo(HomePage);
