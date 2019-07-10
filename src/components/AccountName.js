import React from 'react';
import {AuthUserContext} from '../Session';
const AccountName = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        {/* <p>{authUser.username}</p> */}
        <p>{authUser && authUser.email}</p>
        {/* <p>{JSON.stringify(authUser)}</p> */}
        {/* <PasswordForgetForm />
        <PasswordChangeForm /> */}
      </div>
    )}
  </AuthUserContext.Consumer>
);

// const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AccountName);
export default AccountName;
