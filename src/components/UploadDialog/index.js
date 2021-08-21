import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import FileUploader from '~components/FileUploader';

import { TOGGLE_UPLOAD_SUCCEEDED } from '~actions/appAction';
import { UPLOAD_FILES_REQUESTED } from '~actions/fileAction';

function UploadDialog() {
  const dispatch = useDispatch();
  const { isUploaderOpen } = useSelector((state) => state.app);

  const [fileUploadList, setFileUploadList] = useState([]);

  const canUpload = useMemo(() => fileUploadList.length > 0, [fileUploadList]);

  useEffect(() => {
    if (isUploaderOpen) return;

    handleReset();
  }, [isUploaderOpen]);

  const handleClose = () => {
    dispatch({ type: TOGGLE_UPLOAD_SUCCEEDED, payload: false });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const files = [...e.currentTarget.form.querySelector('input[type=file]').files];
    if (files.length === 0) return;

    trackPromise(dispatch({ type: UPLOAD_FILES_REQUESTED, payload: files }));
  };

  const handleSelectedFiles = (e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;

    const fileList = files.map((f) => ({ name: f.name, size: f.size }));
    setFileUploadList(fileList);
  };

  const handleReset = () => {
    setFileUploadList([]);
  };

  return (
    <Dialog
      open={isUploaderOpen}
      onClose={handleClose}
      aria-labelledby="dialog-upload"
      fullWidth={true}
      maxWidth={'sm'}
    >
      <form>
        <DialogTitle id="dialog-upload">Upload files</DialogTitle>
        <DialogContent>
          <FileUploader
            onUpload={handleUpload}
            fileUploadList={fileUploadList}
            onSelectedFiles={handleSelectedFiles}
            onReset={handleReset}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" type="button">
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpload} disabled={!canUpload} type="submit">
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UploadDialog;
