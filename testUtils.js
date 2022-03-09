const { seo } = require("./admin/src/__frontEndTests__/testData");

const query = () => {
  return {
    find: () => {
      return [seo];
    },
    findOne: () => {
      return seo;
    },
  };
};

exports.module = {
  beforeEachSetUp: () => {
    Object.defineProperty(global, "strapi", {
      value: {
        plugins: {
          seo: {
            package: require("./package.json"),
            services: {
              seo: require("./services/seo"),
            },
            models: {
              seo: require("./models/seo.settings.json"),
            },
          },
        },
        config: {
          custom: {
            plugins: {
              seo: {
                enableUsers: false,
              },
            },
          },
        },
        query: query,
      },
      writable: true,
    });
  },
};
