import React from 'react';

const VideoCard = ({ video }) => {
  let card = null;

  if (Object.keys(video).length) {
    card = (
      <div className="card">
        <a href={video.video_url} target="_blank">
          <img className="card-img-top" src={video.thumbnail_url} alt="Video Thumb" />
        </a>
        <div className="card-body">
          <h6 className="card-title"><a href={video.video_url} target="_blank">{video.title}</a></h6>
          <p className="card-text"><b>Author:</b> {video.author.name}</p>
          <p className="card-text"><b>Length:</b> {video.length}</p>
          {/* <p className="card-text"><b>Description:</b> {video.description}</p> */}
        </div>
      </div>
    )
  } else {
    card = (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">No Video</h5>
        </div>
      </div>
    )
  }

  return (
    <div id="video-card">
      <h4>Video Info</h4>
      {card}
    </div>
  )
};

export default VideoCard;