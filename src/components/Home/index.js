import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withAuthorization} from '../Session';

const useStyles = makeStyles(theme => ({
  root: {
    'margin-top': '60px',
    ' & h1': {
      'font-size': '77px',
      color: '#ccc',
      'margin-bottom': 0
    }
  }
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Town Hall</h1>
      <h3>Crowd Sourcing Q &amp; A</h3>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
