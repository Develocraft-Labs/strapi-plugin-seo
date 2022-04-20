import React, { useCallback, useState } from "react";
import TextField from "../../ui/Inputs/TextField";
import ArrowUp from "../../ui/Svgs/ArrowUp";
import styled from "styled-components";
import { Row } from "../ui/common";
import ApplyButton from "../ui/ApplyButton";

const HideFilterButton = styled.button`
  width: fit-content;
  padding: 0.3rem 0.7rem;
  align-self: flex-end;
  margin: 1rem 0rem;
  color: rgb(195, 197, 200);
  font-size: 13px;
`;

const FilterButton = styled.button`
  width: fit-content;
  padding: 0.3rem 0.7rem;
  align-self: flex-start;
  margin: 1.8rem 0rem 1rem 0rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(227, 233, 243);
  border-radius: 2px;
  font-weight: 500;
  font-size: 13px;
`;

const FilterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0rem;
  padding-top: 1.5rem;
`;

export const FilterActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const ClearAllButton = styled.button`
  height: 3rem;
  line-height: 25px;
  margin-right: 0;
  font-size: 13px;
  font-family: Lato;
  position: relative;
  min-width: 10rem;
  color: #919bae;
  border: 0.1rem solid #e3e9f3;
  border-radius: 3px;
  margin-right: 1rem;
  max-width: 100%;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

const TableFilter = ({
  updateTableFilter,
  filterValue,
  handleFilter,
  handleSingleTypeFilter,
  isSingleType,
  setFilteredItems,
  pageRef,
  setStart,
  setIsNotFound,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterButton = useCallback(() => {
    setShowFilter((v) => !v);
    updateTableFilter("");
  }, [updateTableFilter]);

  const handleClearAllButton = useCallback(() => {
    handleFilterButton();
    setFilteredItems();
    setStart(0);
    setIsNotFound(false);
    pageRef.current = 1;
  }, []);

  const handleContentTypeFilters = useCallback(() => {
    if (isSingleType) {
      handleSingleTypeFilter();
    }
    handleFilter();
  });

  const button = (
    <FilterButton onClick={handleFilterButton}>Filter</FilterButton>
  );

  const handleTableFilter = useCallback(
    (e) => {
      if (e.target.name !== "table filter") {
        return;
      }

      updateTableFilter(e.target.value);
    },
    [updateTableFilter]
  );

  if (!showFilter) {
    return button;
  }

  return (
    <>
      <FilterRow>
        <FilterActionsContainer>
          <ClearAllButton onClick={handleClearAllButton}>
            Clear all
          </ClearAllButton>
          <ApplyButton onClick={handleContentTypeFilters}>Apply</ApplyButton>
        </FilterActionsContainer>
      </FilterRow>
      <FilterRow>
        <TextField
          onChange={handleTableFilter}
          name="table filter"
          value={filterValue}
          placeHolder="Title"
          inputWrapperStyles={{
            backgroundColor: "transparent",
            width: "20%",
            alignSelf: "flex-start",
            paddingBottom: "0rem",
            paddingTop: "0rem",
          }}
        />

        <HideFilterButton onClick={handleFilterButton}>
          Hide
          <ArrowUp />
        </HideFilterButton>
      </FilterRow>
      {button}
    </>
  );
};

export default TableFilter;
