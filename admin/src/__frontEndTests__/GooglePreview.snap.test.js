/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";

import GooglePreview from "../components/GooglePreview/GooglePreview";
import { metaTitle, metaDescription, canonical } from "./testData";

describe("SNAP TESTING GOOGLE PREVIEW COMPONENT", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date("2022-03-08"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("Should Render Successfully", () => {
    const component = renderer.create(
      <GooglePreview
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        canonical={canonical}
      />
    );
    const tree = component.toJSON();
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
