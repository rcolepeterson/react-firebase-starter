import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
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
import Toolbar from '@material-ui/core/Toolbar';
//import MenuIcon from '@material-ui/icons/Menu';
import {withAuthentication} from '../Session';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import IconButton from '@material-ui/core/IconButton';

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
      <Grid container justify="center" style={{maxWidth: '100%'}}>
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
};

export default withAuthentication(App);
