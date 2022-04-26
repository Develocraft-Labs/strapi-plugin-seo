import React, { useCallback, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { GlobalPagination } from "strapi-helper-plugin";
import usePaginationState from "../../hooks/usePaginationState";
import TableItems from "./TableItems";
import { TableComponent, Thead } from "./Table.styles";
import {
  Container,
  TableFooter,
  TableWrap,
  EntryCount,
  TableHeader,
} from "./Table";

/**
 * Component that renders Table.
 * @returns {JSX.Element} Table.
 */
const Table = ({
  items,
  userEnabledLocales,
  uid,
  defaultLocale,
  isSingleType,
  mainField,
}) => {
  const [collectionTypeName] = useState("Single types");
  const [filteredSeos, setFilteredSeos] = useState(items.fullResults);

  const { page, pageSize, count, pageCount, setPage } = usePaginationState({
    currentCount: filteredSeos?.length,
  });

  const history = useHistory();

  const handleParamsChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      if (name === "params._page") {
        setPage(value);
      }
    },
    [setPage]
  );

  useEffect(() => {
    setFilteredSeos(items.fullResults);
    setPage(1);
  }, [items.fullResults]);

  const getPaginatedData = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredSeos.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <h2>{collectionTypeName}</h2>
      <EntryCount>{`${count} ${
        count > 1 || count === 0 ? "entries" : "entry"
      } found`}</EntryCount>

      <TableWrap>
        <TableComponent>
          <Thead>
            <TableHeader mainField={mainField} />
          </Thead>
          <tbody>
            <TableItems
              paginatedData={getPaginatedData}
              userEnabledLocales={userEnabledLocales}
              uid={uid}
              history={history}
              defaultLocale={defaultLocale}
              isSingleType={isSingleType}
            />
          </tbody>
        </TableComponent>
      </TableWrap>
      {pageCount > 1 && (
        <TableFooter>
          <GlobalPagination
            onChangeParams={handleParamsChange}
            params={{
              _page: page,
              _limit: pageSize,
            }}
            count={count}
          />
        </TableFooter>
      )}
    </Container>
  );
};

export default Table;
