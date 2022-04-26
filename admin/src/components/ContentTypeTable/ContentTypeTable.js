import React, { useMemo, useState } from "react";
import styled from "styled-components";

import Table from "../Table/Table";
import { useContentTypeSettingsContext } from "../../containers/ContentTypeSettingsContext";
import useContentTypeData from "../../hooks/useContentTypeData";
import isValidLength from "../../utils/isValidLength";

import SingleTypesTable from "../Table/SingleTypesTable";

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

const CollectionTypesListItem = ({
  uid,
  length,
  userEnabledLocales,
  items,
  defaultLocale,
  limit,
  setLimit,
  start,
  setStart,
  collectionName,
  pagination,
  mainField,
  setting,
  apiId,
  selectedLocale,
}) => {
  const itemsWithTitle = useMemo(() => {
    if (!mainField) {
      return items;
    }
    return {
      ...items,
      fullResults: items.map((item) => ({
        ...item,
        title: item.title || item[mainField],
      })),
    };
  }, [setting, items]);

  return (
    <ListElement>
      {length > 0 && userEnabledLocales ? (
        <Table
          items={itemsWithTitle}
          mainField={mainField}
          userEnabledLocales={userEnabledLocales}
          uid={uid}
          defaultLocale={defaultLocale}
          limit={limit}
          setLimit={setLimit}
          start={start}
          setStart={setStart}
          collectionName={collectionName}
          pagination={pagination}
          apiId={apiId}
          selectedLocale={selectedLocale}
        />
      ) : null}
    </ListElement>
  );
};

const SingleTypesListItems = ({
  projectCollectionTypes,
  defaultLocale,
  userEnabledLocales,
  isSingleType,
}) => {
  const settings = useContentTypeSettingsContext();

  const parsedData = useMemo(() => {
    const results = projectCollectionTypes.flatMap((singleType) => {
      const fullResults = singleType.fullResults;
      const setting = settings[singleType.uid];
      const mainField = setting?.settings?.mainField;

      if (!isValidLength(fullResults)) {
        return [];
      }

      return fullResults.map((result) => ({
        ...singleType,
        ...result,
        title: singleType.title || result[mainField],
        uid: singleType.uid,
      }));
    });

    return { fullResults: results };
  }, [projectCollectionTypes]);

  if (!parsedData || !isValidLength(parsedData.fullResults)) {
    return null;
  }

  return (
    <ListElement>
      {userEnabledLocales ? (
        <SingleTypesTable
          collectionName={"Single Types"}
          items={parsedData}
          userEnabledLocales={userEnabledLocales}
          uid={"placeholder"}
          defaultLocale={defaultLocale}
          isSingleType={isSingleType}
        />
      ) : null}
    </ListElement>
  );
};

export const SingleContentTypesTable = ({
  userEnabledLocales,
  defaultLocale,
  singleTypesData,
}) => {
  if (!singleTypesData || !isValidLength(singleTypesData)) {
    return null;
  }

  return (
    <List>
      <SingleTypesListItems
        projectCollectionTypes={singleTypesData}
        defaultLocale={defaultLocale}
        userEnabledLocales={userEnabledLocales}
        isSingleType
      />
    </List>
  );
};

const CollectionTypesTable = ({
  type,
  userEnabledLocales,
  defaultLocale,
  selectedLocale,
}) => {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  const settings = useContentTypeSettingsContext();
  const setting = settings[type?.uid]?.settings;
  const mainField = setting?.mainField;

  const { data, collectionName, pagination } = useContentTypeData({
    type,
    selectedLocale,
    limit,
    start,
  });

  if (!data || !isValidLength(data)) {
    return null;
  }

  return (
    <CollectionTypesListItem
      uid={type?.uid}
      items={data}
      length={data.length}
      userEnabledLocales={userEnabledLocales}
      defaultLocale={defaultLocale}
      limit={limit}
      setLimit={setLimit}
      start={start}
      setStart={setStart}
      collectionName={collectionName}
      pagination={pagination}
      mainField={mainField}
      setting={setting}
      apiId={type?.apiId}
      selectedLocale={selectedLocale}
    />
  );
};

export default CollectionTypesTable;
