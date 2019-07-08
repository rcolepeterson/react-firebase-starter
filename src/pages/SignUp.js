import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../constants/routes';
import {compose} from 'recompose';
import {Button, TextField} from '@material-ui/core';
import {SignInLink} from './SignIn';
import {PasswordForgetLink} from './PasswordForget';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

const TEST_STATE = {
  username: 'cole',
  email: 'cole@zaaz.com',
  passwordOne: 'Zaaz1234',
  passwordTwo: 'Zaaz1234',
  error: null
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const SignUpFormBase = ({history, firebase}) => {
  const [state, setState] = useState(INITIAL_STATE);

  const onSubmit = event => {
    event.preventDefault();
    try {
      firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          const db = firebase.getdb();
          return db.collection('users').add({
            username,
            email,
            uid: authUser.user.uid
          });
        })
        .then(() => {
          //setState({...INITIAL_STATE});
          history.push(ROUTES.HOME);
        })
        .catch(error => {
          console.warn('error');
          setState(prevState => {
            return {...prevState, error};
          });
        });
    } catch (error) {
      console.error('error');
      setState({error});
    }
  };

  const onChangeHandler = event => {
    const {value, name} = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const {username, email, passwordOne, passwordTwo, error} = state;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <div>
      <Button
        onClick={() => {
          console.log('test');
          setState(TEST_STATE);
        }}
        fullWidth
        variant="contained"
        color="primary">
        test
      </Button>
      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          variant="outlined"
          margin="normal"
          label="username"
          required
          fullWidth
          value={username}
          onChange={onChangeHandler}
          type="text"
          placeholder="Full Name"
        />
        <TextField
          name="email"
          value={email}
          required
          fullWidth
          label="email"
          variant="outlined"
          margin="normal"
          onChange={onChangeHandler}
          type="text"
          placeholder="Email Address"
        />
        <TextField
          name="passwordOne"
          value={passwordOne}
          variant="outlined"
          margin="normal"
          required
          label="password"
          fullWidth
          onChange={onChangeHandler}
          type="password"
          placeholder="Password"
        />
        <TextField
          name="passwordTwo"
          value={passwordTwo}
          variant="outlined"
          margin="normal"
          label="confirm password"
          required
          fullWidth
          onChange={onChangeHandler}
          type="password"
          placeholder="Confirm Password"
        />
        <br></br>
        <Button
          disabled={isInvalid}
          fullWidth
          variant="contained"
          color="primary"
          type="submit">
          Sign Up
        </Button>
        {error && <p>{error.message}</p>}
      </form>
      <SignInLink />
      <PasswordForgetLink />
    </div>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
