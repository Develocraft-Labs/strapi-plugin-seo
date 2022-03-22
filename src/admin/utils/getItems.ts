/* eslint-disable no-await-in-loop */
import {
  IContentType,
  IContentTypeItem,
  IPagination,
} from '../interfaces/ContentTypeItem';
import { IPlugin } from '../interfaces/Plugins';
import isValidLength from './isValidLength';
import ROUTES from './routes';

/**
 * Create custom Content Types array of objects from project Content Types.
 * @param contentTypes - Project Content Types.
 * @param request - Request method for strapi-helper-plugin package.
 * @returns array of content type items.
 */
const getItems = async (
  contentTypes: IPlugin[],
  request: any
): Promise<IContentType[]> => {
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
      const fullResponse: IContentType = await request(
        `${ROUTES.CONTENT_MANAGER}/${uid}`
      );
      const {
        pagination: { page, total },
      } = fullResponse;

      const isI18nEnabled = !!contentTypes[i]?.schema?.pluginOptions?.i18n;

      const customResults: IContentTypeItem[] = [];

      if (fullResponse.results && isValidLength(fullResponse.results)) {
        fullResponse.results.forEach(
          (item: IContentTypeItem) =>
            // eslint-disable-next-line object-curly-newline
            customResults.push({ ...item, uid, collectionName, isI18nEnabled })
          // eslint-disable-next-line function-paren-newline
        );
      }
      const pageSize = 5;
      const pageCount = Math.round(total / pageSize);
      const customPagination: IPagination = {
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
  return list;
};

export default getItems;
