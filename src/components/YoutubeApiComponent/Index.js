import React, { useState } from "react";
import SearchBar from "./SearchBar";
import youtube from "./Api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import KEY from "./Api/key";
import { withRouter } from "react-router-dom";

function Index() {
  const [state, setState] = useState({
    videos: [],
    selectedVideo: null,
  });

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube
      .get("/search", {
        params: {
          part: "snippet",
          maxResults: 5,
          key: KEY,
          q: termFromSearchBar,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    setState((prevState) => ({
      ...prevState,
      videos: response.data.items,
    }));
  };
  const handleVideoSelect = (video) => {
    setState((prevState) => ({
      ...prevState,
      selectedVideo: video,
    }));
  };

  return (
    <div className="container" style={{ marginTop: "1em" }}>
      <SearchBar handleFormSubmit={handleSubmit} />
      <br />
      <br />
      <div className="ui row">
        <div className="col-7">
          <VideoDetail video={state.selectedVideo} />
        </div>
        <div className="col-5">
          <VideoList
            handleVideoSelect={handleVideoSelect}
            videos={state.videos}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default withRouter(Index);
