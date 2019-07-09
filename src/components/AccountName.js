import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
const AccountName = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
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

export default withAuthorization(condition)(AccountName);
