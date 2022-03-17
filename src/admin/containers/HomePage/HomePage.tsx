import React, { memo, FC } from 'react';
// @ts-ignore
// import { PluginHeader } from '@strapi/helper-plugin';

// import pluginCfg from '../../../pluginPkg-config';
// import pluginId from '../../pluginId';
import Home from '../../Home';

/*
 *
 * HomePage
 *
 */
const HomePage: FC = () => (
  <div>
    <Home />
  </div>
);

export default memo(HomePage);

/*
continue from here check strapi design system.
 <PluginHeader
      title={pluginCfg.presentationName}
      description={pluginCfg.description}
      titleId={pluginId}
    />
*/
