module.exports = {
  extractMeta: (plugins) => {
    const { seo: plugin } = plugins;
    const { seo: service } = plugin.services;
    const { seo: model } = plugin.models;
    return {
      model,
      service,
      plugin,
      pluginName: plugin.package.strapi.name.toLowerCase(),
    };
  },
  parseParams: (params) =>
    Object.keys(params).reduce((prev, curr) => {
      const value = params[curr];
      const parsedValue = Number(value);
      return {
        ...prev,
        [curr]: isNaN(parsedValue) ? value : parsedValue,
      };
    }, {}),
};
