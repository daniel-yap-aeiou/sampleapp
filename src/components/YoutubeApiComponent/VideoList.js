import React, { useState, useEffect } from "react";
import VideoItem from "./VideoItem";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

const VideoList = ({ videos, selectedVideo, handleVideoSelect }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady((pv) => (pv = true));
    }, 1500);

    return () => {
      videos = [];
      setReady((pv) => (pv = false));
    };
  }, []);

  if (videos === undefined || videos === null || videos.length === 0)
    return "API has reached daily limits";

  const renderedVideos = videos.map((video) => {
    return (
      <ReactPlaceholder
        key={video.id.videoId || Math.random()}
        type="text"
        firstLaunchOnly={true}
        rows={3}
        ready={ready}
        showLoadingAnimation={true}
        color={"gray"}
        style={{ height: 100 }}
      >
        <VideoItem
          video={video}
          handleVideoSelect={handleVideoSelect}
          selectedVideo={selectedVideo}
        />
      </ReactPlaceholder>
    );
  });

  return (
    <div className={selectedVideo == null ? "row" : ""}>{renderedVideos}</div>
  );
};
export default VideoList;
