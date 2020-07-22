import * as React from "react";
import * as renderer from "react-test-renderer";

import withActiveItem from './with-active-item';

interface MockProps {
  activeItem: string | number | React.ReactNode | {};
}

const MockComponent: React.FunctionComponent<MockProps> = (props: MockProps) => {
  const {activeItem} = props;

  return (<div>{activeItem}</div>);
};

const MockComponentWithActiveItem = withActiveItem(MockComponent);

it(`Render component with active item`, () => {
  const tree = renderer
    .create(<MockComponentWithActiveItem />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- hocs/with-active-item/with-active-item.test
