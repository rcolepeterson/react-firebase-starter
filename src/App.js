import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Navigation from './components/Navigation';
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import QuestionSubmitPage from './pages/QuestionSubmit';
import QuestionLeaderboardPage from './pages/QuestionLeaderBoard';
//import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';
import * as ROUTES from './constants/routes';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withAuthentication} from './Session';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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
//  <Navigation />
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
        {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.ADD_QUESTION} component={QuestionSubmitPage} />
      </Container>
    </Router>
  );
};

export default withAuthentication(App);
