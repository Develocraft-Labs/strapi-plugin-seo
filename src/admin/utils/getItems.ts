/* eslint-disable no-await-in-loop */
import { IPlugin } from '../interfaces/Plugins';
import isValidLength from './isValidLength';
import ROUTES from './routes';

/**
 * Create custom Content Types array of objects from project Content Types.
 * @param {Array} contentTypes - Project Content Types.
 * @param {Promise} request - Request method for strapi-helper-plugin package.
 * @returns {Array} array of content type items.
 */
const getItems = async (contentTypes: IPlugin[], request: any) => {
  // if (!contentTypes || contentTypes.length < 0)
  if (!isValidLength(contentTypes)) return [];

  const { length } = contentTypes;
  const list = [];

  try {
    // get the content type items
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const uid = contentTypes[i].uid || '';
      const collectionName = contentTypes[i].schema.collectionName || '';

      // get full items
      const fullResponse = await request(`${ROUTES.CONTENT_MANAGER}/${uid}`);
      const {
        pagination: { page, total },
      } = fullResponse;

      const isI18nEnabled = !!contentTypes[i]?.schema?.pluginOptions?.i18n;

      const customResults: any = [];

      if (fullResponse.results && isValidLength(fullResponse.results)) {
        fullResponse.results.forEach((item: any) => {
          // eslint-disable-next-line object-curly-newline
          customResults.push({ ...item, uid, collectionName, isI18nEnabled });
        });
      }
      const pageSize = 5;
      const pageCount = Math.round(total / pageSize);
      const customPagination = {
        page,
        total,
        pageSize,
        pageCount,
      };

      list.push({
        uid,
        results: customResults,
        pagination: customPagination,
        collectionName,
        fullResults: customResults,
        isI18nEnabled,
      });
    }
  } catch (error) {
    console.log('error from get items', error);
  }
  console.log('list', list);
  return list;
};

export default getItems;
