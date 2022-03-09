import { get, has } from "lodash";
import { request } from "strapi-helper-plugin";

import { ROUTES } from "./routes";

/**
 * Get Project's plugins and checks if Strapi's i18n plugin is installed in Project.
 * @returns {Object} Project's plugins and boolean based on Strapi's i18n plugin being installed.
 */
const getPlugins = async () => {
  const response = await request(ROUTES.CONTENTTYPEBUILDER);
  const data = get(response, ["data"], []);

  const plugins = data.filter(
    // save only plugins
    (obj) => has(obj, "plugin")
  );

  const isI18nPluginInstalled = (plugins) => {
    let isI18nInstalled = false;

    plugins.map((plugin) => {
      if (plugin?.plugin === "i18n" && plugin?.uid === "plugins::i18n.locale")
        isI18nInstalled = true;
    });
    return isI18nInstalled;
  };

  return {
    plugins,
    isI18nPluginAvailable: isI18nPluginInstalled(plugins),
  };
};
export default getPlugins;
