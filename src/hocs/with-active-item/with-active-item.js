import React from "react";
import {PureComponent} from "react";


const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: ``,
      };

      this._handleTargetHover = this._handleTargetHover.bind(this);
      this._handleTargetLeave = this._handleTargetLeave.bind(this);
      this._handleTargetClick = this._handleTargetClick.bind(this);
    }

    _handleTargetHover(subject) {
      this.setState({activeItem: subject});
    }

    _handleTargetLeave() {
      this.setState({activeItem: ``});
    }

    _handleTargetClick(subject) {
      this.setState({activeItem: subject});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem = {this.state.activeItem}
          onTargetHover = {this._handleTargetHover}
          onTargetLeave = {this._handleTargetLeave}
          onTargetClick = {this._handleTargetClick}
        />);
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
