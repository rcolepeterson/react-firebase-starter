import React, {useEffect, useState} from 'react';
import {AuthUserContext, withAuthorization} from '../Session';
import {Loader} from '../components/Loaders';

const AdminPage = ({firebase}) => {
  const [state, updateState] = useState({loading: true, users: []});

  useEffect(() => {
    const getUers = () => {
      firebase
        .getdb()
        .collection('users')
        .get()
        .then(querySnapshot => {
          const users = querySnapshot.docs.map(doc => doc.data());
          updateState({loading: false, users});
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error);
        });
    };
    getUers();
  }, [firebase]);

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Admin</h1>
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
