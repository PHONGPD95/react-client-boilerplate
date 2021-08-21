import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import FileList from '~components/FileList';
import UploadDialog from '~components/UploadDialog';

import { GET_ALL_FILES_REQUESTED } from '~actions/fileAction';

function FileManager() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.file);

  useEffect(() => {
    trackPromise(dispatch({ type: GET_ALL_FILES_REQUESTED }));
  }, []);

  return (
    <>
      <FileList fileList={list} />
      <UploadDialog />
    </>
  );
}

export default FileManager;
