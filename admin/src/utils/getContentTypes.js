import { get, has, partition } from "lodash";
import { request } from "strapi-helper-plugin";
import { SINGLETYPE } from "./constants";
import { ROUTES } from "./routes";
/**
 * Get projects Content Types and filter down to Single Types.
 * @returns {Array} array of single types.
 */
const getContentTypes = async () => {
  const response = await request(ROUTES.CONTENTTYPEBUILDER);
  const data = get(response, ["data"], []);

  const contentTypes = data.filter(
    // save all content types except plugins
    (obj) => !has(obj, "plugin")
  );

  const [singleTypes, collectionTypes] = partition(
    contentTypes,
    (item) => item.schema.kind === SINGLETYPE
  );

  return {
    singleTypes,
    collectionTypes,
    contentTypes,
  };
};

export default getContentTypes;
