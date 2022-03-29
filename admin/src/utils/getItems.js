import isValidLength from "./isValidLength";

/**
 * Create custom Content Types array of objects from project Content Types.
 * @param {Array} contentTypes - Project Content Types.
 * @returns {Array} array of content type items.
 */
const getItems = async (contentTypes) => {
  const list = [];
  const length = contentTypes.length;

  if (length > 0) {
    try {
      // get the content type items
      for (let i = 0; i < length; i++) {
        const uid = contentTypes[i].uid || "";
        const collectionName = contentTypes[i].collectionName || "";
        const data = contentTypes[i]?.[collectionName];
        const total = data.length;
        const isI18nEnabled = contentTypes[i].isI18nEnabled;
        const customResults = [];

        if (isValidLength(data))
          data.forEach((item) => {
            customResults.push(
              Object.assign({}, item, { uid, collectionName, isI18nEnabled })
            );
          });

        const pageSize = 5;
        const pageCount = Math.round(total / pageSize);
        const customPagination = {
          page: 1,
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
