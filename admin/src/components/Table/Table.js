import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import TableFilter from "./TableFilter";
import { useHistory } from "react-router-dom";
import { capitalize } from "lodash";
import { GlobalPagination } from "strapi-helper-plugin";
import usePaginationState from "../../hooks/usePaginationState";
import styled from "styled-components";
import TableItems from "./TableItems";
import { Ellipsis } from "../ui/common";
import { Cell, HeadingCell, TableComponent, Thead } from "./Table.styles";
import { fetchData } from "../../hooks/useContentTypeFilter";

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
  min-height: 58.5rem;
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

const handleSingleTypeFilter = async ({
  filterValue,
  mainField,
  apiId,
  collectionName,
  selectedLocale,
  setFilteredItems,
  setIsNotFound,
}) => {
  if (!filterValue) return;

  try {
    const filter = filterValue;
    const data = await fetchData({
      mainField,
      apiId,
      filter,
      collectionName,
      selectedLocale,
    });

    if (data.length == 0) {
      throw new Error("Not Found.");
    }

    setFilteredItems([data]);
    setIsNotFound(false);
  } catch (e) {
    setIsNotFound(true);
    console.error(e);
  }
};

const handleFilter = async ({
  filterValue,
  mainField,
  apiId,
  collectionName,
  selectedLocale,
  setFilteredItems,
  setIsNotFound,
}) => {
  console.log(filterValue, mainField, apiId, collectionName, selectedLocale);
  if (!filterValue) return;

  try {
    const filter = filterValue;
    const data = await fetchData({
      mainField,
      apiId,
      filter,
      collectionName,
      selectedLocale,
    });

    if (data.length == 0) {
      throw new Error("Not Found.");
    }

    setFilteredItems([data]);
    setIsNotFound(false);
  } catch (e) {
    setIsNotFound(true);
    console.error(e);
  }
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
  start,
  setStart,
  collectionName,
  pagination,
  apiId,
  selectedLocale,
}) => {
  const [collectionTypeName] = useState(capitalize(collectionName));
  const [filteredItems, setFilteredItems] = useState(items.fullResults);
  const [isNotFound, setIsNotFound] = useState(false);
  const { total, pageSize, pageCount } = pagination;

  const { page, setPage } = usePaginationState({
    currentCount: filteredItems?.length,
  });

  const pageRef = useRef(page);
  const pageRefVal = pageRef.current;
  const [filterValue, setFilterValue] = useState("false");
  const history = useHistory();

  const updateTableFilter = useCallback(
    (value) => {
      setFilterValue(value);
      setPage(1);
    },
    [items.fullResults, setPage]
  );

  const handleParamsChange = useCallback(
    ({ target }) => {
      const { name, value } = target;

      const handleIncrement = () => {
        let increment = 0;

        if (pageRefVal < value) {
          increment = limit + start;
        }
        if (pageRefVal > value) {
          increment = start - limit;
        }

        return increment;
      };

      if (name === "params._page") {
        const increment = handleIncrement();
        const newStart = increment > 0 ? Math.round(increment) : 0;

        pageRef.current = value;
        setStart(newStart);
        setPage(value);
      }
    },
    [setPage, pageRef.current]
  );

  useEffect(() => {
    setFilterValue("");
    setFilteredItems(items.fullResults);
  }, [items.fullResults]);

  const getPaginatedData = useCallback(() => {
    return filteredItems;
  }, [pageRefVal, filteredItems]);

  return (
    <Container>
      <h2>{collectionTypeName}</h2>
      <EntryCount>{`${total} ${
        total > 1 || total === 0 ? "entries" : "entry"
      } found`}</EntryCount>
      <TableFilter
        updateTableFilter={updateTableFilter}
        filterValue={filterValue}
        items={items}
        pageRef={pageRef}
        setStart={setStart}
        isSingleType={isSingleType}
        handleFilter={() =>
          handleFilter({
            filterValue,
            mainField,
            apiId,
            collectionName,
            selectedLocale,
            setFilteredItems,
            setIsNotFound,
          })
        }
        handleSingleTypeFilter={handleSingleTypeFilter}
        setIsNotFound={setIsNotFound}
        setFilteredItems={() => setFilteredItems(items.fullResults)}
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
              isNotFound={isNotFound}
              collectionTypeName={collectionTypeName}
            />
          </tbody>
        </TableComponent>
      </TableWrap>
      {isNotFound
        ? null
        : pageCount > 1 && (
            <TableFooter>
              <GlobalPagination
                onChangeParams={handleParamsChange}
                params={{
                  _page: pageRefVal,
                  _limit: pageSize,
                }}
                count={total}
              />
            </TableFooter>
          )}
    </Container>
  );
};

export default Table;
