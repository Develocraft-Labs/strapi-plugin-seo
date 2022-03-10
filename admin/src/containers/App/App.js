import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";

import pluginId from "../../pluginId";
import HomePage from "../HomePage/HomePage";
import DetailsPage from "../DetailsPage/DetailsPage";
import LocaleContextProvider from "../LocaleContextProvider/LocaleContextProvider";

/**
 *
 *Component that houses plugins frontend routes.
 *
 */
const App = () => {
  return (
    <LocaleContextProvider>
      <div>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route
            path={`/plugins/${pluginId}/:uid/details/:locale/:seoName/:collectionTypeId`}
            component={DetailsPage}
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </LocaleContextProvider>
  );
};

export default App;
