import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {getUserStatus} from '../../reducer/user/selectors.js';
import {UserStatus, AppRoute} from '../../consts.js';

const PrivateRoute = (props) => {
  const {exact, path, render, userStatus} = props;

  const isAllow = userStatus === UserStatus.AUTH;

  return (
    <Route
      exact = {exact}
      path = {path}
      render = {() => {

        return (
          isAllow ? render() :
            <Redirect to = {AppRoute.LOGIN}/>
        );
      }}

    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  userStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export {PrivateRoute};
export default ConnectedPrivateRoute;
