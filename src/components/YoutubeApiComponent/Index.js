import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import youtube from "./Api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import KEY from "./Api/key";
import { withRouter } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useUtilContext } from "../../contexts/UtilContext";

function Index(props) {
  const utilContext = useUtilContext();

  const [state, setState] = useState({
    videos: [],
    selectedVideo: null,
  });

  const [maxResults, setMaxResults] = useState(15);

  const handleClearSelectedVideo = () => {
    setState((prevState) => ({
      ...prevState,
      selectedVideo: null,
    }));
  };

  const handleSubmit = async (termFromSearchBar, maxResults) => {
    const response = await youtube
      .get("/search", {
        params: {
          part: "snippet",
          maxResults: parseInt(maxResults),
          key: KEY,
          q: termFromSearchBar,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    setMaxResults((prevState) => (prevState = parseInt(maxResults)));

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

  useEffect(utilContext.hideLoader, []);

  const trending = async () => {
    const response = await youtube
      .get("/videos", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          maxResults: maxResults,
          regionCode: "AU",
          key: KEY,
        },
      })
      .catch((err) => {
        console.log(err);
      });

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

      <SearchBar
        handleFormSubmit={handleSubmit}
        clearSelectedVideo={handleClearSelectedVideo}
        handleSetMaxResults={setMaxResults}
      />
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
            <div className="col-sm-7 col-md-7 col-lg-7">
              <VideoDetail video={state.selectedVideo} />
            </div>
            <div className="col-sm-5 col-md-5 col-lg-5">
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
