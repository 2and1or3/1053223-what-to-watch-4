import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {UserStatus, AppRoute} from '../../consts';
import {getUserStatus} from '../../reducer/user/selectors';

interface Props {
  authStatus: string;
}

const UserBlock: React.FunctionComponent<Props> = (props: Props) => {
  const {authStatus} = props;

  const userElement = authStatus === UserStatus.AUTH ?

    (<div className="user-block__avatar">
      <Link to = {AppRoute.LIST}>
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </Link>
    </div>) :
    (<Link
      className="user-block__sign-in"
      to = {AppRoute.LOGIN}
      style = {{color: `#dfcf77`, textDecoration: `none`}}>
      Sign In
    </Link>);

  return (
    <div className="user-block">
      {userElement}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authStatus: getUserStatus(state),
});

const ConnectedUserBlock = connect(mapStateToProps, null)(UserBlock);

export {UserBlock};
export default ConnectedUserBlock;
