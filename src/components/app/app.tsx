import * as React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import Main from '../main/main';
import FilmDetails from '../film-details/film-details';
import PlayerScreen from '../player-screen/player-screen';
import AlertError from '../alert-error/alert-error';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import PrivateRoute from '../private-route/private-route';


import {FilmType} from '../../types';
import {AppRoute, UserStatus} from '../../consts';
import withVideo from '../../hocs/with-video/with-video';
import {ActionCreator as ApplicationActionCreator} from '../../reducer/application/application';
import {getError} from '../../reducer/application/selectors';
import {getPromoFilm} from '../../reducer/data/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';
import history from '../../history';
import withFindId from '../../hocs/with-find-id/with-find-id';


const PlayerScreenWithVideo = withVideo(PlayerScreen);
const PlayerScreenWithVideoWithFindId = withFindId(PlayerScreenWithVideo);

const FilmDetailsWithFindId = withFindId(FilmDetails);
const AddReviewWithFindId = withFindId(AddReview);


interface Props {
  promoFilm: FilmType;
  onClose: () => void;
  onAuthSubmit: (login: string, password: string, onSuccess: () => void) => void;
  onCommentSend: (review: {rating: number; comment: string}, id: number, handleResponse: {onSuccess: () => void; onError: () => void}) => void;
  error: {message: string; code: string | number};
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {error, onClose, onCommentSend, onAuthSubmit, promoFilm} = props;

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
          render = {(routeProps) => {
            return <AddReviewWithFindId {...routeProps} onCommentSend = {onCommentSend}/>;
          }}/>

        <Route
          exact path = {AppRoute.PLAYER_BY_ID}
          render = {(routeProps) => {

            return (<PlayerScreenWithVideoWithFindId
              {...routeProps}
              isPlaying = {true}
              isMuted = {false}
            />);
          }}/>

        <Route
          exact path = {AppRoute.FILM_BY_ID}
          render = {(routeProps) => {

            return <FilmDetailsWithFindId {...routeProps}/>;
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
