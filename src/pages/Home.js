import React from 'react';
//import {makeStyles} from '@material-ui/core/styles';
import {withAuthorization} from '../Session';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {Button} from '@material-ui/core';

const HomePage = () => {
  return (
    <div className="link-list">
      <Button
        fullWidth
        variant="outlined"
        component={Link}
        to={ROUTES.ADD_QUESTION}>
        Ask a question
      </Button>

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
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
