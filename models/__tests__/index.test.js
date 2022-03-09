const model = require("../seo.settings.json");

const attributeStringStructure = {
  type: "string",
  configurable: false,
  required: true,
};
const attributeTextStructure = {
  type: "text",
  configurable: false,
  required: true,
};
const attributeJsonStructure = {
  type: "json",
  configurable: false,
  required: true,
};

describe("Plugin Model", () => {
  describe("Structure Has Required Properties", () => {
    it("Should Have Name Property", () => {
      expect(model).toHaveProperty("info.name", "SEO");
      expect(model.info.name).toBe("SEO");
    });

    it("Should Have Attributes Property", () => {
      expect(model).toHaveProperty("attributes");
    });

    it("Should Have CollectionTypeName Property On Attributes Property", () => {
      expect(model).toHaveProperty(
        "attributes.collectionTypeName",
        attributeStringStructure
      );
    });

    it("Should Have Title Property On Attributes Property", () => {
      expect(model).toHaveProperty(
        "attributes.title",
        attributeStringStructure
      );
    });

    it("Should Have MetaDescription Property On Attributes Property", () => {
      expect(model).toHaveProperty(
        "attributes.metaDescription",
        attributeTextStructure
      );
    });

    it("Should Have JsonLd Property On Attributes Property", () => {
      expect(model).toHaveProperty("attributes.jsonLd", attributeJsonStructure);
    });

    it("Should Have OgTitle Property On Attributes Property", () => {
      expect(model).toHaveProperty(
        "attributes.ogTitle",
        attributeTextStructure
      );
    });

    it("Should Have OgUrl Property On Attributes Property", () => {
      expect(model).toHaveProperty(
        "attributes.ogUrl",
        attributeStringStructure
      );
    });

    it("Should Have OgImage Property On Attributes Property", () => {
      expect(model).toHaveProperty(
        "attributes.ogImage",
        attributeStringStructure
      );
    });
  });
});
