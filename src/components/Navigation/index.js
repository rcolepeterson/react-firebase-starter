import React from 'react';
import {Link} from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Navigation = ({authUser}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
        </AuthUserContext.Consumer>
      </Menu>
    </div>
  );
};

const NavigationAuth = () => (
  <>
    <MenuItem component={Link} to={ROUTES.LANDING}>
      Landing
    </MenuItem>
    <MenuItem component={Link} to={ROUTES.QUESTION_LEADERBOAD}>
      Leaderboard
    </MenuItem>
    <MenuItem component={Link} to={ROUTES.HOME}>
      Home
    </MenuItem>
    <MenuItem component={Link} to={ROUTES.ACCOUNT}>
      Account -{' '}
    </MenuItem>
    <MenuItem component={Link} to={ROUTES.ADMIN}>
      Admin
    </MenuItem>
    <MenuItem component={Link} to={ROUTES.ADD_QUESTION}>
      Submit Question
    </MenuItem>
    <SignOutButton />
  </>
);

const NavigationNonAuth = () => (
  <>
    <MenuItem component={Link} to={ROUTES.LANDING}>
      Landing
    </MenuItem>
    <MenuItem component={Link} to={ROUTES.SIGN_IN}>
      Sign In
    </MenuItem>
  </>
);

export default Navigation;
