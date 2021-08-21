import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import {
  AppBar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';

import { SIGN_OUT_REQUESTED } from '~actions/authAction';
import { TOGGLE_UPLOAD_SUCCEEDED } from '~actions/appAction';

import './style.scss';

function NavBar() {
  const history = useHistory();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    trackPromise(dispatch({ type: SIGN_OUT_REQUESTED })).then(() => {
      history.push('/sign-in');
    });
  };

  const handleUpload = () => {
    dispatch({ type: TOGGLE_UPLOAD_SUCCEEDED, payload: true });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Real Estate
        </Typography>
        <div className="navbar__action">
          <IconButton aria-label="upload files" color="inherit" onClick={handleUpload}>
            <CloudUploadIcon />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
            <MenuItem onClose={handleClose}>{currentUser?.username}</MenuItem>
            <Divider />
            <MenuItem onClose={handleClose} onClick={handleSignOut}>
              Sign Out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
