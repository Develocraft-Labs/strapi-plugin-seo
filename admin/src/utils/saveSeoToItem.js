import { request } from "strapi-helper-plugin";

import { ROUTES } from "./routes";
import showErrorNotification from "./errorNotification";

/**
 * Save selected seo to collection type item
 * @param {object} seo selected seo data
 * @param {string} uid collection type item uid
 * @param {string} id collection type item id
 * @returns {object} collection type item
 */
const saveSeoToItem = async ({ seo, uid, id }) => {
  try {
    const res = await request(
      strapi.backendURL + `${ROUTES.CONTENTMANGER}/${uid}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { seo: seo },
      }
    );

    return res;
  } catch (error) {
    showErrorNotification(`failed to save selected seo - ${error}`);
  }
};

export default saveSeoToItem;
