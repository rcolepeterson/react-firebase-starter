import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import {FormControl, TextField} from '@material-ui/core';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const {email, password} = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {email, password, error} = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <FormControl>
        <form onSubmit={this.onSubmit}>
          <TextField
            name="email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <TextField
            name="password"
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button
            disabled={isInvalid}
            variant="contained"
            color="primary"
            type="submit">
            Sign In
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </FormControl>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export {SignInForm};
