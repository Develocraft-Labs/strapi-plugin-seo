// @ts-ignore
import { request } from '@strapi/helper-plugin';
import { get, has, partition } from 'lodash';

import { SINGLETYPE } from './constants';
import { IPlugin } from '../interfaces/Plugins';
import ROUTES from './routes';

/**
 * Get projects Content Types.
 * @returns Object with singleTypes, collectionTypes, plugins and contentTypes.
 */
const getContentTypes = async () => {
  const response = await request(ROUTES.CONTENT_TYPE_BUILDER);
  const data: IPlugin[] = get(response, ['data'], []);

  const contentTypes = data.filter(
    // save all content types except plugins
    (contentType: IPlugin) => !has(contentType, 'plugin')
  );
  const plugins = data.filter(
    // save only plugins
    (obj: any) => has(obj, 'plugin')
  );

  const partitionCB = (item: IPlugin) => item.schema.kind === SINGLETYPE;

  const [singleTypes, collectionTypes] = partition(contentTypes, partitionCB);

  return {
    singleTypes,
    collectionTypes,
    contentTypes,
    plugins,
  };
};

export default getContentTypes;
