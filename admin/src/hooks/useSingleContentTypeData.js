import { useState, useEffect } from "react";
import { fetchContentTypeData } from "../api/seoApi";
import { useContentTypeSettingsContext } from "../containers/ContentTypeSettingsContext";

const useSingleContentTypeData = ({ contentTypes, selectedLocale, limit }) => {
  const [data, setData] = useState([]);
  const settings = useContentTypeSettingsContext();

  useEffect(() => {
    if (contentTypes?.singleTypes) {
      const { singleTypes } = contentTypes;

      const data = [];

      singleTypes.map(async (singleType) => {
        const { apiId, collectionName, uid } = singleType;
        const setting = settings[uid];
        const mainField = setting?.settings?.mainField;

        const fetchData = async () => {
          const fetchedData = await fetchContentTypeData({
            start: 0,
            limit: limit,
            apiId,
            locale: selectedLocale,
          });
          const { pagination, contentType, isI18nEnabled, locale } =
            fetchedData[0];
          const singeTypeData = fetchedData[0]?.[`${collectionName}`];

          data.push({
            data: singeTypeData,
            pagination,
            contentType,
            fullResults: [singeTypeData],
            results: [singeTypeData],
            isI18nEnabled,
            uid,
            collectionName,
            locale,
            apiId,
            mainField,
          });
          setData(data);
        };
        fetchData();
      });
    }
  }, [contentTypes.singleTypes, selectedLocale]);

  return data;
};
export default useSingleContentTypeData;
