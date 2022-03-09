const ctx = require("koa/lib/context");
const { seo } = require("../../admin/src/__frontEndTests__/testData");
const { extractMeta } = require("../../utils/index");
const services = require("../seo");
const { beforeEachSetUp } = require("../../testUtils").module;

beforeEachSetUp();

describe("Extracting metadata", () => {
  it("Should extract plugin metadata properly", () => {
    const { model, service, plugin, pluginName } = extractMeta(strapi.plugins);

    expect(model).toHaveProperty("info.name", "SEO");
    expect(service).toHaveProperty("findOne");
    expect(Object.keys(plugin)).toEqual(
      expect.arrayContaining(["package", "services", "models"])
    );
    expect(pluginName).toBe("seo");
  });
});

describe("Services", () => {
  it("Should Have Find Method", () => {
    expect(services).toHaveProperty("find");
  });

  it("Should Have FindOne Method", () => {
    expect(services).toHaveProperty("findOne");
  });

  it("Should Have Update Method", () => {
    expect(services).toHaveProperty("update");
  });

  it("Find Method Should Return Object Containing Companies Array", async () => {
    expect(await services.find(ctx)).toMatchObject([seo]);
  });

  it("FindOne Method Should Return A Single Company", async () => {
    const findOneResult = await services.findOne(ctx);
    expect(findOneResult).toMatchObject(seo);
  });
});
