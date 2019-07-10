import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {APP_NAME, APP_TAGLINE} from '../constants/strings';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    'margin-top': '60px',
    ' & h1': {
      'font-size': '77px',
      color: '#ccc',
      'margin-bottom': 0
    },
    ' & h3': {
      color: '#999',
      'margin-top': 0
    }
  }
}));

const createMarkup = () => {
  return {__html: APP_TAGLINE};
};

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1> {APP_NAME}</h1>
      <h2 dangerouslySetInnerHTML={createMarkup()} />
      <div className="link-list">
        <Button
          fullWidth
          variant="outlined"
          component={Link}
          to={ROUTES.QUESTION_LEADERBOAD}>
          Leaderboard
        </Button>

        <Button fullWidth variant="outlined" component={Link} to={ROUTES.ABOUT}>
          About
        </Button>
        <p>
          You must <Link to={ROUTES.SIGN_IN}>Sign In</Link> to{' '}
          <Link to={ROUTES.ADD_QUESTION}>Ask a question</Link>
        </p>
      </div>
    </div>
  );
};

export default Landing;
