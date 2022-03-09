/**
 * @jest-environment jsdom
 */
import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";

import ContentTypesList from "../components/ContentTypesList/ContentTypesList";
import { contentTypesListComponentTestData } from "./testData";

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
  return {
    GlobalPagination: GlobalPagination,
    validateInput: () => [],
    InputErrors: () => null,
  };
});

describe("SNAPING TESTING CONTENTTYPELIST COMPONENT", () => {
  it("Should Render Successfully", () => {
    const component = renderer.create(
      <ContentTypesList content={contentTypesListComponentTestData} />
    );
    const tree = component.toJSON();
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toMatch("ul");
  });
});
