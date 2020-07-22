import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import {getUserStatus} from '../../reducer/user/selectors';

type Props = RouteProps & {
  exact: boolean;
  path: string;
  render: (routeProps: RouteProps) => React.ReactNode;
  userStatus: string;
  allowForUserStatus: string;
  redirectTo: string;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
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

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export {PrivateRoute};
export default ConnectedPrivateRoute;
