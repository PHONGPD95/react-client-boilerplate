import React, { useState } from 'react';

import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  InsertDriveFile as InsertDriveFileIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';

import formatDate from '~utils/formatDate';
import getFileSize from '~utils/getFileSize';

import './style.scss';
import { DELETE_FILE_REQUESTED } from '~actions/fileAction';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

function File(props) {
  const { id, name, size, date, userId } = props;

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

  const handleDelete = () => {
    trackPromise(dispatch({ type: DELETE_FILE_REQUESTED, payload: id })).then(() => {
      handleClose();
    });
  };

  return (
    <ListItem className="file">
      <ListItemAvatar>
        <Avatar>
          <InsertDriveFileIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className="filename"
        primary={`${name} (${getFileSize(size)})`}
        secondary={formatDate(date)}
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="display more actions"
          aria-controls="menu-action"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu id="menu-action" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {currentUser?.id === userId && (
            <MenuItem onClose={handleClose} onClick={handleDelete}>
              Delete
            </MenuItem>
          )}
          <MenuItem onClose={handleClose}>Download</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default File;
