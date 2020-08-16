import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, selectedVideo, handleVideoSelect }) => {
  if (videos === undefined) return "";

  const renderedVideos = videos.map((video) => {
    return (
      <VideoItem
        key={video.id.videoId || Math.random()}
        video={video}
        handleVideoSelect={handleVideoSelect}
        selectedVideo={selectedVideo}
      />
    );
  });

  return <div className={selectedVideo == null ? "row": ""}>{renderedVideos}</div>;
};
export default VideoList;
