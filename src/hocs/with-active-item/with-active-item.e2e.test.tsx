import * as React from "react";
import * as Enzyme from "enzyme";
import {mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withActiveItem from './with-active-item';

Enzyme.configure({adapter: new Adapter()});

interface MockProps {
  activeItem: string | number | React.ReactNode | {};
  onTargetClick: (subject: string) => void;
}

const MockComponent: React.FunctionComponent<MockProps> = (props: MockProps) => {
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
