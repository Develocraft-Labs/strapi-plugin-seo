/**
 * @jest-environment jsdom
 */
import React from "react";
import renderer from "react-test-renderer";

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
// mock useParams from react-router
jest.mock("react-router", () => ({
  useHistory: jest.fn().mockReturnValue([]),
  validateInput: () => [],
  InputErrors: () => null,
  LoadingIndicatorPage: () => null,
}));

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
      <Table
        seos={seos}
        handleDeleteSeo={handleDeleteSeo}
        handleEditSeo={handleEditSeo}
        userEnabledLocales={userEnabledLocales}
        uid={uid}
        defaultLocale={defaultLocale}
      />
    );
    const tree = component.toJSON();
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
