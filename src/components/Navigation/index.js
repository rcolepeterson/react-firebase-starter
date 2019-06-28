import React from 'react';
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../../Session';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
//import {withAuthentication} from '../Session';
import {makeStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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

const Navigation = ({authUser}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        onClick={handleClick}
        aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth handleClose={handleClose} />
            ) : (
              <NavigationNonAuth handleClose={handleClose} />
            )
          }
        </AuthUserContext.Consumer>
      </Menu>
    </div>
  );
};

const NavigationAuth = ({handleClose}) => (
  <>
    {/* <MenuItem component={Link} to={ROUTES.LANDING}>
      Landing
    </MenuItem> */}
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.HOME}>
      Home
    </MenuItem>

    <MenuItem onClick={handleClose} component={Link} to={ROUTES.ACCOUNT}>
      Account
    </MenuItem>
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.ADMIN}>
      Admin
    </MenuItem>
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.ADD_QUESTION}>
      Ask Question
    </MenuItem>
    <MenuItem
      onClick={handleClose}
      component={Link}
      to={ROUTES.QUESTION_LEADERBOAD}>
      Leaderboard
    </MenuItem>
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.ABOUT}>
      About
    </MenuItem>
    <SignOutButton />
  </>
);

const NavigationNonAuth = ({handleClose}) => (
  <>
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.LANDING}>
      Home
    </MenuItem>
    <MenuItem
      onClick={handleClose}
      component={Link}
      to={ROUTES.QUESTION_LEADERBOAD}>
      Leaderboard
    </MenuItem>
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.SIGN_IN}>
      Sign In
    </MenuItem>
    <MenuItem onClick={handleClose} component={Link} to={ROUTES.ABOUT}>
      About
    </MenuItem>
  </>
);

export default Navigation;
