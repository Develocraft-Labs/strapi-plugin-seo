import { useCallback, useEffect, useState } from "react";

import { useLocaleContext } from "./containers/LocaleContextProvider/LocaleContextProvider";
import createPagination from "./utils/createPagination";
import getDefaultLocale from "./utils/getDefaultLocale";
import getItems from "./utils/getItems";
import isValidLength from "./utils/isValidLength";
import showErrorNotification from "./utils/errorNotification";
import { USER_ENABLED_LOCALES_DUMMY } from "./utils/constants";
import { fetchContentTypes } from "./api/seoApi";

const getEnLocaleData = (data) => {
  return data.map((collection) => {
    const {
      collectionName,
      isI18nEnabled,
      pagination,
      uid,
      results,
      fullResults,
    } = collection;
    const filteredFullResults = fullResults.filter(
      (result) =>
        !result.seo || !result.seo.seoUid || result.seo?.locale === "en"
    );

    return {
      collectionName,
      isI18nEnabled,
      pagination,
      uid,
      results,
      fullResults: filteredFullResults,
    };
  });
};

const buildEnState = async () => {
  const fetchedContentTypes = await fetchContentTypes();

  let localeCollections = [];
  let localeSingles = [];
  let collections = [];

  if (
    Array.isArray(fetchedContentTypes?.collectionTypes) &&
    isValidLength(fetchedContentTypes?.collectionTypes)
  ) {
    const data = await getItems(fetchedContentTypes?.collectionTypes);
    const enLocaleData = getEnLocaleData(data);

    collections = enLocaleData;
    localeCollections = enLocaleData;
  }

  if (
    Array.isArray(fetchedContentTypes?.singleTypes) &&
    isValidLength(fetchedContentTypes?.singleTypes)
  ) {
    const data = await getItems(fetchedContentTypes?.singleTypes);
    const enLocaleData = getEnLocaleData(data).map((enSingleTypeData) => {
      return {
        ...enSingleTypeData,
        fullResults: enSingleTypeData?.fullResults?.slice(0, 1),
        results: enSingleTypeData?.results?.slice(0, 1),
      };
    });
    localeSingles = enLocaleData;
  }

  return {
    collections,
    collectionTypes: fetchedContentTypes?.collectionTypes,
    loading: false,
    defaultLocale: "en",
    localeCollections,
    localeSingles,
  };
};

const getLocaleItems = async (
  contentTypesLocales,
  {
    collection,
    isI18nEnabled,
    uid,
    collectionName,
    selectedLocale,
    defaultLocale,
  }
) => {
  if (!isI18nEnabled && !selectedLocale) return collection;
  if (!isI18nEnabled && selectedLocale === defaultLocale) return collection;

  if (!isI18nEnabled) return null;

  const results = contentTypesLocales
    .map((contentTypesLocale) => {
      if (contentTypesLocale?.[`${collectionName}`]) {
        return contentTypesLocale?.[`${collectionName}`]?.[
          `locale-${selectedLocale}`
        ];
      }
      return;
    })
    .filter(Boolean)
    .flat(1);

  const pagination = {
    pagination: { page: 1, total: results.length },
  };

  return {
    uid,
    pagination: createPagination(pagination),
    collectionName,
    fullResults: results,
    isI18nEnabled,
  };
};

const getLocaleContentTypes = async (
  contentTypes,
  contentTypesLocales,
  { selectedLocale, defaultLocale }
) => {
  return await Promise.all(
    contentTypes.map(async (collection) => {
      const { uid, isI18nEnabled, collectionName } = collection;
      const length = collection?.fullResults?.length;
      if (length === 0) return collection;

      return getLocaleItems(contentTypesLocales, {
        collection,
        isI18nEnabled,
        uid,
        collectionName,
        selectedLocale,
        defaultLocale,
      });
    })
  );
};

const useModelsState = ({ selectedLocale, setUserEnabledLocales }) => {
  const { isI18nPluginInstalled, userEnabledLocales } = useLocaleContext();
  const [state, setState] = useState({
    loading: true,
    collections: [],
    defaultLocale: "",
    selectedLocale: "",
    localeCollections: [],
    localeSingles: [],
    error: null,
  });

  const getModels = useCallback(async () => {
    try {
      if (!isI18nPluginInstalled) {
        const enState = await buildEnState();
        setState(enState);
        setUserEnabledLocales(USER_ENABLED_LOCALES_DUMMY);
        return;
      }

      let collections = [];
      let localeCollections = [];
      let localeSingles = [];

      const defaultLocale = await getDefaultLocale(userEnabledLocales);
      const fetchedContentTypes = await fetchContentTypes();

      if (
        Array.isArray(fetchedContentTypes?.collectionTypes) &&
        isValidLength(fetchedContentTypes?.collectionTypes)
      ) {
        const collections = await getItems(
          fetchedContentTypes?.collectionTypes
        );
        localeCollections = (
          await getLocaleContentTypes(
            collections,
            fetchedContentTypes?.collectionTypesLocales,
            {
              defaultLocale,
              selectedLocale,
            }
          )
        ).filter(Boolean);
      }

      if (
        Array.isArray(fetchedContentTypes?.singleTypes) &&
        isValidLength(fetchedContentTypes?.singleTypes)
      ) {
        const singles = await getItems(fetchedContentTypes?.singleTypes);
        localeSingles = (
          await getLocaleContentTypes(
            singles,
            fetchedContentTypes?.singleTypesLocales,
            {
              defaultLocale,
              selectedLocale,
            }
          )
        ).filter(Boolean);
      }

      setState({
        collections,
        collectionTypes: fetchedContentTypes?.collectionTypes,
        loading: false,
        defaultLocale,
        localeCollections,
        localeSingles,
      });
    } catch (error) {
      console.error(error);
      setState({ loading: false, error });
      showErrorNotification(error.message);
    }
  }, [selectedLocale, isI18nPluginInstalled]);

  useEffect(() => {
    getModels();
  }, [selectedLocale, isI18nPluginInstalled]);
  return state;
};

export default useModelsState;
