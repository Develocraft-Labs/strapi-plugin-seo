const getSeoCollectionTypeName = (resource) => {
  const { resourceData, resourceSchema } = resource;
  const resourceId = resourceData?.id || 1;
  const resourceName = resourceSchema.schema.collectionName;
  return `${resourceName}-${resourceId}`;
};

export default getSeoCollectionTypeName;
