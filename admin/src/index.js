import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import App from "./containers/App/App";
import Initializer from "./containers/Initializer/Initializer";
import lifecycles from "./lifecycles";
import trads from "./translations";
import pluginLogo from "./public/assets/icons/icon.png";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name,
    pluginLogo,
    preventComponentRendering: false,
    trads,
    menu: {
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon,
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: pluginPkg.presentationName,
          },
          name: pluginPkg.presentationName,
          permissions: [
            { action: "plugins::content-type-builder.read", subject: null },
          ],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};
