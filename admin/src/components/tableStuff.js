import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import TableFilter from "./Table/TableFilter";
import { useHistory } from "react-router-dom";
import { capitalize } from "lodash";
import { GlobalPagination } from "strapi-helper-plugin";
import usePaginationState from "../hooks/usePaginationState";
import styled from "styled-components";
import TableItems from "./Table/TableItems";
import { Ellipsis } from "./ui/common";
import { Cell, HeadingCell, TableComponent, Thead } from "./Table/Table.styles";

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

const getHeaders = ({ mainField }) => [
  "Id",
  mainField || "Title",
  "Created at",
  "Updated at",
  "Content avaliable in",
  "State",
  " ",
];

const TableHeader = ({ mainField }) => {
  const headers = useMemo(() => getHeaders({ mainField }), [mainField]);
  return (
    <Cell>
      {headers.map((heading, index) => {
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
  items,
  userEnabledLocales,
  uid,
  defaultLocale,
  isSingleType,
  mainField,
  limit,
  setLimit,
  collectionName,
}) => {
  const [collectionTypeName] = useState(capitalize(collectionName));
  const [filteredItems, setFilteredItems] = useState(items.fullResults);

  const { page, pageSize, count, pageCount, setPage } = usePaginationState({
    currentCount: filteredItems?.length,
  });

  const pageRef = useRef(page);
  const pageRefVal = pageRef.current;
  const [filterValue, setFilterValue] = useState("");
  const history = useHistory();

  const updateTableFilter = useCallback(
    (value) => {
      setFilterValue(value);
      setPage(1);
      const filteredItems = items.fullResults.filter((item) => {
        if (
          !item?.[`${mainField}`] ||
          typeof item?.[`${mainField}`] !== "string"
        )
          return item;

        return item?.[`${mainField}`]
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredItems(filteredItems);
    },
    [items.fullResults, setPage]
  );

  const handleParamsChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      const v = Math.round(limit / 4) - 1;

      if (name === "params._page") {
        setPage(value);
        pageRef.current = value;

        if (value === v) {
          setLimit(limit * 2);
          setPage(v);
          pageRef.current = v;
        }
      }
    },
    [setPage]
  );

  useEffect(() => {
    setFilterValue("");
    setFilteredItems(items.fullResults);
  }, [items.fullResults]);

  const getPaginatedData = useCallback(() => {
    // Start from 0
    const startIndex = (pageRefVal - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredItems.slice(startIndex, endIndex);
  }, [pageRefVal, filteredItems]);

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
              _page: pageRefVal,
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
