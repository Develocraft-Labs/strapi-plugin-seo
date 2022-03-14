import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import PluginIcon from './icon';

const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
const { name } = pluginPkg.strapi;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'SEO Plugin',
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "seo-plugin" */ './containers/App/App'
        );
        return component;
      },
    });
    app.registerPlugin({
      description: pluginDescription,
      id: pluginId,
      name,
    });
  },
};
