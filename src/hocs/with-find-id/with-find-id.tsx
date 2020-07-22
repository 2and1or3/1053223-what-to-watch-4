import * as React from "react";
import {connect} from "react-redux";
import {Subtract} from "utility-types";

import {getFilmById} from '../../reducer/application/selectors';
import {ActionCreator} from '../../reducer/application/application';
import {FilmType} from '../../types';

interface Props {
  filmById: FilmType;
  setFilterByFilm: (genre: string) => void;
}

interface InjectedProps {
  currentFilm: FilmType;
}

const withFindId = (Component) => {
  type WrappedComponentProps = React.ComponentProps<typeof Component>;

  type Self = Props & Subtract<WrappedComponentProps, InjectedProps>;

  class WithFindId extends React.PureComponent<Self> {
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
