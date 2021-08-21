import React, { useRef } from 'react';

import { Button } from '@material-ui/core';

import UploadFileList from '~components/UploadFileList';

function FileUploader(props) {
  const { fileUploadList, onSelectedFiles, onReset } = props;

  const inputRef = useRef(null);

  const handleReset = () => {
    inputRef.current.value = '';
    onReset();
  };

  return (
    <div>
      <label htmlFor="button-file">
        <input
          style={{ display: 'none' }}
          id="button-file"
          ref={inputRef}
          multiple
          type="file"
          onChange={onSelectedFiles}
        />
        <Button component="span" variant="contained" color="primary">
          Select Files
        </Button>
      </label>

      <Button
        style={{ display: fileUploadList.length ? 'inline-flex' : 'none' }}
        component="span"
        type="reset"
        onClick={handleReset}
      >
        Clear
      </Button>

      <UploadFileList files={fileUploadList} />
    </div>
  );
}

export default FileUploader;
