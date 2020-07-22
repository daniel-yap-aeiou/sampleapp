import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, handleVideoSelect }) => {
  if (videos === undefined) return "";

  const renderedVideos = videos.map((video) => {
    return (
      <VideoItem
        key={video.id.videoId || Math.random()}
        video={video}
        handleVideoSelect={handleVideoSelect}
      />
    );
    console.log(video.id);
  });

  return <div className="ui relaxed divided list">{renderedVideos}</div>;
};
export default VideoList;
