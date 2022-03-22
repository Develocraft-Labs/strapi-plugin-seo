export interface IPluginSchema {
  collectionName: string;
  displayName: string;
  draftAndPublish: string;
  kind: string;
  pluralName: string;
  pluginOptions: {
    'content-manager': {
      visible: boolean;
    };
    'content-type-builder': {
      visible: boolean;
    };
    i18n?: boolean;
  };
  singularName: string;
  visible: boolean;
}

export interface IPlugin {
  apiID: string;
  schema: IPluginSchema;
  plugin: string;
  uid: string;
}
