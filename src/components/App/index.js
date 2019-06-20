import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import QuestionSubmitPage from '../QuestionSubmit';
import QuestionLeaderboardPage from '../QuestionLeaderBoard';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import {Grid} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';

import {withAuthentication} from '../Session';

const App = () => (
  <Router>
    <AppBar position="static">
      <Navigation />
    </AppBar>
    <Grid
      container
      justify="center"
      style={{minHeight: '100vh', maxWidth: '100%'}}>
      <Grid item xs={12} align="center">
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.QUESTION_LEADERBOAD}
          component={QuestionLeaderboardPage}
        />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.ADD_QUESTION} component={QuestionSubmitPage} />
      </Grid>
    </Grid>
  </Router>
);

export default withAuthentication(App);
