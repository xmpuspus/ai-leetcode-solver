import React from 'react';
import { Button } from '@mui/material';

function UploadButton({ onUpload }) {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0]);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Image of Leetcode Problem
        </Button>
      </label>
    </div>
  );
}

export default UploadButton;
