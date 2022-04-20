import { useEffect, useState } from "react";

import { fetchContentTypes } from "../api/seoApi";

const useContentTypes = () => {
  const [contentTypes, setContentTypes] = useState([]);

  useEffect(() => {
    const contentTypesData = async () => {
      const contentTypes = await fetchContentTypes();
      setContentTypes(contentTypes);
    };
    contentTypesData();
  }, []);

  return contentTypes;
};

export default useContentTypes;
