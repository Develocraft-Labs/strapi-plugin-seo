import React, { useState, useCallback } from "react";
import { ErrorFallback, LoadingIndicatorPage } from "strapi-helper-plugin";
import styled from "styled-components";

import TranslationPicker from "./components/TranslationPicker/TranslationPicker";
import useModelsState from "./useModelsState";
import { useLocaleContext } from "./containers/LocaleContextProvider/LocaleContextProvider";
import { BoxColumn, Column } from "./components/ui/common";

import useContentTypes from "./hooks/useContentTypes";
import ContentTypesList from "./components/ContentTypesList/ContentTypesList";

const HomeContainer = styled(Column)`
  padding: 18px 30px 66px;
  padding-bottom: 5rem;
`;

const Home = () => {
  const [userEnabledLocales, setUserEnabledLocales] = useState([{}]);
  const localeContext = useLocaleContext();
  const { isI18nPluginInstalled } = localeContext;
  const [selectedLocale, setSelectedLocale] = useState(
    localeContext.isI18nPluginInstalled ? localeContext.defaultLocale : ""
  );

  const contentTypesData = useContentTypes();
  const contentTypes = contentTypesData.contentTypes;

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
  if (!state || state.loading) {
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
        <ContentTypesList
          defaultLocale={state.defaultLocale}
          userEnabledLocales={
            localeContext.userEnabledLocales || userEnabledLocales
          }
          contentTypes={contentTypes}
          selectedLocale={selectedLocale}
          localeSingles={state.localeSingles}
        />
      </Column>
    </HomeContainer>
  );
};
export default Home;
