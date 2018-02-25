import React from 'react';

const VideoCard = ({ video }) => {
  let card = null;

  if (Object.keys(video).length) {
    card = (
      <div id="video-card" className="card" style={{width: '18rem'}}>
        <img className="card-img-top" src={video.thumbnail_url} alt="Video Thumb" />
        <div className="card-body">
          <h5 className="card-title"><a href={video.video_url}>{video.title}</a></h5>
          <p className="card-text"><b>Author:</b> {video.author.name}</p>
          {/* <p className="card-text"><b>Description:</b> {video.description}</p> */}
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    )
  } else {
    card = (
      <div id="video-card" className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">No Video</h5>
        </div>
      </div>
    )
  }

  return card;
};

export default VideoCard;