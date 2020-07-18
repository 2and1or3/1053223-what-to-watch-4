import React from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import PlayerScreen from '../player-screen/player-screen.jsx';
import AlertError from '../alert-error/alert-error.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import MyList from '../my-list/my-list.jsx';


import {filmProp} from '../../props.js';
import {AppRoute} from '../../consts.js';
import withVideo from '../../hocs/with-video/with-video.js';
import {ActionCreator as ApplicationActionCreator} from '../../reducer/application/application.js';
import {getError} from '../../reducer/application/selectors.js';
import {getPromoFilm} from '../../reducer/data/selectors.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import history from '../../history.js';
import withFindId from '../../hocs/with-find-id/with-find-id.js';


const PlayerScreenWithVideo = withVideo(PlayerScreen);
const PlayerScreenWithVideoWithFindId = withFindId(PlayerScreenWithVideo);

const FilmDetailsWithFindId = withFindId(FilmDetails);
const AddReviewWithFindId = withFindId(AddReview);


class App extends PureComponent {

  render() {
    const {error, onClose, onCommentSend, onAuthSubmit, onExit, promoFilm} = this.props;

    return (
      <Router history = {history}>
        <Switch>
          <Route
            exact path = {AppRoute.ROOT}
            render = {() => {
              return <Main promoFilm = {promoFilm}/>;
            }}/>

          <Route
            exact path = {`/login`}
            render = {() => {
              return <SignIn onAuthSubmit = {onAuthSubmit}/>;
            }}/>

          <Route
            exact path = {`/films/:id/review`}
            render = {(props) => {
              return <AddReviewWithFindId {...props} onCommentSend = {onCommentSend}/>;
            }}/>

          <Route
            exact path = {`/films/:id/player`}
            render = {(props) => {

              return (<PlayerScreenWithVideoWithFindId
                {...props}
                isPlaying = {true}
                isMuted = {false}
                onExit = {onExit}
              />);
            }}/>

          <Route
            exact path = {`/films/:id`}
            render = {(props) => {

              return <FilmDetailsWithFindId {...props}/>;
            }}/>

          <Route
            exact path = {`/mylist`}
            render = {() => {

              return (<MyList />);
            }}/>
        </Switch>
        <AlertError message = {error.message} code = {error.code} onClose = {onClose}/>
      </Router>
    );
  }
}

App.propTypes = {
  promoFilm: filmProp,
  onExit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
  onCommentSend: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  error: getError(state),
  promoFilm: getPromoFilm(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(ApplicationActionCreator.showError(``, ``));
  },
  onAuthSubmit: (login, password, onSuccess) => {
    dispatch(UserOperation.sendAuth(login, password, onSuccess));
  },
  onCommentSend: (review, id, enableForm) => {
    dispatch(UserOperation.sendComment(review, id, enableForm));
  }
});

const ConectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export {App};
export default ConectedApp;
