import React, { createContext, useContext, useEffect, useState } from "react";
import { LoadingIndicatorPage, request } from "strapi-helper-plugin";
import getDefaultLocale from "../../utils/getDefaultLocale";
import getPlugins from "../../utils/getPlugins";

export const LocaleContext = createContext();

export const useLocaleContext = () => useContext(LocaleContext);

const LocaleContextProvider = ({ children }) => {
  const [isI18nPluginInstalled, setIsI18nPluginInstalled] = useState(null);
  const [userEnabledLocales, setUserEnabledLocales] = useState(null);
  const [defaultLocale, setDefaultLocale] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const contextValue = {
    isI18nPluginInstalled,
    userEnabledLocales,
    defaultLocale,
  };

  useEffect(() => {
    const fetchUserEnabledLocales = async (isI18nPluginAvailable) => {
      if (isI18nPluginAvailable) {
        const userEnabledLocales = await request("/i18n/locales");
        const defLocale = await getDefaultLocale(userEnabledLocales);
        setDefaultLocale(defLocale);
        setUserEnabledLocales(userEnabledLocales);
      }
    };

    const isI18nInstalled = async () => {
      const { isI18nPluginAvailable } = await getPlugins();
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

export default LocaleContextProvider;
