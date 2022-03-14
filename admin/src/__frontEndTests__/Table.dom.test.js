/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Table from "../components/Table/Table";
import { tableComponentTestData } from "./testData";
import { MemoryRouter } from "react-router";

// mock GlobalPagination component from strapi-helper-plugin
jest.mock("strapi-helper-plugin", () => {
  const Pagination = jest.fn(({ children }) => children);
  const GlobalPagination = jest.fn((props) => (
    <Pagination
      onChangeParams={props.handleParamsChange}
      params={props.params}
      count={props.count}
    >
      <div>1, 2</div>
    </Pagination>
  ));
  const Input = jest.fn((props) => (
    <input value={props.value} onChange={props.onChange} name={props.name} />
  ));
  const InputText = jest.fn((props) => (
    <Input value={props.value} onChange={props.onChange} name={props.name} />
  ));

  return {
    GlobalPagination: GlobalPagination,
    InputText: InputText,
    validateInput: () => [],
    InputErrors: () => null,
    LoadingIndicatorPage: () => null,
  };
});

jest.mock("../containers/LocaleContextProvider/LocaleContextProvider.js", () =>
  require("../__mocks__/LocaleContextProvider")
);

describe("DOM TESTING TABLE COMPONENT", () => {
  beforeEach(() => {
    const {
      handleDeleteSeo,
      handleEditSeo,
      userEnabledLocales,
      uid,
      defaultLocale,
      seos,
    } = tableComponentTestData;

    render(
      <MemoryRouter>
        <Table
          seos={seos}
          handleDeleteSeo={handleDeleteSeo}
          handleEditSeo={handleEditSeo}
          userEnabledLocales={userEnabledLocales}
          uid={uid}
          defaultLocale={defaultLocale}
        />
      </MemoryRouter>
    );
  });
  it("Should Render Successfully", () => {
    const {
      handleDeleteSeo,
      handleEditSeo,
      userEnabledLocales,
      uid,
      defaultLocale,
      seos,
    } = tableComponentTestData;

    const component = render(
      <MemoryRouter>
        <Table
          seos={seos}
          handleDeleteSeo={handleDeleteSeo}
          handleEditSeo={handleEditSeo}
          userEnabledLocales={userEnabledLocales}
          uid={uid}
          defaultLocale={defaultLocale}
        />
      </MemoryRouter>
    );

    expect(component).toBeDefined();
  });
  it("Should Render Filter Button", () => {
    const filterButton = screen.getByText("Filter");

    expect(filterButton).toBeInTheDocument();
  });

  it("Should Render Filter Input And Hide Button After Filter Button Is Clicked", () => {
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    const hideButton = screen.getByText("Hide");
    const filterInput = hideButton.previousElementSibling.children[0];
    expect(hideButton).toBeDefined();
    expect(filterInput).toBeDefined();
  });

  it("Should Filter The Table Based On User Input", () => {
    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);
    let collectionItems = screen.queryAllByTestId("collection-item");

    expect(collectionItems).toHaveLength(5);

    const hideButton = screen.getByText("Hide");
    const filterInput = hideButton.previousElementSibling.children[0];
    fireEvent.change(filterInput, { target: { value: "test" } });

    collectionItems = screen.queryAllByTestId("collection-item");

    expect(collectionItems).toHaveLength(0);
  });

  it("Should Render Edit Seo Button", () => {
    const editSeoButton = screen.getByTestId("edit-seo-button-0");
    expect(editSeoButton).toBeInTheDocument();
  });
});
