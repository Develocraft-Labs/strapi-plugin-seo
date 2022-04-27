import { useCallback, useEffect, useState } from "react";
import { request } from "strapi-helper-plugin";
import { useLocaleContext } from "./containers/LocaleContextProvider/LocaleContextProvider";
import createPagination from "./utils/createPagination";
import getDefaultLocale from "./utils/getDefaultLocale";
import getItems from "./utils/getItems";
import { ROUTES } from "./utils/routes";
import isValidLength from "./utils/isValidLength";
import showErrorNotification from "./utils/errorNotification";
import { USER_ENABLED_LOCALES_DUMMY } from "./utils/constants";
import getContentTypes from "./utils/getContentTypes";

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
  const { singleTypes } = await getContentTypes();

  let localeSingles = [];

  if (Array.isArray(singleTypes) && isValidLength(singleTypes)) {
    const data = await getItems(singleTypes, request);
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
    loading: false,
    defaultLocale: "en",
    localeSingles,
  };
};

const getLocaleItems = async ({
  collection,
  isI18nEnabled,
  uid,
  collectionName,
  selectedLocale,
  defaultLocale,
}) => {
  if (!isI18nEnabled && !selectedLocale) return collection;
  if (!isI18nEnabled && selectedLocale === defaultLocale) return collection;

  if (!isI18nEnabled) return null;

  if (collection.fullResults[0].locale === selectedLocale) return collection;

  const fullResponse = await request(
    `${ROUTES.CONTENTMANGER}/${uid}?_locale=${
      selectedLocale ? selectedLocale : defaultLocale
    }`
  );

  return {
    uid,
    pagination: createPagination(fullResponse),
    collectionName,
    fullResults: fullResponse.results,
    isI18nEnabled,
  };
};

const getLocaleSingles = async (singles, { selectedLocale, defaultLocale }) => {
  return await Promise.all(
    singles.map(async (collection) => {
      const { uid, isI18nEnabled, collectionName } = collection;
      const length = collection?.fullResults?.length;
      if (length === 0) return collection;

      const localeItems = getLocaleItems({
        collection,
        isI18nEnabled,
        uid,
        collectionName,
        selectedLocale,
        defaultLocale,
      });
      return localeItems;
    })
  );
};

const useModelsState = ({ selectedLocale, setUserEnabledLocales }) => {
  const { isI18nPluginInstalled, userEnabledLocales } = useLocaleContext();
  const [state, setState] = useState({
    loading: true,
    defaultLocale: "",
    selectedLocale: "",
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

      let localeSingles = [];

      const defaultLocale = await getDefaultLocale(userEnabledLocales);

      const { singleTypes } = await getContentTypes();

      if (Array.isArray(singleTypes) && isValidLength(singleTypes)) {
        const singles = await getItems(singleTypes, request);
        localeSingles = (
          await getLocaleSingles(singles, { defaultLocale, selectedLocale })
        ).filter(Boolean);
      }
      setState({
        loading: false,
        defaultLocale,
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
