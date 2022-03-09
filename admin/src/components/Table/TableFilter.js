import React, { useCallback, useState } from "react";
import TextField from "../../ui/Inputs/TextField";
import ArrowUp from "../../ui/Svgs/ArrowUp";
import styled from "styled-components";
import { Row } from "../ui/common";

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
  justify-content: space-between;
  padding-bottom: 0rem;
  padding-top: 1.5rem;
`;

const TableFilter = ({ updateTableFilter, filterValue }) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterButton = useCallback(() => {
    setShowFilter((v) => !v);
    updateTableFilter("");
  }, [updateTableFilter]);

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
