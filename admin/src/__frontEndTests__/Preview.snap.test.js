/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";

import Preview from "../Preview";
import LocaleContextProvider from "../__mocks__/LocaleContextProvider";
import {
  previewComponentTestData,
  resourceComponentTestData,
} from "./testData";

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

describe("SNAP TESTING PREVIEW COMPONENT", () => {
  const { selectedSeo, refreshOptions, handleDeleteSeo } =
    previewComponentTestData;
  it("Should Render Successfully", () => {
    const component = renderer.create(
      <LocaleContextProvider>
        <Preview
          selectedSeo={selectedSeo}
          refreshOptions={refreshOptions}
          handleDeleteSeo={handleDeleteSeo}
          resource={resourceComponentTestData}
        />
      </LocaleContextProvider>
    );
    const tree = component.toJSON();
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
