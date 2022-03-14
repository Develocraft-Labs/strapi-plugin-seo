/**
 * seo.js controller
 *
 * @description: A set of functions called "actions" of the `seo` plugin.
 */

// eslint-disable-next-line no-unused-vars
module.exports = ({ strapi }) => ({
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok',
    });
  },
});
