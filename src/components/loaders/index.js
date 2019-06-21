import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));
export const Loader = () => {
  const classes = useStyles();
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};
