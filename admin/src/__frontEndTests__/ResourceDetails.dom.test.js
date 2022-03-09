/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, screen } from "@testing-library/react";

import ResourceDetails from "../components/ResourceDetails/ResourceDetails";
import {
  resourceComponentTestData,
  resourceData,
  resourceSchema,
} from "./testData";

describe("DOM TESTING RESOURCE-DETAILS COMPONENT", () => {
  it("Should Render Successfully", () => {
    const component = render(
      <ResourceDetails resource={resourceComponentTestData} />
    );
    expect(component).toBeDefined();
  });

  it("Should Not Render Title If No Title Is Provided", async () => {
    const updatedResourceData = Object.assign({}, resourceData);
    updatedResourceData.title = null;
    render(
      <ResourceDetails
        resource={{ resourceData: updatedResourceData, resourceSchema }}
      />
    );
    expect(screen.queryByTestId("resource-title")).toBeFalsy();
  });

  describe("Should Render Collection Type Details", () => {
    beforeEach(() => {
      render(<ResourceDetails resource={resourceComponentTestData} />);
    });

    it("Collection Type Title", () => {
      expect(screen.getByTestId("resource-title")).toBeTruthy();
    });

    it("Collections Type Title", () => {
      expect(screen.getByTestId("resource-collection-title")).toBeTruthy();
    });
  });
});
