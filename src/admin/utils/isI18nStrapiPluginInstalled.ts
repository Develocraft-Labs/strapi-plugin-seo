import { IPlugin } from '../interfaces/Plugins';

/**
 * Check if i18n plugin is installed in Strapi project.
 * @param plugins Installed Strapi plugins.
 * @returns Boolean
 */
const isI18nStrapiPluginInstalled = (plugins: IPlugin[]) => {
  let isI18nInstalled = false;

  // eslint-disable-next-line array-callback-return
  plugins.forEach((plugin) => {
    if (plugin?.plugin === 'i18n' && plugin?.uid === 'plugin::i18n.locale') {
      isI18nInstalled = true;
    }
  });
  return isI18nInstalled;
};

export default isI18nStrapiPluginInstalled;
