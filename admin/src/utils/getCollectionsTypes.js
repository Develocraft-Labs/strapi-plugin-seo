import { get, has } from "lodash";
import { request } from "strapi-helper-plugin";

import { ROUTES } from "./routes";

/**
 * Get projects content types and filter down to collection types
 * @returns {Array} array of collection types
 */
const getCollectionTypes = async () => {
  const response = await request(ROUTES.CONTENTTYPEBUILDER);
  const data = get(response, ["data"], []);

  const contentTypes = data.filter(
    // save all content types except plugins
    (obj) => !has(obj, "plugin")
  );

  const collectionTypes = contentTypes
    .map((contentType) => {
      // save only collection types
      if (get(contentType, ["schema", "kind"], "") === "collectionType")
        return contentType;
    })
    .filter((obj) => has(obj, "schema"));
  return collectionTypes;
};

export default getCollectionTypes;
