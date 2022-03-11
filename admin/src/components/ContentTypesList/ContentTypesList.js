import React, { useMemo } from "react";

import styled from "styled-components";
import Table from "../Table/Table";
import isValidLength from "../../utils/isValidLength";

const ListElement = styled.li`
  list-style: none;
  padding: 0rem 0rem 2rem 0rem;
`;

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
  content,
  defaultLocale,
  userEnabledLocales,
  isSingleType,
  settings,
}) => {
  if (!isValidLength(content)) {
    return null;
  }
  return (
    <List data-testid="content-types-list">
      {isSingleType ? (
        <SingleTypesListItems
          projectCollectionTypes={content}
          defaultLocale={defaultLocale}
          userEnabledLocales={userEnabledLocales}
          isSingleType={isSingleType}
          settings={settings}
        />
      ) : (
        <CollectionTypesListItems
          projectCollectionTypes={content}
          settings={settings}
          defaultLocale={defaultLocale}
          userEnabledLocales={userEnabledLocales}
        />
      )}
    </List>
  );
};

export const SingleTypesListItems = ({
  projectCollectionTypes,
  defaultLocale,
  userEnabledLocales,
  isSingleType,
  settings,
}) => {
  const parsedData = useMemo(() => {
    const results = projectCollectionTypes.flatMap((singleType) => {
      const fullResults = singleType.fullResults;
      const setting = settings.find?.(
        (setting) => setting.uid === singleType.uid
      );
      if (!isValidLength(fullResults)) {
        return [];
      }
      return fullResults.map((result) => ({
        ...result,
        title: singleType.title || result[setting?.settings?.mainField],
        uid: singleType.uid,
      }));
    });
    return { fullResults: results, collectionName: "Single Types" };
  }, [projectCollectionTypes]);

  if (!parsedData || !isValidLength(parsedData.fullResults)) {
    return null;
  }

  return (
    <ListElement>
      {userEnabledLocales ? (
        <Table
          seos={parsedData}
          userEnabledLocales={userEnabledLocales}
          uid={"placeholder"}
          defaultLocale={defaultLocale}
          isSingleType={isSingleType}
        />
      ) : null}
    </ListElement>
  );
};

const CollectionTypesListItem = ({
  uid,
  length,
  userEnabledLocales,
  items,
  mainField,
  defaultLocale,
}) => {
  return (
    <ListElement>
      {length > 0 && userEnabledLocales ? (
        <Table
          seos={items}
          mainField={mainField}
          userEnabledLocales={userEnabledLocales}
          uid={uid}
          defaultLocale={defaultLocale}
        />
      ) : null}
    </ListElement>
  );
};

const CollectionTypesListItems = ({
  projectCollectionTypes,
  defaultLocale,
  userEnabledLocales,
  settings,
}) => {
  return (
    <>
      {projectCollectionTypes.map((items) => {
        const { uid } = items;
        const setting = settings.find?.((setting) => setting.uid === uid);
        const length = items?.fullResults?.length;
        if (!items) {
          return null;
        }
        return (
          <CollectionTypesListItem
            key={uid}
            uid={uid}
            length={length}
            mainField={setting?.settings?.mainField}
            userEnabledLocales={userEnabledLocales}
            items={items}
            defaultLocale={defaultLocale}
          />
        );
      })}
    </>
  );
};

export default ContentTypesList;
