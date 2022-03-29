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

  it("Should Have Update Method", () => {
    expect(controllers).toHaveProperty("update");
  });

  it("Should Have Delete Method", () => {
    expect(controllers).toHaveProperty("delete");
  });

  it("Should Have Create Method", () => {
    expect(controllers).toHaveProperty("create");
  });

  it("Should Have FindAllContentTypes Method", () => {
    expect(controllers).toHaveProperty("findAllContentTypes");
  });
});
