import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";
import {connect} from "react-redux";

import {getFilmById} from '../../reducer/application/selectors.js';
import {ActionCreator} from '../../reducer/application/application.js';
import {filmProp} from '../../props.js';

const withFindId = (Component) => {
  class WithFindId extends PureComponent {
    constructor(props) {
      super(props);
    }
    componentDidUpdate(prevProps) {
      const {filmById: before} = prevProps;
      const {filmById: after, setFilterByFilm} = this.props;

      const isEqual = before.id === after.id;

      if (!isEqual) {
        setFilterByFilm(after.genre);
      }
    }

    render() {
      const {filmById} = this.props;

      return (
        <Component
          {...this.props}
          currentFilm = {filmById}
        />);
    }
  }

  WithFindId.propTypes = {
    filmById: filmProp,
    setFilterByFilm: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state, ownProps) => ({
    filmById: getFilmById(state, ownProps),
  });

  const mapDispatchToProps = (dispatch) => ({
    setFilterByFilm: (genre) => dispatch(ActionCreator.setFilter(genre)),
  });

  const ConnectedWithFindId = connect(mapStateToProps, mapDispatchToProps)(WithFindId);

  return ConnectedWithFindId;
};

export default withFindId;
