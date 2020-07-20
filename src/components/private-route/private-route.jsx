import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {getUserStatus} from '../../reducer/user/selectors.js';

const PrivateRoute = (props) => {
  const {exact, path, render, userStatus, allowForUserStatus, redirectTo} = props;
  const isAllow = userStatus === allowForUserStatus;

  return (
    <Route
      exact = {exact}
      path = {path}
      render = {(routeProps) => {

        return (
          isAllow ? render(routeProps) :
            <Redirect to = {redirectTo}/>
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
  allowForUserStatus: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export {PrivateRoute};
export default ConnectedPrivateRoute;
