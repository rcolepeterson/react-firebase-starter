import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

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

const About = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>A PAGE</h1>
      {/* <h1>Town Hall</h1> */}
      {/* <h3>Crowd Sourcing Q &amp; A</h3> */}
    </div>
  );
};

export default About;
