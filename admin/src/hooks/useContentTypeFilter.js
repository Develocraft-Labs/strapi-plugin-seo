import { useEffect, useState } from "react";

import { filterContentTypeData } from "../api/seoApi";

export const fetchData = async ({
  apiId,
  collectionName,
  mainField,
  filter,
  selectedLocale,
}) => {
  try {
    const fetchedData = await filterContentTypeData({
      apiId,
      mainField,
      filter,
      locale: selectedLocale,
    });

    if (fetchedData.length <= 0) return fetchedData;

    const { pagination, contentType, isI18nEnabled, uid, locale } =
      fetchedData[0];
    const data = fetchedData[0]?.[`${collectionName}`];

    return {
      ...data,
      pagination,
      contentType,
      fullResults: data,
      results: data,
      isI18nEnabled,
      uid,
      collectionName,
      locale,
    };
  } catch (e) {
    console.error(e);
  }
};

const useContentTypeFilter = ({ apiId, collectionName, mainField, filter }) => {
  const [contentTypeData, setContentTypeData] = useState({});

  useEffect(() => {
    let isMounted = true;
    try {
      if (apiId) {
        fetchData({
          apiId,
          collectionName,
          mainField,
          filter,
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
  }, []);

  return contentTypeData;
};

export default useContentTypeFilter;
