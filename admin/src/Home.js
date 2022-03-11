import React, { useState, useCallback } from "react";
import { ErrorFallback, LoadingIndicatorPage } from "strapi-helper-plugin";
import styled from "styled-components";

import TranslationPicker from "./components/TranslationPicker/TranslationPicker";
import ContentTypesList from "./components/ContentTypesList/ContentTypesList";
import isValidLength from "./utils/isValidLength";
import useModelsState from "./useModelsState";
import { useLocaleContext } from "./containers/LocaleContextProvider/LocaleContextProvider";
import { BoxColumn, Column } from "./components/ui/common";
import useCollectionTypeSettings from "./hooks/useCollectionTypeSettings";

const HomeContainer = styled(Column)`
  padding: 18px 30px 66px;
  padding-bottom: 5rem;
`;

const Home = () => {
  const [userEnabledLocales, setUserEnabledLocales] = useState([{}]);
  const settings = useCollectionTypeSettings();
  const localeContext = useLocaleContext();
  const { isI18nPluginInstalled } = localeContext;
  const [selectedLocale, setSelectedLocale] = useState(
    localeContext.isI18nPluginInstalled ? localeContext.defaultLocale : ""
  );

  const state = useModelsState({
    selectedLocale,
    setUserEnabledLocales,
  });

  const handleTranslation = useCallback((selectedValue) => {
    setSelectedLocale(selectedValue);
  }, []);

  if (state?.error) {
    return (
      <HomeContainer>
        <BoxColumn>
          <ErrorFallback error={state.error} />
        </BoxColumn>
      </HomeContainer>
    );
  }
  if (!state || state.loading || !settings) {
    return <LoadingIndicatorPage />;
  }
  if (isI18nPluginInstalled && !userEnabledLocales) {
    return <LoadingIndicatorPage />;
  }

  return (
    <HomeContainer>
      {!!isI18nPluginInstalled && (
        <TranslationPicker
          handleTranslation={handleTranslation}
          value={selectedLocale}
        />
      )}
      <Column>
        {state.localeSingles && isValidLength(state.localeSingles) ? (
          <ContentTypesList
            content={state.localeSingles}
            defaultLocale={state.defaultLocale}
            settings={settings}
            userEnabledLocales={
              localeContext.userEnabledLocales || userEnabledLocales
            }
            isSingleType
          />
        ) : null}
        {state.localeCollections && isValidLength(state.localeCollections) ? (
          <ContentTypesList
            settings={settings}
            content={state.localeCollections}
            defaultLocale={state.defaultLocale}
            userEnabledLocales={
              localeContext.userEnabledLocales || userEnabledLocales
            }
          />
        ) : null}
      </Column>
    </HomeContainer>
  );
};
export default Home;
