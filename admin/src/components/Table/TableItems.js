import React, { useCallback } from "react";

import pluginId from "../../pluginId";
import getDate from "../../utils/getDate";
import CheckMark from "../../ui/Svgs/Check";
import Cross from "../../ui/Svgs/Cross";
import getLocaleName from "../../utils/getLocaleName";
import TableActions from "./TableActions";
import { Ellipsis } from "../ui/common";
import styled from "styled-components";
import { ItemRow } from "./Table.styles";

const Td = styled.td`
  height: 53px;
  font-size: 1.3rem;
  line-height: 1.8rem;
  font-weight: 400;
  color: rgb(51, 55, 64);
  vertical-align: middle;
  border-collapse: collapse;
  border-top: 1px solid rgb(241, 241, 242);
  padding: 0rem 1.5625rem;
`;

const checkSeoExists = (item) => !!item?.seo?.seoName;

const TableItems = ({
  paginatedData,
  userEnabledLocales,
  uid,
  history,
  defaultLocale,
  isSingleType,
}) => {
  const handleEditSeo = useCallback(
    (e, item) => {
      const locale = item.seo?.locale || item?.locale || defaultLocale;

      if (!e.target.href) {
        e.preventDefault();

        history.push({
          pathname: `/plugins/${pluginId}/${
            isSingleType ? item?.uid : uid
          }/details/${locale}/${item.seo?.seoName || "newSeo"}/${item.id}`,
        });
      }
    },
    [isSingleType, uid, history, defaultLocale]
  );
  return paginatedData().map((item, index) => {
    const { title, id, locale, updated_at, created_at } = item;
    const doesSeoExist = checkSeoExists(item);

    let createdAt = created_at ? getDate(created_at) : null;
    let updatedAt = updated_at ? getDate(updated_at) : null;

    const localeName = locale
      ? getLocaleName(userEnabledLocales, locale)
      : getLocaleName(userEnabledLocales, defaultLocale);

    return (
      <ItemRow key={`${id}-${item.uid}`} data-testid="collection-item">
        <Td>{id}</Td>
        <Td>
          <Ellipsis>{title}</Ellipsis>
        </Td>
        <Td>
          <Ellipsis>{createdAt}</Ellipsis>
        </Td>
        <Td>
          <Ellipsis>{updatedAt}</Ellipsis>
        </Td>
        <Td>
          <Ellipsis>{localeName}</Ellipsis>
        </Td>
        <Td>{doesSeoExist ? <CheckMark /> : <Cross />}</Td>
        <Td>
          <TableActions
            handleEdit={(e) => handleEditSeo(e, item)}
            index={index}
          />
        </Td>
      </ItemRow>
    );
  });
};

export default TableItems;
