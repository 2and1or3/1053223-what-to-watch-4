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
import {AppRoute, UserStatus} from '../../consts.js';
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

          <PrivateRoute
            allowForUserStatus = {UserStatus.NO_AUTH}
            redirectTo = {AppRoute.ROOT}
            exact path = {AppRoute.LOGIN}
            render = {() => {
              return <SignIn onAuthSubmit = {onAuthSubmit}/>;
            }}/>

          <PrivateRoute
            allowForUserStatus = {UserStatus.AUTH}
            redirectTo = {AppRoute.LOGIN}
            exact path = {AppRoute.REVIEW_BY_ID}
            render = {(props) => {
              return <AddReviewWithFindId {...props} onCommentSend = {onCommentSend}/>;
            }}/>

          <Route
            exact path = {AppRoute.PLAYER_BY_ID}
            render = {(props) => {

              return (<PlayerScreenWithVideoWithFindId
                {...props}
                isPlaying = {true}
                isMuted = {false}
              />);
            }}/>

          <Route
            exact path = {AppRoute.FILM_BY_ID}
            render = {(props) => {

              return <FilmDetailsWithFindId {...props}/>;
            }}/>

          <PrivateRoute
            allowForUserStatus = {UserStatus.AUTH}
            redirectTo = {AppRoute.LOGIN}
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
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
  onCommentSend: (review, id, handleResponse) => {
    dispatch(UserOperation.sendComment(review, id, handleResponse));
  },
});

const ConectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export {App};
export default ConectedApp;
