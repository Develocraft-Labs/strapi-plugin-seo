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
  async findAllContentTypes() {
    const contentTypes = {
      singleTypes: [],
      collectionTypes: [],
      singleTypesLocales: [],
      collectionTypesLocales: [],
    };
    const strapiModels = await await strapi.models;

    const contentTypesData = Object.keys(strapiModels).map(
      async (contentTypeKey) => {
        const model = strapiModels[`${contentTypeKey}`];
        const isI18nEnabled = !!model.pluginOptions?.i18n;
        const collectionName = model.collectionName;
        const modelSchema = model.__schema__;
        const modelType = model.modelType;
        const modelUid = model.uid;
        const data = [];

        if (!modelType) return;

        if (modelUid.includes("application")) {
          const modelData = await await strapi.models?.[
            `${contentTypeKey}`
          ].fetchAll();

          data.push({
            [`${collectionName}`]: modelData,
            contentType: modelSchema?.kind,
            collectionName,
            isI18nEnabled,
            uid: modelUid,
          });
        }

        return data;
      }
    );

    const resolvedContentTypes = await (await Promise.all(contentTypesData))
      .flat(1)
      .filter(Boolean);

    const createContentTypeLocales = ({
      resolvedContentType,
      collectionName,
      isI18nEnabled,
    }) => {
      const contentTypeLocales = {};

      resolvedContentType?.[collectionName].forEach((item) => {
        if (isI18nEnabled && item.attributes.locale) {
          contentTypeLocales[`locale-${item.attributes.locale}`] = [];
        }
      });

      resolvedContentType?.[collectionName].forEach((item) => {
        if (item.attributes.locale) {
          contentTypeLocales[`locale-${item.attributes.locale}`].push(item);
        }
      });

      return contentTypeLocales;
    };

    resolvedContentTypes.forEach((resolvedContentType) => {
      const { contentType, collectionName, isI18nEnabled } =
        resolvedContentType;

      if (contentType === "singleType") {
        const singleTypesLocales = createContentTypeLocales({
          resolvedContentType,
          collectionName,
          isI18nEnabled,
        });

        if (isI18nEnabled) {
          contentTypes.singleTypesLocales.push({
            [`${collectionName}`]: singleTypesLocales,
          });
        }

        contentTypes.singleTypes.push(resolvedContentType);
        return;
      }

      const collectionTypesLocales = createContentTypeLocales({
        resolvedContentType,
        collectionName,
        isI18nEnabled,
      });

      if (isI18nEnabled) {
        contentTypes.collectionTypesLocales.push({
          [`${collectionName}`]: collectionTypesLocales,
        });
      }

      contentTypes.collectionTypes.push(resolvedContentType);
      return;
    });

    return contentTypes;
  },
};
