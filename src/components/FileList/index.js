import React from 'react';

import { List } from '@material-ui/core';

import File from '~components/File';

import './style.scss';

function FileListEmptyMessage() {
  return <div className="file file--empty">No file</div>;
}

function FileList(props) {
  const { fileList = [] } = props;

  const renderFileList = fileList.map((file, key) => <File key={key} {...file} />);

  return (
    <List className="file-list">
      {renderFileList.length > 0 ? renderFileList : <FileListEmptyMessage />}
    </List>
  );
}

export default FileList;
