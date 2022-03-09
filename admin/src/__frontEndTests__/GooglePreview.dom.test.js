/**
 * @jest-environment jsdom
 */

import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import GooglePreview from "../components/GooglePreview/GooglePreview";
import { metaTitle, metaDescription, canonical } from "./testData";

describe("DOM TESTING GOOGLE PREVIEW COMPONENT", () => {
  beforeEach(() => {
    render(
      <GooglePreview
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        canonical={canonical}
      />
    );
  });
  it("Should Render Successfully", () => {
    expect(
      render(
        <GooglePreview
          metaTitle={metaTitle}
          metaDescription={metaDescription}
          canonical={canonical}
        />
      )
    ).toBeDefined();
  });
  it("Should Render Only Mobile Preview When Selected", () => {
    const mobileRadioButton =
      screen.getByText(/Mobile result/).previousElementSibling;
    fireEvent.click(mobileRadioButton);

    expect(screen.getByTestId("mobile-preview")).toBeInTheDocument();
    expect(screen.queryByTestId("desktop-preview")).toBeNull();
  });

  it("Should Render Desktop Preview When Selected", () => {
    const desktopRadioButton =
      screen.getByText(/Desktop result/).previousElementSibling;
    fireEvent.click(desktopRadioButton);

    expect(screen.getByTestId("desktop-preview")).toBeInTheDocument();
    expect(screen.queryByTestId("mobile-preview")).toBeNull();
  });
});
