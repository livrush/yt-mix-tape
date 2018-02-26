import React from 'react';
import AudioSplit from './AudioSplit';

const AudioSplitList = ({
  list,
  onAddSplit,
  onUpdateSplit,
  onDeleteSplit
}) => {
  return (
  <div id="audio-split-list">
    <h4>Audio Split</h4>
    <ul id="audio-split-list">
      { list.map((val, i) => (
        <AudioSplit
          key={i}
          position={i + 1}
          length={list.length}
          start={val.start}
          end={val.end}
          title={val.title}
          onAdd={onAddSplit}
          onUpdate={onUpdateSplit}
          onDelete={onDeleteSplit}
        />
      )) }
    </ul>
  </div>
  );
};

export default AudioSplitList;