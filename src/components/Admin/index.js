import React, {Component} from 'react';

import {withFirebase} from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    const db = this.props.firebase.getdb();
    db.collection('users')
      .get()
      .then(querySnapshot => {
        const usersList = querySnapshot.docs.map(doc => doc.data());
        this.setState({
          users: usersList,
          loading: false
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  }
  componentWillUnmount() {
    //this.props.firebase.users().off();
  }

  render() {
    const {users, loading} = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

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

export default withFirebase(AdminPage);
