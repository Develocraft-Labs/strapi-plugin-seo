/**
 * @jest-environment jsdom
 */
import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";

import Table from "../components/Table/Table";
import { tableComponentTestData } from "./testData";

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
  return { GlobalPagination: GlobalPagination };
});

describe("SNAP TESTING TABlE COMPONENT", () => {
  const {
    handleDeleteSeo,
    handleEditSeo,
    userEnabledLocales,
    uid,
    defaultLocale,
    seos,
  } = tableComponentTestData;

  it("Should Render Successfully", () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
