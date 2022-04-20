"use strict";
const parseParams = require("../utils").parseParams;
/**
 * seo.js controller
 *
 * @description: A set of functions called "actions" of the `seo` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },
  findOne: async (ctx) => {
    try {
      const { params = {} } = ctx;
      const { seoUid } = parseParams(params);

      return await strapi.plugins["seo"].services["seo"].findOne({
        seoUid,
      });
    } catch (e) {
      console.log(ctx, e);
    }
  },
  find: async (ctx) => {
    try {
      return await strapi.plugins["seo"].services["seo"].find();
    } catch (e) {
      console.log(ctx, e);
    }
  },

  update: async (ctx) => {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;
      const res = await strapi.plugins["seo"].services["seo"].update(id, body);
      return res;
    } catch (e) {
      console.log(ctx, e);
    }
  },

  delete: async (ctx) => {
    try {
      const { id } = ctx.params;
      const res = await strapi.plugins["seo"].services["seo"].delete(id);
      return res;
    } catch (e) {
      console.log(ctx, e);
    }
  },

  create: async (ctx) => {
    try {
      const { body } = ctx.request;
      const res = await strapi.plugins["seo"].services["seo"].create(body);
      return res;
    } catch (e) {
      console.log(ctx, e);
    }
  },
  fetchContentTypes: async (ctx) => {
    try {
      const res = await strapi.plugins["seo"].services[
        "seo"
      ].fetchContentTypes();

      return res;
    } catch (e) {
      console.log(ctx, e);
    }
  },
  filterContentTypeData: async (ctx) => {
    try {
      const { params = {} } = ctx;
      const { apiId, mainField, filter, locale } = parseParams(params);
      const res = await strapi.plugins["seo"].services[
        "seo"
      ].filterContentTypeData({ apiId, mainField, filter, locale });

      return res;
    } catch (e) {
      console.log(ctx, e);
    }
  },
  fetchContentTypeData: async (ctx) => {
    try {
      const { params = {} } = ctx;
      const { start, limit, apiId, locale, mainfield, filter } =
        parseParams(params);

      const res = await strapi.plugins["seo"].services[
        "seo"
      ].fetchContentTypeData({
        start,
        limit,
        apiId,
        locale,
        mainfield,
        filter,
      });

      return res;
    } catch (e) {
      console.log(ctx, e);
    }
  },
};
