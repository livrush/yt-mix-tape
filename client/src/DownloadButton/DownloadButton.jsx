import React from 'react';

const DownloadButton = ({ onDownload }) => {
  return (
  <div id="url-input">
    <button className="btn btn-primary btn-block" onClick={onDownload}>
      Download
    </button>
  </div>
  );
};

export default DownloadButton;