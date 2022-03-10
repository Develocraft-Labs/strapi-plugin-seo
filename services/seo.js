"use strict";
const { extractMeta } = require("../utils/index");
const { v4: uuidv4 } = require("uuid");
/**
 * seo.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  async findOne({ seoUid }) {
    const { pluginName, model } = extractMeta(strapi.plugins);

    const entity = await strapi
      .query(model.modelName, pluginName)
      .findOne({ seoUid });

    return entity;
  },
  async find() {
    const { pluginName, model } = extractMeta(strapi.plugins);

    const entities = await strapi.query(model.modelName, pluginName).find();

    return entities;
  },
  async update(id, data) {
    const { pluginName, model } = extractMeta(strapi.plugins);
    const entity = await strapi
      .query(model.modelName, pluginName)
      .update({ id }, data);
    return entity;
  },

  async delete(id) {
    const { pluginName, model } = extractMeta(strapi.plugins);

    const res = await strapi.query(model.modelName, pluginName).delete({ id });
    return res;
  },

  async create(data) {
    const { pluginName, model } = extractMeta(strapi.plugins);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.getModel(model),
      { ...data, seoUid: uuidv4() }
    );

    const entity = await await strapi
      .query(model.modelName, pluginName)
      .create(validData);
    return entity;
  },
};
