/**
 * @jest-environment jsdom
 */
import React from "react";

import { render } from "@testing-library/react";

import TranslationPicker from "../components/TranslationPicker/TranslationPicker";
import { translationPickerComponentTestData } from "./testData";
import LocaleContextProvider from "../__mocks__/LocaleContextProvider";

// mock GlobalPagination component from strapi-helper-plugin
jest.mock("strapi-helper-plugin", () => {
  const Input = jest.fn((props) => (
    <input value={props.value} onChange={props.onChange} name={props.name} />
  ));
  const options = (props) => (
    <option value={props.title} id={props.id}>
      {props.title}
    </option>
  );
  const ReactSelect = jest.fn((props) => <Input props={props} />);
  const Select = jest.fn((props) => (
    <ReactSelect selectedValue={props.value} onChange={props.handleChange}>
      {options}
    </ReactSelect>
  ));

  return {
    LoadingIndicatorPage: () => null,
    Select: Select,
  };
});

jest.mock("../containers/LocaleContextProvider/LocaleContextProvider.js", () =>
  require("../__mocks__/LocaleContextProvider")
);

describe("DOM TESTING TRANSLATION PICKER COMPONENT", () => {
  const { handleTranslation, translations, value } =
    translationPickerComponentTestData;

  let component;
  beforeAll(() => {
    component = render(
      <LocaleContextProvider>
        <TranslationPicker
          handleTranslation={handleTranslation}
          translations={translations}
          value={value}
        />
      </LocaleContextProvider>
    );
  });

  it("Should Render Successfully", () => {
    expect(component).toBeDefined();
  });
});
