/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";

import ResourceDetails from "../components/ResourceDetails/ResourceDetails";
import { resourceComponentTestData } from "./testData";

describe("SNAP TESTING RESOURCE-DETAILS COMPONENT", () => {
  it("Should Render Successfully", () => {
    const component = renderer.create(
      <ResourceDetails resource={resourceComponentTestData} />
    );
    const tree = component.toJSON();
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
