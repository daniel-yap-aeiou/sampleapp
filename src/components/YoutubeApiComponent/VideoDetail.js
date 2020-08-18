import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>&nbsp;</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="video-container">
      <div className="row">
        <div className="col-sm-7 col-md-7 col-lg-6">
          <iframe
            src={videoSrc}
            allowFullScreen
            title="Video player"
            className="video"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-7 col-md-7 col-lg-6">
          <h4 className="">{video.snippet.title}</h4>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
