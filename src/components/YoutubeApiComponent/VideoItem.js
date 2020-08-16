import React from "react";
import "./video.css";

const VideoItem = ({ video, selectedVideo, handleVideoSelect }) => {
  return (
    <div onClick={() => handleVideoSelect(video)} className={selectedVideo == null ? "col-lg-4 col-md-4 col-sm-4 col-xs-4 video-item item" : "video-item item"}>
      <img
        className="ui image"
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
