import React from "react";
import styled from "styled-components";

import { useLocaleContext } from "../../containers/LocaleContextProvider/LocaleContextProvider";
import isValidLength from "../../utils/isValidLength";
import CollectionTypesTable, {
  SingleContentTypesTable,
} from "../ContentTypeTable/ContentTypeTable";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0rem;
`;

/**
 * Component that renders a Content types in Strapi Project.
 * @returns {JSX.Element} List of either Single Types, Collection Types or both.
 */
const ContentTypesList = ({
  defaultLocale,
  userEnabledLocales,
  contentTypes,
  selectedLocale,
  localeSingles,
}) => {
  const localeContext = useLocaleContext();
  const { isI18nPluginInstalled } = localeContext;

  return (
    <List data-testid="content-types-list">
      <SingleContentTypesTable
        singleTypesData={localeSingles}
        userEnabledLocales={userEnabledLocales}
        defaultLocale={defaultLocale}
        selectedLocale={selectedLocale}
        singleTypes={contentTypes.singleTypes}
      />
      {contentTypes.collectionTypes &&
        isValidLength(contentTypes.collectionTypes) &&
        contentTypes.collectionTypes.map((type, index) => (
          <CollectionTypesTable
            key={type?.apiId + type?.uid + index}
            type={type}
            userEnabledLocales={userEnabledLocales}
            defaultLocale={defaultLocale}
            selectedLocale={selectedLocale}
            isI18nPluginInstalled={isI18nPluginInstalled}
          />
        ))}
    </List>
  );
};

export default ContentTypesList;
