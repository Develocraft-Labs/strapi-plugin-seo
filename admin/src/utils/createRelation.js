import { request } from "strapi-helper-plugin";

import showErrorNotification from "./errorNotification";
import { ROUTES } from "./routes";

/**
 * Create relation between SEO plugin and Content Types.
 * @param {Array} collectionTypes - Projects Content types.
 * @param {string} uid - Content Type uid.
 * @returns {PromiseFulfilledResult} Object.
 */
const createRelation = async (schema, uid) => {
  try {
    const {
      attributes,
      collectionName,
      connection,
      description,
      draftAndPublish,
      kind,
      name,
      pluginOptions,
    } = schema;

    if (!("seo" in attributes)) {
      attributes.seo = {
        nature: "oneWay",
        target: "plugins::seo.seo",
        unique: false,
      };
      // Note: look into components on body(collectiontypeitem)
      // add one-way relation to CollectionTypeItem ie article 1
      const res = await request(
        strapi.backendURL + `${ROUTES.CONTENTTYPEBUILDER}/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            components: [],
            contentType: {
              collectionName: collectionName,
              name: name,
              pluginOptions: pluginOptions,
              kind: kind,
              draftAndPublish: draftAndPublish,
              description: description,
              connection: connection,
              attributes: attributes,
            },
          },
        }
      );
      return res;
    }
  } catch (error) {
    showErrorNotification(`failed to create relation - ${error}`);
  }
};

export default createRelation;
