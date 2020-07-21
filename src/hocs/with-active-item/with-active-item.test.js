import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";

import withActiveItem from './with-active-item.js';

const MockComponent = (props) => {
  const {activeItem} = props;

  return (<div activeItem={activeItem}/>);
};

MockComponent.propTypes = {
  activeItem: PropTypes.string.isRequired,
};

const MockComponentWithActiveItem = withActiveItem(MockComponent);

it(`Render component with active item`, () => {
  const tree = renderer
    .create(<MockComponentWithActiveItem />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- hocs/with-active-item/with-active-item.test.js
