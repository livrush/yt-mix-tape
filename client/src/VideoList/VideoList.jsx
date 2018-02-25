import React from 'react';
// import URLInput from '../URLInput/URLInput';

const VideoList = ({ list, onAddUrl, onSelectUrl }) => {
  return (
  <ul id="video-list">
    { list }
  </ul>
  );
};

export default VideoList;