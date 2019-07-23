import React, {useEffect, useState} from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import {Loader} from '../components/Loaders';

const AdminPage = ({firebase, test}) => {
  const [state, updateState] = useState({loading: true, users: []});

  useEffect(() => {
    const getUers = () => {
      firebase
        .getdb()
        .collection('users')
        .get()
        .then(querySnapshot => {
          const users = querySnapshot.docs.map(doc => doc.data());
          updateState({loading: false, users, isAdmin: true});
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error);
        });
    };
    // https://www.robinwieruch.de/react-firebase-authorization-roles-permissions/
    firebase.isAdmin().then(b => {
      b === true
        ? getUers()
        : updateState(prevstate => ({
            ...prevstate,
            loading: false,
            isAdmin: false
          }));
    });
  }, [firebase]);

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1 style={{marginBottom: -10}}>Admin</h1>
          <p style={{marginBottom: 40}}>
            {authUser.email} {state.isAdmin ? 'is an admin' : 'is not an admin'}
          </p>
          {state.loading && <Loader />}
          <UserList users={state.users} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const UserList = ({users}) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <p>
          <strong>ID:</strong> {user.uid}
        </p>
        <p>
          <strong>E-Mail:</strong> {user.email}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
      </li>
    ))}
  </ul>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage);
