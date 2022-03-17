// @ts-ignore
import { request, LoadingIndicatorPage } from '@strapi/helper-plugin';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  FC,
} from 'react';

import getDefaultLocale from '../../utils/getDefaultLocale';
import getContentTypes from '../../utils/getContentTypes';
import { ILocale } from '../../interfaces/Locales';
import ROUTES from '../../utils/routes';
import { ILocaleContext } from '../../interfaces/LocaleContext';
import isI18nStrapiPluginInstalled from '../../utils/isI18nStrapiPluginInstalled';

export const LocaleContext = createContext<ILocaleContext>({
  isI18nPluginInstalled: false,
  userEnabledLocales: [],
  defaultLocale: '',
});

export const useLocaleContext = (): ILocaleContext => useContext(LocaleContext);

const LocalContextProvider: FC = ({ children }) => {
  const [isI18nPluginInstalled, setIsI18nPluginInstalled] = useState(false);
  const [userEnabledLocales, setUserEnabledLocales] = useState<ILocale[]>([]);
  const [defaultLocale, setDefaultLocale] = useState('');
  const [loaded, setLoaded] = useState(false);

  const contextValue = useMemo(
    () => ({
      isI18nPluginInstalled,
      userEnabledLocales,
      defaultLocale,
    }),
    [isI18nPluginInstalled, userEnabledLocales, defaultLocale]
  );

  useEffect(() => {
    const fetchUserEnabledLocales = async (isI18nPluginAvailable: boolean) => {
      if (isI18nPluginAvailable) {
        const userEnabledLocalesData: ILocale[] = await request(
          ROUTES.I18N_LOCALES
        );
        const defLocale = await getDefaultLocale(userEnabledLocalesData);

        setDefaultLocale(defLocale);
        setUserEnabledLocales(userEnabledLocalesData);
      }
    };

    const isI18nInstalled = async () => {
      const { plugins } = await getContentTypes();
      const isI18nPluginAvailable = isI18nStrapiPluginInstalled(plugins);

      setIsI18nPluginInstalled(isI18nPluginAvailable);
      await fetchUserEnabledLocales(isI18nPluginAvailable);
      setLoaded(true);
    };
    isI18nInstalled();
  }, []);

  // Ensure we checked the locale and are ready to render the ui/fetch data
  if (!loaded) {
    return <LoadingIndicatorPage />;
  }

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocalContextProvider;
