import React, { useState, useCallback, FC } from 'react';
// @ts-ignore
import { ErrorFallback, LoadingIndicatorPage } from '@strapi/helper-plugin';

import TranslationPicker from './components/TranslationPicker/TranslationPicker';
import { useLocaleContext } from './containers/LocaleContextProvider/LocaleContextProvider';
import { ILocale } from './interfaces/Locales';
import useModelsState from './hooks/useModelsState';

const Home: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userEnabledLocales, setUserEnabledLocales] = useState<ILocale>();
  const localeContext = useLocaleContext();
  const { isI18nPluginInstalled } = localeContext;
  const [selectedLocale, setSelectedLocale] = useState(
    localeContext.isI18nPluginInstalled ? localeContext.defaultLocale : ''
  );

  const state = useModelsState({ selectedLocale, setUserEnabledLocales });

  const handleTranslation = useCallback((selectedValue: string) => {
    setSelectedLocale(selectedValue);
  }, []);

  if (state?.error) {
    return <ErrorFallback error={state.error} />;
  }

  if (!state || state.loading) {
    return <LoadingIndicatorPage />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!!isI18nPluginInstalled && (
        <TranslationPicker
          handleTranslation={handleTranslation}
          value={selectedLocale}
        />
      )}
    </>
  );
};

export default Home;
