import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { InsertDriveFile as InsertDriveFileIcon } from '@material-ui/icons';

import getFileSize from '~utils/getFileSize';

function UploadFileList(props) {
  const { files } = props;

  const list = files.map((file, index) => (
    <ListItem dense key={index}>
      <ListItemIcon>
        <InsertDriveFileIcon />
      </ListItemIcon>
      <ListItemText primary={`${file.name} (${getFileSize(file.size)})`} />
    </ListItem>
  ));

  return <List>{list}</List>;
}

export default UploadFileList;
