import React from "react";

import pluginId from "../../pluginId";
import getDate from "../../utils/getDate";
import CheckMark from "../../ui/Svgs/Check";
import Cross from "../../ui/Svgs/Cross";
import getLocaleName from "../../utils/getLocaleName";
import TableActions, { TableActionsWrap } from "./TableActions";
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

const checkSeoExists = (item) => !!item?.seo?.seoUid;

const TableItems = ({
  paginatedData,
  userEnabledLocales,
  uid,
  defaultLocale,
  isSingleType,
}) => {
  return paginatedData().map((item, index) => {
    const { title, id, updated_at, created_at } = item;
    const doesSeoExist = checkSeoExists(item);
    const isExternalSeo = item?.seo && !doesSeoExist;
    const createdAt = created_at ? getDate(created_at) : null;
    const updatedAt = updated_at ? getDate(updated_at) : null;
    const locale = item?.seo?.locale || item?.locale || defaultLocale;
    const localeName = getLocaleName(userEnabledLocales, locale);
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
          {isExternalSeo && (
            <TableActionsWrap>
              <i>External seo</i>
            </TableActionsWrap>
          )}
          {!isExternalSeo && (
            <TableActions
              editPath={`/plugins/${pluginId}/${
                isSingleType ? item?.uid : uid
              }/details/${locale}/${item.seo?.seoUid || "newSeo"}/${item.id}`}
              index={index}
            />
          )}
        </Td>
      </ItemRow>
    );
  });
};

export default TableItems;
