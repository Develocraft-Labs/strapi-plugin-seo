import React, { memo, FC } from 'react';
// @ts-ignore
import { BaseHeaderLayout, Box, Flex } from '@strapi/design-system';

import pluginCfg from '../../../pluginPkg-config';
// import pluginId from '../../pluginId';
import Home from '../../Home';

/*
 *
 * HomePage
 *
 */
const HomePage: FC = () => (
  <Box>
    <Flex direction="column">
      <BaseHeaderLayout
        title={`${pluginCfg.presentationName}`}
        subtitle={`${pluginCfg.description}`}
      />
      <Home />
    </Flex>
  </Box>
);

export default memo(HomePage);
