import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>&nbsp;</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" className="video" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
