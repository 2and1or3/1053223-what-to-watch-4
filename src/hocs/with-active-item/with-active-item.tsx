import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  activeItem: string | number | React.ReactNode | {};
}

interface InjectedProps {
  activeItem: string | number | React.ReactNode | {};
  onTargetClick: (subject: string | number | React.ReactNode | {}) => void;
  onTargetHover: (subject: string | number | React.ReactNode | {}) => void;
  onTargetLeave: () => void;
}

const withActiveItem = (Component) => {
  type WrappedComponentProps = React.ComponentProps<typeof Component>;

  type Self = Subtract<WrappedComponentProps, InjectedProps>

  class WithActiveItem extends React.PureComponent<Self, State> {
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
