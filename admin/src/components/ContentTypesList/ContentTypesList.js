import React, { useMemo } from "react";

import styled from "styled-components";
import Table from "../Table/Table";
import isValidLength from "../../utils/isValidLength";
import { useContentTypeSettingsContext } from "../../containers/ContentTypeSettingsContext";
import getPageCount from "../../utils/getPageCount";

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
        />
      ) : (
        <CollectionTypesListItems
          projectCollectionTypes={content}
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
  limit,
  setLimit,
  start,
  setStart,
}) => {
  const paginationTotal = projectCollectionTypes.length;
  const pageSize = 10;
  const pageCount = getPageCount(paginationTotal, pageSize);
  const pagination = { total: paginationTotal, pageCount, pageSize };

  const parsedData = useMemo(() => {
    const results = projectCollectionTypes.flatMap((singleType) => {
      console.log("inside", singleType);
      const fullResults = singleType.fullResults;
      if (!isValidLength(fullResults)) {
        return [];
      }
      return fullResults.map((result) => ({
        ...singleType,
        ...result,
        title: singleType.title || result[singleType.mainField],
        uid: singleType.uid,
      }));
    });

    return { fullResults: results };
  }, [projectCollectionTypes]);

  if (!parsedData || !isValidLength(parsedData.fullResults)) {
    return null;
  }

  console.log("projectCollectionTypes", projectCollectionTypes);
  console.log("parsedData", parsedData);
  // return null;
  return (
    <ListElement>
      {userEnabledLocales ? (
        <Table
          collectionName={"Single Types"}
          items={parsedData}
          userEnabledLocales={userEnabledLocales}
          uid={"placeholder"}
          defaultLocale={defaultLocale}
          isSingleType={isSingleType}
          pagination={pagination}
          limit={limit}
          setLimit={setLimit}
          start={start}
          setStart={setStart}
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
  defaultLocale,
}) => {
  const settings = useContentTypeSettingsContext();
  const setting = settings[uid];
  const itemsWithTitle = useMemo(() => {
    if (!setting?.settings?.mainField) {
      return items;
    }
    return {
      ...items,
      fullResults: items.fullResults.map((item) => ({
        ...item,
        title: item.title || item[setting?.settings?.mainField],
      })),
    };
  }, [setting, items]);

  return (
    <ListElement>
      {length > 0 && userEnabledLocales ? (
        <Table
          seos={itemsWithTitle}
          mainField={setting?.settings?.mainField}
          userEnabledLocales={userEnabledLocales}
          uid={uid}
          defaultLocale={defaultLocale}
        />
      ) : null}
    </ListElement>
  );
};

export const CollectionTypesListItems = ({
  projectCollectionTypes,
  defaultLocale,
  userEnabledLocales,
}) => {
  return (
    <>
      {projectCollectionTypes.map((items) => {
        const { uid } = items;
        const length = items?.fullResults?.length;

        if (!items) {
          return null;
        }
        return (
          <CollectionTypesListItem
            key={uid}
            uid={uid}
            length={length}
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
