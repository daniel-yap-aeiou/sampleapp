import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import youtube from "./Api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import KEY from "./Api/key";
import { withRouter } from "react-router-dom";
import { Badge } from "react-bootstrap";

function Index(props) {
  const [state, setState] = useState({
    videos: [],
    selectedVideo: null,
  });

  const handleSubmit = async (termFromSearchBar) => {
    const response = await youtube
      .get("/search", {
        params: {
          part: "snippet",
          maxResults: 15,
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

  useEffect(props.hideLoader, []);

  const trending = async () => {
    const response = await youtube
      .get("/videos", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          maxResults: 15,
          regionCode: "AU",
          key: KEY,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(response.data);

    var videos = [];
    if (response.data && response.data.items) {
      response.data.items.map((v) => {
        let snippet = {
          title: v.snippet.title,
          description: v.snippet.description,
          thumbnails: {
            medium: {
              url: v.snippet.thumbnails.medium.url,
            },
          },
        };
        const data = { id: { videoId: v.id }, snippet };
        videos.push(data);
      });

      setState((prevState) => ({
        ...prevState,
        videos: videos,
      }));
    }
  };

  return (
    <div className="container" style={{ marginTop: "1em" }}>
      <Badge
        onClick={() => {
          trending();
        }}
        className={"badge-pill badge-secondary category"}
      >
        Trending
      </Badge>

      <SearchBar handleFormSubmit={handleSubmit} />
      <br />
      <br />
      <div className="row">
        {state.selectedVideo == null ? (
          <>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <VideoList
                handleVideoSelect={handleVideoSelect}
                videos={state.videos}
                selectedVideo={state.selectedVideo}
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-7">
              <VideoDetail video={state.selectedVideo} />
            </div>
            <div className="col-lg-5">
              <VideoList
                handleVideoSelect={handleVideoSelect}
                videos={state.videos}
                selectedVideo={state.selectedVideo}
              />
            </div>
          </>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default withRouter(Index);
