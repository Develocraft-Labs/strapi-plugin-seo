import { get, has } from "lodash";
import { request } from "strapi-helper-plugin";

import { ROUTES } from "./routes";
import { SINGLETYPE } from "./constants";
/**
 * Get projects Content Types and filter down to Single Types.
 * @returns {Array} array of single types.
 */
const getSingleTypes = async () => {
  const response = await request(ROUTES.CONTENTTYPEBUILDER);
  const data = get(response, ["data"], []);

  const contentTypes = data.filter(
    // save all content types except plugins
    (obj) => !has(obj, "plugin")
  );

  const singleTypes = contentTypes
    .map((contentType) => {
      // save only single types
      if (get(contentType, ["schema", "kind"], "") === SINGLETYPE)
        return contentType;
    })
    .filter((obj) => has(obj, "schema"));
  return singleTypes;
};

export default getSingleTypes;
