import React from "react";
import "./video.css";

const VideoItem = ({ video, selectedVideo, handleVideoSelect }) => {
  return (
    <div onClick={() => handleVideoSelect(video)} className={selectedVideo == null ? "col-lg-4 col-md-5 col-sm-5 col-xs-4 video-item item" : "video-item item"}>
      <img
        className="image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div className="content">
        <div className="header ">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
