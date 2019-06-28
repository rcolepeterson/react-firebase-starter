import React from 'react';

import {AuthUserContext, withAuthorization} from '../Session';
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account</h1>
        {/* <p>{authUser.username}</p> */}
        <p>{authUser.email}</p>
        {/* <p>{JSON.stringify(authUser)}</p> */}
        {/* <PasswordForgetForm />
        <PasswordChangeForm /> */}
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
