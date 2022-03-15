/**
 * seo.js controller
 *
 * @description: A set of functions called "actions" of the `seo` plugin.
 */

// eslint-disable-next-line no-unused-vars
const seo = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx: any) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok',
    });
  },
};

export default seo;
