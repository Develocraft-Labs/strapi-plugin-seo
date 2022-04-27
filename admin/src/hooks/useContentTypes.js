import { useEffect, useState } from "react";

import { fetchContentTypes } from "../api/seoApi";

const useContentTypes = () => {
  const [contentTypes, setContentTypes] = useState([]);
  const [isContentTypesLoading, setIsContentTypesLoading] = useState(true);

  useEffect(() => {
    const contentTypesData = async () => {
      const contentTypes = await fetchContentTypes();
      setContentTypes(contentTypes);
      setIsContentTypesLoading(false);
    };
    contentTypesData();
  }, []);

  return { contentTypes, isContentTypesLoading, setIsContentTypesLoading };
};

export default useContentTypes;
