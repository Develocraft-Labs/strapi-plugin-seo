/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

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
    InputErrors: () => null,
  };
});

describe("DOM TESTING CONTENT-TYPE-LIST COMPONENT", () => {
  let component;
  beforeEach(() => {
    component = render(
      <ContentTypesList content={contentTypesListComponentTestData} />
    );
  });

  it("Should Render Successfully", () => {
    expect(component).toBeDefined();
  });

  it("Should Render Content Types List", () => {
    expect(screen.getByTestId("content-types-list")).toBeDefined();
  });
});
