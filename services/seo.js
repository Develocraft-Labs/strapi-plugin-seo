"use strict";
const { extractMeta } = require("../utils/index");
const { v4: uuidv4 } = require("uuid");
const { partition } = require("lodash");
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

  async fetchContentTypes() {
    const SINGLETYPE = "singleType";
    const strapiModels = await await strapi.models;

    const contentTypesData = Object.keys(strapiModels).map(
      async (contentTypeKey) => {
        const model = strapiModels[`${contentTypeKey}`];
        const isI18nEnabled = !!model?.pluginOptions?.i18n;
        const collectionName = model.collectionName;
        const modelSchema = model.__schema__;
        const modelType = model.modelType;
        const modelUid = model.uid;
        const modelApiName = model.apiName;
        const data = [];

        if (!modelType) return;

        if (modelUid.includes("application")) {
          data.push({
            contentType: modelSchema?.kind,
            collectionName,
            isI18nEnabled,
            uid: modelUid,
            apiId: modelApiName,
            schema: modelSchema,
          });
        }

        return data;
      }
    );
    const contentTypes = (await Promise.all(contentTypesData))
      .flat(1)
      .filter(Boolean);

    const [singleTypes, collectionTypes] = partition(
      contentTypes,
      (item) => item.schema.kind === SINGLETYPE
    );

    return {
      singleTypes,
      collectionTypes,
      contentTypes,
    };
  },

  async filterContentTypeData({ mainField, filter, apiId, locale }) {
    const collection = await await strapi.query(apiId);
    const model = collection.model;
    const isI18nEnabled = !!model?.pluginOptions?.i18n;
    const collectionName = model.collectionName;
    const modelSchema = model.__schema__;
    const contentType = modelSchema.kind;
    const modelUid = model.uid;
    const data = [];

    const modelData = await collection.findOne({ [`${mainField}`]: filter });

    if (!modelData) {
      return [];
    }
    modelData.title = modelData?.title || modelData?.[`${mainField}`];

    data.push({
      [`${collectionName}`]: modelData,
      contentType,
      collectionName,
      isI18nEnabled,
      uid: modelUid,
      pagination: { total: 1, page: 1, pageSize: 1 },
      locale,
    });
    return data;
  },

  async fetchContentTypeData({ start, limit, apiId, locale }) {
    const isI18nPluginInstalled = !!strapi.plugins.i18n;
    const collection = await await strapi.query(apiId);
    const model = collection.model;
    const isI18nEnabled = !!model?.pluginOptions?.i18n;
    const collectionName = model.collectionName;
    const modelSchema = model.__schema__;
    const contentType = modelSchema.kind;
    const modelUid = model.uid;
    const pageSize = 10;
    const data = [];

    const handlePageCount = ({ total, pageSize }) => {
      const pageCount = total / pageSize;

      if (pageCount < 1) {
        return 1;
      }

      if (total % pageSize !== 0) {
        return Math.round(pageCount) + 1;
      }

      return Math.round(pageCount);
    };

    const handleLocaleContentTypeData = async () => {
      if (contentType === "singleType") {
        const modelData = await collection.find({
          _locale: locale,
        });

        const total = await collection.count({ _locale: locale });
        const pageCount = handlePageCount({ total, pageSize });

        data.push({
          [`${collectionName}`]: modelData,
          contentType,
          collectionName,
          isI18nEnabled,
          uid: modelUid,
          pagination: { total, page: 1, pageSize: pageSize, pageCount },
          locale,
        });
        return data;
      }

      const modelData = await collection.find({
        _start: start,
        _limit: limit,
        _locale: locale,
      });

      const total = await collection.count({ _locale: locale });
      const pageCount = handlePageCount({ total, pageSize });

      data.push({
        [`${collectionName}`]: modelData,
        contentType,
        collectionName,
        isI18nEnabled,
        uid: modelUid,
        pagination: { total, page: 1, pageSize: pageSize, pageCount },
        locale,
      });
      return data;
    };

    if (isI18nEnabled && isI18nPluginInstalled) {
      return handleLocaleContentTypeData();
    }

    if (contentType === "singleType") {
      const modelData = await collection.findOne();
      const total = modelData.length;
      const pageCount = Math.round(total / pageSize);

      data.push({
        [`${collectionName}`]: modelData,
        contentType,
        collectionName,
        isI18nEnabled,
        uid: modelUid,
        pagination: { total, page: 1, pageSize: pageSize, pageCount },
        locale: "en",
      });

      return data;
    }

    if (!isI18nPluginInstalled && isI18nEnabled) {
      const modelData = await collection.find({
        _start: start,
        _limit: limit,
      });

      const filteredModelData = modelData.filter(
        (item) => item.locale === "en"
      );

      const total = filteredModelData.length;
      const pageCount = handlePageCount({ total, pageSize });

      data.push({
        [`${collectionName}`]: filteredModelData,
        contentType,
        collectionName,
        isI18nEnabled,
        uid: modelUid,
        pagination: { total, page: 1, pageSize: pageSize, pageCount },
        locale: "en",
      });

      return data;
    }

    const modelData = await collection.find({
      _start: start,
      _limit: limit,
    });
    const total = await collection.count();
    const pageCount = handlePageCount({ total, pageSize });

    data.push({
      [`${collectionName}`]: modelData,
      contentType,
      collectionName,
      isI18nEnabled,
      uid: modelUid,
      pagination: { total, page: 1, pageSize: pageSize, pageCount },
      locale: "en",
    });

    return data;
  },
};
