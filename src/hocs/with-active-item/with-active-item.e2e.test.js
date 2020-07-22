import React from "react";
import Enzyme from "enzyme";
import {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";

import withActiveItem from './with-active-item';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) =>{
  const {activeItem, onTargetClick} = props;

  const Type = {
    FIRST: `first`,
    SECOND: `second`,
  };

  return (
    <ul>
      <li
        className={`item-one ${activeItem === Type.FIRST ? `active` : ``}`}
        id={Type.FIRST}
        onClick={() => {
          onTargetClick(Type.FIRST);
        }}
      ></li>
      <li
        className={`item-two ${activeItem === Type.SECOND ? `active` : ``}`}
        id={Type.SECOND}
        onClick={() => {
          onTargetClick(Type.SECOND);
        }}
      ></li>
    </ul>
  );
};

MockComponent.propTypes = {
  activeItem: PropTypes.any.isRequired,
  onTargetClick: PropTypes.func.isRequired,
};

const MockComponentWithActiveItem = withActiveItem(MockComponent);

describe(`HOC WithActiveItem works correctly`, () => {
  it(`HOC handles with click on target and changes active item`, () => {
    const wrapper = mount(<MockComponentWithActiveItem/>);

    const firstItem = wrapper.find(`.item-one`);
    const secondItem = wrapper.find(`.item-two`);

    firstItem.simulate(`click`);
    expect(wrapper.state(`activeItem`)).toEqual(`first`);
    secondItem.simulate(`click`);
    expect(wrapper.state(`activeItem`)).toEqual(`second`);
  });
});
