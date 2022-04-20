import { useEffect, useState } from "react";

import { fetchContentTypeData } from "../api/seoApi";

const fetchData = async ({
  limit,
  apiId,
  selectedLocale,
  collectionName,
  start,
}) => {
  const fetchedData = await fetchContentTypeData({
    start: start,
    limit: limit,
    apiId,
    locale: selectedLocale,
  });
  const { pagination, contentType, isI18nEnabled, uid, locale } =
    fetchedData[0];
  const data = fetchedData[0]?.[`${collectionName}`];

  return {
    data,
    pagination,
    contentType,
    fullResults: data,
    results: data,
    isI18nEnabled,
    uid,
    collectionName,
    locale,
  };
};

const useContentTypeData = ({ type, selectedLocale, limit, start }) => {
  const [contentTypeData, setContentTypeData] = useState({});

  useEffect(() => {
    let isMounted = true;
    try {
      if (type) {
        const { apiId, collectionName } = type;

        fetchData({
          limit,
          apiId,
          selectedLocale,
          collectionName,
          start,
        }).then((data) => {
          if (isMounted) setContentTypeData(data);
        });
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isMounted = false;
    };
  }, [start]);

  return contentTypeData;
};

export default useContentTypeData;
