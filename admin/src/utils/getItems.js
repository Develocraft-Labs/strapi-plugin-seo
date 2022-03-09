import isValidLength from "./isValidLength";
import { ROUTES } from "./routes";

/**
 * Create custom Content Types array of objects from project Content Types.
 * @param {Array} contentArr - Project Content Types.
 * @param {Promise} request - Request method for strapi-helper-plugin package.
 * @returns {Array} array of content type items.
 */
const getItems = async (contentArr, request) => {
  const list = [];
  const length = contentArr.length;

  if (length > 0) {
    try {
      // get the content type items
      for (let i = 0; i < length; i++) {
        const uid = contentArr[i].uid || "";
        const collectionName = contentArr[i].schema.collectionName || "";

        // get full items
        const fullResponse = await request(`${ROUTES.CONTENTMANGER}/${uid}`);
        const {
          pagination: { page, total },
        } = fullResponse;

        const isI18nEnabled = contentArr[i]?.schema?.pluginOptions?.i18n
          ? true
          : false;

        const customResults = [];

        if (fullResponse.results && isValidLength(fullResponse.results))
          fullResponse.results.forEach((item) => {
            customResults.push(
              Object.assign({}, item, { uid, collectionName, isI18nEnabled })
            );
          });

        const pageSize = 5;
        const pageCount = Math.round(total / pageSize);
        const customPagination = {
          page: page,
          total: total,
          pageSize: 5,
          pageCount: pageCount,
        };

        list.push({
          uid: uid,
          results: customResults,
          pagination: customPagination,
          collectionName: collectionName,
          fullResults: customResults,
          isI18nEnabled: isI18nEnabled,
        });
      }
    } catch (error) {
      console.log("error from get items", error);
    }
  }
  return list;
};

export default getItems;
