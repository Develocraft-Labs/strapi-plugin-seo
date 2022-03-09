/**
 * @jest-environment jsdom
 */
import React from "react";
import renderer from "react-test-renderer";

import Details from "../Details";
import { seoFormComponentTestData } from "./testData";

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
    LoadingIndicatorPage: LoadingIndicator,
    InputText: InputText,
    InputTextArea: InputTextArea,
    InputsIndex: InputsIndex,
    request: request,
    Select: Select,
  };
});

// mock useParams from react-router
jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({
    id: 1,
    uid: "application::artists.artists",
  }),
  useHistory: jest.fn().mockReturnValue([]),
}));

describe("SNAP TESTING DETAILS COMPONENT", () => {
  const component = renderer.create(
    <Details
      pluginUID={seoFormComponentTestData.pluginUID}
      seoId={seoFormComponentTestData.seoId}
      collectionTypes={seoFormComponentTestData.projectCollectionTypes}
    />
  );
  const tree = component.toJSON();
  it("Should Render Successfully", () => {
    expect(component).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
