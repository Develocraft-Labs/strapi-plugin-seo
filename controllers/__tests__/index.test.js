const controllers = require("../seo");
const { beforeEachSetUp } = require("../../testUtils").module;

jest.mock("../seo.js");

beforeEachSetUp();

describe("Plugin Controller", () => {
  it("Should Have find Method", () => {
    expect(controllers).toHaveProperty("find");
  });

  it("Should Have findOne Method", () => {
    expect(controllers).toHaveProperty("findOne");
  });
});
