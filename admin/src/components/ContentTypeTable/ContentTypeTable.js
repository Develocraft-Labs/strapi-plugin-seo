import React, { useMemo, useState } from "react";

import styled from "styled-components";
import Table from "../Table/Table";
// import isValidLength from "../utils/isValidLength";
import { useContentTypeSettingsContext } from "../../containers/ContentTypeSettingsContext";
import { useLocaleContext } from "../../containers/LocaleContextProvider/LocaleContextProvider";
import useContentTypeData from "../../hooks/useContentTypeData";
import { SingleTypesListItems } from "../ContentTypesList/ContentTypesList";
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

export const SingleContentTypesTable = ({
  userEnabledLocales,
  defaultLocale,
  selectedLocale,
  singleTypesData,
}) => {
  const localeContext = useLocaleContext();
  const { isI18nPluginInstalled } = localeContext;

  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  if (!isValidLength(singleTypesData)) {
    return null;
  }
  const { locale } = singleTypesData[0];

  if (isI18nPluginInstalled && selectedLocale === locale) {
    return (
      <List>
        <SingleTypesListItems
          projectCollectionTypes={singleTypesData}
          defaultLocale={defaultLocale}
          userEnabledLocales={userEnabledLocales}
          isSingleType={true}
          limit={limit}
          setLimit={setLimit}
          start={start}
          setStart={setStart}
        />
      </List>
    );
  }

  if (!isI18nPluginInstalled && isValidLength(singleTypesData)) {
    return (
      <List>
        <SingleTypesListItems
          projectCollectionTypes={singleTypesData}
          defaultLocale={defaultLocale}
          userEnabledLocales={userEnabledLocales}
          isSingleType={true}
          limit={limit}
          setLimit={setLimit}
          start={start}
          setStart={setStart}
        />
      </List>
    );
  }

  return null;
};

const ContentTypeTable = ({
  type,
  userEnabledLocales,
  defaultLocale,
  selectedLocale,
}) => {
  const localeContext = useLocaleContext();
  const { isI18nPluginInstalled } = localeContext;
  const { uid, apiId } = type;
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  const settings = useContentTypeSettingsContext();
  const setting = settings[uid]?.settings;
  const mainField = setting?.mainField;

  const { data, collectionName, locale, pagination } = useContentTypeData({
    type,
    selectedLocale,
    limit,
    start,
  });

  if (isI18nPluginInstalled && selectedLocale === locale) {
    if (data && data.length > 0)
      return (
        <CollectionTypesListItem
          uid={uid}
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
          apiId={apiId}
          selectedLocale={selectedLocale}
        />
      );
  }

  if (!isI18nPluginInstalled && data && data.length > 0) {
    return (
      <CollectionTypesListItem
        uid={uid}
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
        apiId={apiId}
        selectedLocale={selectedLocale}
      />
    );
  }

  return null;
};

export default ContentTypeTable;
