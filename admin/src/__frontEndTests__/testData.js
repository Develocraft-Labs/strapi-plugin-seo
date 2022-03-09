import trads from "../translations";

export const id = 1,
  firstname = "John",
  lastname = "Doe",
  email = "John.Doe@companyA.com",
  title = "title",
  created_by = {
    id,
    email,
    firstname,
    lastname,
  },
  created_at = "2021-10-12T11:49:01.042Z",
  updated_at = "2021-10-15T09:43:36.344Z",
  updated_by = { email, firstname, id, isActive: true, lastname },
  seo = {
    canonical: "https://www.companyA.com/articles",
    created_at: "2021-10-12T11:55:00.595Z",
    created_by: 1,
    id: 1,
    jsonLd: {},
    metaDescription: "Artists Desc",
    metaTitle: "Artists Title",
    ogImage: "Artist og image",
    ogTitle: "Artists Og Title",
    ogType: "Artists Og Type",
    ogUrl: "Artists og url",
    title: "Artists Seo",
    updated_at,
    updated_by: 1,
  },
  resourceData = {
    title,
    id,
    created_by,
  },
  collectionName = "Artists",
  pagination = { page: 1, total: 13, pageSize: 5, pageCount: 3 },
  uid = "application::artists.artists",
  fullResults = [
    { created_at, created_by, id, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 2, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 3, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 4, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 5, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 6, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 7, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 8, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 9, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 10, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 11, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 12, seo, title, updated_at, updated_by },
    { created_at, created_by, id: 13, seo, title, updated_at, updated_by },
  ],
  seoId = 1,
  apiID = "artists",
  attributes = {
    seo: {
      dominant: false,
      nature: "oneWay",
      plugin: "seo",
      private: false,
      target: "plugins::seo.seo",
      unique: false,
    },
    title,
  },
  schema = {
    attributes,
    collectionName,
    connection: "default",
    description: "",
    draftAndPublish: true,
    kind: "collectionType",
    name: "Artists",
    pluginOptions: {},
    restrictRelationsTo: null,
    visible: true,
  },
  resourceSchema = { collectionName, schema },
  pluginUID = "plugins::seo.seo",
  projectCollectionTypes = [{ apiID, schema, uid }],
  selectedSeo = {
    canonical: "https://www.companyA.com/articles",
    created_at: "2021-10-12T11:55:00.595Z",
    created_by: created_by,
    id: 1,
    jsonLd: {},
    metaDescription: "Artists Desc",
    metaTitle: "Artists Title",
    ogImage: "Artist og image",
    ogTitle: "Artists Og Title",
    ogType: "Artists Og Type",
    ogUrl: "Artists og url",
    title: "Artists Seo",
    updated_at,
    updated_by: updated_by,
  },
  refreshOptions = () => {},
  metaTitle = "meta title",
  metaDescription = "meta description",
  canonical = "canonical",
  handleDeleteSeo = () => {},
  handleEditSeo = () => {},
  defaultLocale = "en",
  userEnabledLocales = [
    {
      code: "en",
      created_at: "2021-12-20T09:03:53.724Z",
      id: 1,
      isDefault: true,
      name: "English (en)",
      updated_at: "2021-12-20T09:03:53.724Z",
    },
  ],
  seos = [seo, fullResults];

export const resourceComponentTestData = {
  resourceData,
  resourceSchema,
};

export const seoFormComponentTestData = {
  pluginUID,
  seoId,
  projectCollectionTypes,
  resource: resourceComponentTestData,
};

export const contentTypesListComponentTestData = [
  {
    collectionName,
    fullResults,
    pagination,
    uid,
  },
];

export const translationPickerComponentTestData = {
  translations: trads,
  handleTranslation: () => {},
  value: "",
};

export const contentTypesItemComponentTestData = {
  uid,
  fullResults,
  pagination,
  collectionName,
};
export const previewComponentTestData = {
  selectedSeo,
  pluginUID,
  refreshOptions,
  projectCollectionTypes,
  handleDeleteSeo,
};

export const tableComponentTestData = {
  seos: { collectionName, fullResults, uid, pagination },
  handleDeleteSeo,
  handleEditSeo,
  userEnabledLocales,
  uid,
  defaultLocale,
};
