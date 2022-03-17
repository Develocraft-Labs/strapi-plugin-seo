import { useCallback, useEffect, useState } from 'react';
// @ts-ignore
import { request } from '@strapi/helper-plugin';

import { useLocaleContext } from '../containers/LocaleContextProvider/LocaleContextProvider';
import createPagination from '../utils/createPagination';
import getDefaultLocale from '../utils/getDefaultLocale';
import getItems from '../utils/getItems';
import ROUTES from '../utils/routes';
import isValidLength from '../utils/isValidLength';
import showErrorNotification from '../utils/showErrorNotification';
import { USER_ENABLED_LOCALES_DUMMY } from '../utils/constants';
import getContentTypes from '../utils/getContentTypes';

const getEnLocaleData = (data: any) =>
  data.map((collection: any) => {
    const {
      collectionName,
      isI18nEnabled,
      pagination,
      uid,
      results,
      fullResults,
    } = collection;
    const filteredFullResults = fullResults.filter(
      (result: any) =>
        !result.seo || !result.seo.seoUid || result.seo?.locale === 'en'
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

const buildEnState = async () => {
  const { collectionTypes, singleTypes } = await getContentTypes();

  let localeCollections = [];
  let localeSingles = [];
  let collections = [];
  if (isValidLength(collectionTypes)) {
    const data = await getItems(collectionTypes, request);
    const enLocaleData = getEnLocaleData(data);

    collections = enLocaleData;
    localeCollections = enLocaleData;
  }

  if (isValidLength(singleTypes)) {
    const data = await getItems(singleTypes, request);
    const enLocaleData = getEnLocaleData(data).map((enSingleTypeData: any) => ({
      ...enSingleTypeData,
      fullResults: enSingleTypeData?.fullResults?.slice(0, 1),
      results: enSingleTypeData?.results?.slice(0, 1),
    }));
    localeSingles = enLocaleData;
  }

  // make selectedLocale and error optional in interface
  return {
    collections,
    collectionTypes,
    loading: false,
    defaultLocale: 'en',
    localeCollections,
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
}: any) => {
  if (!isI18nEnabled && !selectedLocale) return collection;
  if (!isI18nEnabled && selectedLocale === defaultLocale) return collection;

  if (!isI18nEnabled) return null;

  if (collection.fullResults[0].locale === selectedLocale) return collection;

  const fullResponse = await request(
    `${ROUTES.CONTENT_MANAGER}/${uid}?_locale=${
      selectedLocale || defaultLocale
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

const getLocaleSingles = async (
  singles: any,
  { selectedLocale, defaultLocale }: any
) =>
  Promise.all(
    singles.map(async (collection: any) => {
      const { uid, isI18nEnabled, collectionName } = collection;
      const length = collection?.fullResults?.length;
      if (length === 0) return collection;

      return getLocaleItems({
        collection,
        isI18nEnabled,
        uid,
        collectionName,
        selectedLocale,
        defaultLocale,
      });
    })
  );
// remember to set correct types from any
const getLocaleCollections = async (
  collections: any,
  { selectedLocale, defaultLocale }: any
) =>
  Promise.all(
    collections.map(async (collection: any) => {
      const { uid, isI18nEnabled, collectionName } = collection;
      const length = collection?.fullResults?.length;
      if (length === 0) return collection;

      return getLocaleItems({
        collection,
        isI18nEnabled,
        uid,
        collectionName,
        selectedLocale,
        defaultLocale,
      });
    })
  );

const useModelsState = ({ selectedLocale, setUserEnabledLocales }: any) => {
  const { isI18nPluginInstalled, userEnabledLocales } = useLocaleContext();
  const [state, setState] = useState<any>({
    loading: true,
    collections: [],
    defaultLocale: '',
    selectedLocale: '',
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

      let collections: {
        uid: any;
        results: any;
        pagination: {
          page: any;
          total: any;
          pageSize: number;
          pageCount: number;
        };
        collectionName: any;
        fullResults: any;
        isI18nEnabled: boolean;
      }[] = [];
      let localeCollections = [];
      let localeSingles = [];

      const defaultLocale = await getDefaultLocale(userEnabledLocales);

      const { collectionTypes, singleTypes } = await getContentTypes();

      if (isValidLength(collectionTypes)) {
        collections = await getItems(collectionTypes, request);
        localeCollections = (
          await getLocaleCollections(collections, {
            defaultLocale,
            selectedLocale,
          })
        ).filter(Boolean);
      }

      if (isValidLength(singleTypes)) {
        const singles = await getItems(singleTypes, request);
        localeSingles = (
          await getLocaleSingles(singles, { defaultLocale, selectedLocale })
        ).filter(Boolean);
      }
      setState({
        collections,
        collectionTypes,
        loading: false,
        defaultLocale,
        localeCollections,
        localeSingles,
      });
    } catch (error: any) {
      console.error(error);
      setState({ loading: false, error });
      showErrorNotification(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocale, isI18nPluginInstalled]);

  useEffect(() => {
    getModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocale, isI18nPluginInstalled]);
  console.log('state', state);
  return state;
};

export default useModelsState;
