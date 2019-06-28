import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from './SignUp';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../constants/routes';
import Button from '@material-ui/core/Button';
import {FormControl, TextField} from '@material-ui/core';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

const TEST_STATE = {
  email: 'anonymous@zaaz.com',
  password: 'Zaaz1234',
  error: null
};

const SignInFormBase = ({history, firebase}) => {
  const [state, setState] = useState(INITIAL_STATE);
  const {email, password, error} = state;
  const isInvalid = password === '' || email === '';

  const onSubmit = event => {
    try {
      firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          setState({...INITIAL_STATE});
          history.push(ROUTES.HOME);
        })
        .catch(error => {
          setState(prev => ({...prev, error}));
        });

      event.preventDefault();
    } catch (e) {
      setState(prev => ({...prev, error}));
    }
  };

  const changeHandler = event => {
    // event.persist();
    const {value, name} = event.target;
    setState(prev => ({...prev, [name]: value}));
  };

  return (
    <FormControl>
      <form onSubmit={onSubmit}>
        <TextField
          name="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={changeHandler}
          type="text"
          placeholder="Email Address"
          autoComplete="email"
        />
        <TextField
          name="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          value={password}
          onChange={changeHandler}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <br></br>
        <Button
          disabled={isInvalid}
          fullWidth
          variant="contained"
          color="primary"
          type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      <br></br>
      <Button
        onClick={() => {
          console.log('test');
          setState(TEST_STATE);
        }}
        fullWidth
        variant="contained"
        color="primary">
        sign in as anonymous
      </Button>
    </FormControl>
  );
};

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;
