import React from 'react';
import AudioSplit from './AudioSplit';

const AudioSplitList = ({ list, onAddSplit, onDeleteSplit }) => {
  return (
  <div id="audio-split-list">
    <h4>Audio Split</h4>
    <ul id="audio-split-list">
      { list.map((val, i) => (
        <AudioSplit
          key={i}
          position={i + 1}
          length={list.length}
          onAdd={onAddSplit}
          onDelete={onDeleteSplit}
        />
      )) }
    </ul>
  </div>
  );
};

export default AudioSplitList;