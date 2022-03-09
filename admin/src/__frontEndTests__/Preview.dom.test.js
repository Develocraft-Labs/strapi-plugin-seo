/**
 * @jest-environment jsdom
 */

import React from "react";

import { render } from "@testing-library/react";

import Preview from "../Preview";
import {
  previewComponentTestData,
  resourceComponentTestData,
} from "./testData";
import FormContextMock from "./FormContextMock";
import LocaleContextProvider from "../__mocks__/LocaleContextProvider";

// mocking components from strapi-helper-plugin
jest.mock("strapi-helper-plugin", () => {
  const Loader = jest.fn(({ children }) => children);
  const LoadingIndicator = jest.fn((props) => (
    <Loader
      onChangeParams={props.handleParamsChange}
      params={props.params}
      count={props.count}
    >
      <div>loading...</div>
    </Loader>
  ));

  const request = jest.fn().mockImplementationOnce(() => {});

  const Input = jest.fn((props) => (
    <input value={props.value} onChange={props.onChange} name={props.name} />
  ));
  const InputText = jest.fn((props) => <Input props={props} />);

  const TextArea = jest.fn((props) => <Input props={props} />);
  const InputTextArea = jest.fn((props) => (
    <TextArea value={props.value} onChange={props.onChange} name={props.name} />
  ));

  const JsonLd = jest.fn((props) => <Input props={props} />);
  const InputJson = jest.fn((props) => <Input props={props} />);
  const InputsIndex = jest.fn((props) => (
    <JsonLd
      type="json"
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      customInputs={{ json: InputJson }}
    />
  ));
  return {
    LoadingIndicator: LoadingIndicator,
    request: request,
    InputText: InputText,
    InputTextArea: InputTextArea,
    InputsIndex: InputsIndex,
    validateInput: () => [],
    InputErrors: () => null,
  };
});

// mock useParams from react-router
jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({
    id: 1,
    uid: "application::artists.artists",
  }),
}));

jest.mock("../containers/LocaleContextProvider/LocaleContextProvider.js", () =>
  require("../__mocks__/LocaleContextProvider")
);

describe("DOM TESTING PREVIEW COMPONENT", () => {
  const {
    selectedSeo,
    pluginUID,
    refreshOptions,
    projectCollectionTypes,
    handleDeleteSeo,
  } = previewComponentTestData;

  it("Should Render Successfully", () => {
    const component = render(
      <LocaleContextProvider>
        <FormContextMock>
          <Preview
            selectedSeo={selectedSeo}
            pluginUID={pluginUID}
            refreshOptions={refreshOptions}
            collectionTypes={projectCollectionTypes}
            handleDeleteSeo={handleDeleteSeo}
            resource={resourceComponentTestData}
          />
        </FormContextMock>
      </LocaleContextProvider>
    );
    expect(component).toBeDefined();
  });
});
