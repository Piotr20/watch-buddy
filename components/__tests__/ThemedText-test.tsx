import * as React from "react";
import renderer from "react-test-renderer";
import { ThemeText } from "../theme/typography";

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemeText>Snapshot test!</ThemeText>).toJSON();

  expect(tree).toMatchSnapshot();
});
