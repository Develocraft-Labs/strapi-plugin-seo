/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
// @ts-ignore
import { NotFound } from '@strapi/helper-plugin';
// Utils
import pluginId from '../../pluginId';
// Containers
import HomePage from '../HomePage/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path={`/plugins/${pluginId}`} element={HomePage} />
        <Route element={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
