import { useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import { ROUTES } from "../utils/routes";

const getResourceSchema = async (uui) => {
  return request(`${ROUTES.CONTENTTYPEBUILDER}/${uui}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getResourceData = async (resourceSchema, id) => {
  const isSignleType = resourceSchema.schema.kind === "singleType";
  const url = isSignleType
    ? `/content-manager/single-types/${resourceSchema.uid}`
    : `/content-manager/collection-types/${resourceSchema.uid}/${id}`;
  return request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useResource = (uid, id) => {
  const [resourceSchema, setResourceSchema] = useState(null);

  const [resourceData, setResource] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      const schemaRes = await getResourceSchema(uid);
      const resource = await getResourceData(schemaRes.data, id);
      setResource(resource);
      setResourceSchema(schemaRes.data);
      setLoading(false);
    };

    fetchResource();
  }, [uid, id]);

  return {
    resourceData,
    resourceSchema,
    isLoading,
  };
};

export default useResource;
