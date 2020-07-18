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
import PrivateRoute from '../private-route/private-route.jsx';


import {filmProp} from '../../props.js';
import {AppRoute} from '../../consts.js';
import {GetPath} from '../../utils';
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
    const {error, onClose, onCommentSend, onAuthSubmit, promoFilm} = this.props;

    return (
      <Router history = {history}>
        <Switch>
          <Route
            exact path = {AppRoute.ROOT}
            render = {() => {
              return <Main promoFilm = {promoFilm}/>;
            }}/>

          <Route
            exact path = {AppRoute.LOGIN}
            render = {() => {
              return <SignIn onAuthSubmit = {onAuthSubmit}/>;
            }}/>

          <PrivateRoute
            exact path = {GetPath.filmReview(`id`)}
            render = {(props) => {
              return <AddReviewWithFindId {...props} onCommentSend = {onCommentSend}/>;
            }}/>

          <Route
            exact path = {GetPath.filmPlayer(`id`)}
            render = {(props) => {

              return (<PlayerScreenWithVideoWithFindId
                {...props}
                isPlaying = {true}
                isMuted = {false}
              />);
            }}/>

          <Route
            exact path = {GetPath.filmDetails(`id`)}
            render = {(props) => {

              return <FilmDetailsWithFindId {...props}/>;
            }}/>

          <PrivateRoute
            exact path = {AppRoute.LIST}
            render = {() => <MyList />}/>
        </Switch>
        <AlertError message = {error.message} code = {error.code} onClose = {onClose}/>
      </Router>
    );
  }
}

App.propTypes = {
  promoFilm: filmProp,
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
