/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */

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
import { ILocale } from '../interfaces/Locales';
import { IContentType } from '../interfaces/ContentTypeItem';
import { IPlugin } from '../interfaces/Plugins';

const getEnLocaleData = (data: IContentType[]) =>
  data.map((collection) => {
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

  let localeCollections: IContentType[] = [];
  let localeSingles: IContentType[] = [];
  let collections: IContentType[] = [];

  if (isValidLength(collectionTypes)) {
    const data = await getItems(collectionTypes, request);
    const enLocaleData = getEnLocaleData(data);

    collections = enLocaleData;
    localeCollections = enLocaleData;
  }

  if (isValidLength(singleTypes)) {
    const data = await getItems(singleTypes, request);
    const enLocaleData = getEnLocaleData(data).map((enSingleTypeData) => ({
      ...enSingleTypeData,
      fullResults: enSingleTypeData?.fullResults?.slice(0, 1),
      results: enSingleTypeData?.results?.slice(0, 1),
    }));
    localeSingles = enLocaleData;
  }

  return {
    collections,
    collectionTypes,
    loading: false,
    defaultLocale: 'en',
    localeCollections,
    localeSingles,
  };
};

interface IGetLocaleItems {
  collection: IContentType;
  collectionName: string;
  isI18nEnabled: boolean;
  uid: string;
  selectedLocale: string;
  defaultLocale: string;
}

const getLocaleItems = async ({
  collection,
  isI18nEnabled,
  uid,
  collectionName,
  selectedLocale,
  defaultLocale,
}: IGetLocaleItems): Promise<IContentType> => {
  if (!isI18nEnabled && !selectedLocale) return collection;
  if (!isI18nEnabled && selectedLocale === defaultLocale) return collection;
  if (collection.fullResults[0].locale === selectedLocale) return collection;
  // if (!isI18nEnabled) return null;

  const fullResponse = await request(
    `${ROUTES.CONTENT_MANAGER}/${uid}?locale=${selectedLocale || defaultLocale}`
  );

  return {
    uid,
    pagination: createPagination(fullResponse),
    collectionName,
    fullResults: fullResponse.results,
    isI18nEnabled,
  };
};

interface IGetContentTypeLocaleCollections {
  selectedLocale: string;
  defaultLocale: string;
}

const getContentTypeLocaleItems = async (
  contentTypeItems: IContentType[],
  { selectedLocale, defaultLocale }: IGetContentTypeLocaleCollections
) =>
  Promise.all(
    contentTypeItems.map(async (contentTypeItem: IContentType) => {
      const { uid, isI18nEnabled, collectionName } = contentTypeItem;
      const length = contentTypeItem?.fullResults?.length;
      if (length === 0) return contentTypeItem;

      return getLocaleItems({
        collection: contentTypeItem,
        isI18nEnabled,
        uid,
        collectionName,
        selectedLocale,
        defaultLocale,
      });
    })
  );

interface IUseStateModel {
  selectedLocale: string;
  setUserEnabledLocales: React.Dispatch<React.SetStateAction<ILocale[]>>;
}

interface IModelState {
  loading?: boolean;
  collections?: IContentType[];
  defaultLocale?: string;
  selectedLocale?: string;
  localeCollections?: IContentType[];
  localeSingles?: IContentType[];
  error?: null;
  collectionTypes?: IPlugin[];
}

const useModelsState = ({
  selectedLocale,
  setUserEnabledLocales,
}: IUseStateModel) => {
  const { isI18nPluginInstalled, userEnabledLocales } = useLocaleContext();
  const [state, setState] = useState<IModelState>({
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

      let collections: IContentType[] = [];
      let localeCollections: IContentType[] = [];
      let localeSingles: IContentType[] = [];

      const defaultLocale = await getDefaultLocale(userEnabledLocales);

      const { collectionTypes, singleTypes } = await getContentTypes();

      if (isValidLength(collectionTypes)) {
        collections = await getItems(collectionTypes, request);
        localeCollections = (
          await getContentTypeLocaleItems(collections, {
            defaultLocale,
            selectedLocale,
          })
        ).filter(Boolean);
      }

      if (isValidLength(singleTypes)) {
        const singles = await getItems(singleTypes, request);
        localeSingles = (
          await getContentTypeLocaleItems(singles, {
            defaultLocale,
            selectedLocale,
          })
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
  }, [selectedLocale, isI18nPluginInstalled]);

  useEffect(() => {
    getModels();
  }, [selectedLocale, isI18nPluginInstalled]);

  return state;
};

export default useModelsState;
