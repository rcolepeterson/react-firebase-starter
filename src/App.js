import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import AccountName from './components/AccountName';
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import QuestionSubmitPage from './pages/QuestionSubmit';
import QuestionLeaderboardPage from './pages/QuestionLeaderBoard';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';
import * as ROUTES from './constants/routes';
import {withAuthentication} from './Session';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <AppBar color="secondary" position="sticky">
        <Toolbar>
          <Navigation></Navigation>
          <Typography variant="h6" className={classes.title}>
            APP
          </Typography>
          <AccountName />
        </Toolbar>
      </AppBar>
      <Container justify="center" align="center" component="main">
        <CssBaseline />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
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
      </Container>
    </Router>
  );
};

export default withAuthentication(App);
