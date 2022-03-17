// @ts-ignore
import { request } from '@strapi/helper-plugin';
import { get, has } from 'lodash';

import { IPlugin } from '../interfaces/Plugins';

import ROUTES from './routes';

interface IResults {
  plugins: IPlugin[];
  isI18nPluginAvailable: boolean;
}
/**
 * Get Project's plugins and checks if Strapi's i18n plugin is installed in Project.
 * @returns {Object} Project's plugins and boolean based on Strapi's i18n plugin being installed.
 */
const getPlugins = async (): Promise<IResults> => {
  const response = await request(ROUTES.CONTENT_TYPE_BUILDER);
  const data = get(response, ['data'], []);

  const plugins = data.filter(
    // save only plugins
    (obj: any) => has(obj, 'plugin')
  );

  const isI18nPluginInstalled = (projectPlugins: IPlugin[]) => {
    let isI18nInstalled = false;

    // eslint-disable-next-line array-callback-return
    projectPlugins.map((projectPlugin) => {
      if (
        projectPlugin?.plugin === 'i18n' &&
        projectPlugin?.uid === 'plugin::i18n.locale'
      ) {
        isI18nInstalled = true;
      }
    });
    return isI18nInstalled;
  };

  return {
    plugins,
    isI18nPluginAvailable: isI18nPluginInstalled(plugins),
  };
};
export default getPlugins;
