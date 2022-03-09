/**
 * @jest-environment jsdom
 */
import React from "react";
import {
  BoxColumn,
  Column,
  EvenColumn,
  FlexWrapRow,
  Row,
} from "../components/ui/common";
import renderer from "react-test-renderer";

describe("Row component", () => {
  it("Should Render Row", () => {
    const tree = renderer.create(<Row>content</Row>).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule("display", "flex");
    expect(tree).toHaveStyleRule("flex-direction", "row");
  });
  it("Should Render FlexWrapRow", () => {
    const tree = renderer
      .create(
        <FlexWrapRow>
          <div>child</div>
        </FlexWrapRow>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule("display", "flex");
    expect(tree).toHaveStyleRule("flex-direction", "row");
    expect(tree).toHaveStyleRule("flex-wrap", "wrap");
    expect(tree).toHaveStyleRule("margin-left", "2rem", {
      modifier: "> *",
    });
  });
  it("Should Render Column", () => {
    const tree = renderer.create(<Column>content</Column>).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule("display", "flex");
    expect(tree).toHaveStyleRule("flex-direction", "column");
  });

  it("Should Render EvenColumn", () => {
    const tree = renderer.create(<EvenColumn>content</EvenColumn>).toJSON();

    expect(tree).toMatchSnapshot();
    // Check if it extends Column properly
    expect(tree).toHaveStyleRule("display", "flex");
    expect(tree).toHaveStyleRule("flex-direction", "column");
    expect(tree).toHaveStyleRule("justify-content", "space-evenly");
  });

  it("Should Render BoxColumn", () => {
    const tree = renderer.create(<BoxColumn>content</BoxColumn>).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule("background-color", "#ffffff");
    expect(tree).toHaveStyleRule("border-radius", "2px");
    expect(tree).toHaveStyleRule("box-shadow", "0 2px 4px #e3e9f3");
  });
});
