import React, { useState, useCallback } from "react";
import { ErrorFallback, LoadingIndicatorPage } from "strapi-helper-plugin";
import styled from "styled-components";

// import { ROUTES } from "./utils/routes";
// import useContentTypes from "./hooks/useContentTypes";
import TranslationPicker from "./components/TranslationPicker/TranslationPicker";
import isValidLength from "./utils/isValidLength";
import useModelsState from "./useModelsState";
import { useLocaleContext } from "./containers/LocaleContextProvider/LocaleContextProvider";
import { BoxColumn, Column } from "./components/ui/common";

import useContentTypes from "./hooks/useContentTypes";
import ContentTypeTable, {
  SingleContentTypesTable,
} from "./components/ContentTypeTable/ContentTypeTable";
import useSingleContentTypeData from "./hooks/useSingleContentTypeData";

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
  const [limit, setLimit] = useState(10);

  const contentTypes = useContentTypes();
  console.log("contentTypes", contentTypes);

  const singleTypesData = useSingleContentTypeData({
    contentTypes,
    selectedLocale,
    limit,
  });
  console.log("singleTypesData", singleTypesData);

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
        {contentTypes?.singleTypes &&
          isValidLength(contentTypes.singleTypes) && (
            <SingleContentTypesTable
              singleTypesData={singleTypesData}
              key={Math.random()}
              userEnabledLocales={
                localeContext.userEnabledLocales || userEnabledLocales
              }
              defaultLocale={state.defaultLocale}
              selectedLocale={selectedLocale}
              singleTypes={contentTypes.singleTypes}
              limit={limit}
              setLimit={setLimit}
            />
          )}
        {contentTypes.collectionTypes &&
          isValidLength(contentTypes.collectionTypes) &&
          contentTypes.collectionTypes.map((type, index) => (
            <ContentTypeTable
              key={type?.apiId + type?.uid + index}
              type={type}
              userEnabledLocales={
                localeContext.userEnabledLocales || userEnabledLocales
              }
              defaultLocale={state.defaultLocale}
              selectedLocale={selectedLocale}
            />
          ))}
      </Column>
    </HomeContainer>
  );
};
export default Home;
