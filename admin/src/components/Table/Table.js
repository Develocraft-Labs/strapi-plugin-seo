import React, { useCallback, useState, useEffect } from "react";

import TableFilter from "./TableFilter";
import { useHistory } from "react-router-dom";
import { capitalize } from "lodash";
import { GlobalPagination } from "strapi-helper-plugin";
import usePaginationState from "../../hooks/usePaginationState";
import styled from "styled-components";
import TableItems from "./TableItems";
import { Ellipsis } from "../ui/common";
import { Cell, HeadingCell, TableComponent, Thead } from "./Table.styles";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableFooter = styled.div`
  width: fit-content;
  padding: 2rem 0rem 0rem 0rem;
  align-self: flex-end;
`;

const TableWrap = styled.div`
  min-height: 32rem;
  padding: 0rem;
`;

const EntryCount = styled.p`
  width: 100%;
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: normal;
  color: rgb(120, 126, 143);
`;

const header = [
  "Id",
  "Title",
  "Created at",
  "Updated at",
  "Content avaliable in",
  "State",
  " ",
];

const TableHeader = () => {
  return (
    <Cell>
      {header.map((heading, index) => {
        return (
          <HeadingCell key={index}>
            <Ellipsis>{heading}</Ellipsis>
          </HeadingCell>
        );
      })}
    </Cell>
  );
};

/**
 * Component that renders Table.
 * @returns {JSX.Element} Table.
 */
const Table = ({
  seos,
  userEnabledLocales,
  uid,
  defaultLocale,
  isSingleType,
}) => {
  const [collectionTypeName] = useState(capitalize(seos.collectionName));
  const [filteredSeos, setFilteredSeos] = useState(seos.fullResults);

  const { page, pageSize, count, pageCount, setPage } = usePaginationState({
    currentCount: filteredSeos?.length,
  });

  const [filterValue, setFilterValue] = useState("");
  const history = useHistory();

  const updateTableFilter = useCallback(
    (value) => {
      setFilterValue(value);
      setPage(1);
      const filteredSeos = seos.fullResults.filter((seo) => {
        if (!seo.title) return seo;
        return seo.title.toLowerCase().includes(value.toLowerCase());
      });

      setFilteredSeos(filteredSeos);
    },
    [seos.fullResults, setPage]
  );

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
    setFilterValue("");
    setFilteredSeos(seos.fullResults);
    setPage(1);
  }, [seos.fullResults]);

  const getPaginatedData = () => {
    // Start from 0
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
      <TableFilter
        updateTableFilter={updateTableFilter}
        filterValue={filterValue}
      />

      <TableWrap>
        <TableComponent>
          <Thead>
            <TableHeader />
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
