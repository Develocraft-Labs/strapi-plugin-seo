/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
// @ts-ignore
import { NotFound } from '@strapi/helper-plugin';
// Utils
import pluginId from '../../pluginId';
// Containers
import HomePage from '../HomePage/HomePage';
import LocalContextProvider from '../LocaleContextProvider/LocaleContextProvider';

const App: FC = () => (
  <LocalContextProvider>
    <Switch>
      <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
      <Route component={NotFound} />
    </Switch>
  </LocalContextProvider>
);

export default App;
