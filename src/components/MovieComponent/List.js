import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../logo.svg";
import axios from "axios";
import KEY from "./key";
import Trailer from "./Trailer";

function List(props) {
  const [data, updateData] = useState([]);
  const imagePathPrefixUrl = "https://image.tmdb.org/t/p/w500/";

  const [trailers, setTrailers] = useState({
    t: [],
  });

  useEffect(() => {
    updateData((prevValue) => (prevValue = props.data));

    return () => {
      console.log("cleaned up");
    };
  }, [props.data]);

  const showTrailers = (id) => {
    if (!id) return false;

    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`;

    let temp = [];
    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (data && data.results && data.results.length > 0) {
          data.results.map((d) => {
            temp.push(`https://www.youtube.com/watch?v=${d.key}`);
          });

          let old = trailers.t;
          let obj = { id: id, trailers: temp };
          old.push(obj);

          setTrailers((prevState) => ({
            ...prevState,
            t: old,
          }));
        } else {
          // Get the snackbar DIV
          var x = document.getElementById("snackbar");

          x.innerHTML = "Nothing found";
          // Add the "show" class to DIV
          x.className = "show";

          // After 3 seconds, remove the show class from DIV
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row">
      {data && data.length > 0 ? (
        data.map((m) => {
          let imgSrc = imagePathPrefixUrl + m.poster_path;

          if (m.poster_path === undefined || m.poster_path === null) {
            imgSrc = Logo;
          }

          let genres = [];
          if (m.genre_ids && props.genres) {
            m.genre_ids.map((g) => {
              const gen = props.genres.find((s) => s.id === g);
              if (gen) {
                genres.push(gen.name);
              }
            });
          }

          let joinedGenres = "";
          if (genres) {
            joinedGenres = genres.join(", ");
          }

          return (
            <div className="col-lg-3 col-sm-3 col-md-3 movie" key={m.id}>
              <img src={imgSrc} alt={m.title} className="movie-img" />
              <h5 className="movie-title">{m.title}</h5>
              <p>{m.overview || "..."}</p>
              <p>
                <span className="movie-genre">Genre:</span>{" "}
                {joinedGenres || "NA"}
              </p>
              <p>
                <span className="movie-release-date">Release date:</span>{" "}
                {m.release_date || "NA"}
              </p>
              <button
                className="btn btn-dark"
                onClick={() => showTrailers(m.id)}
              >
                Show Trailers
              </button>

              <Trailer
                data={trailers ? trailers.t.find((s) => s.id === m.id) : {}}
              />
            </div>
          );
        })
      ) : (
        <div>Nothing found</div>
      )}
    </div>
  );
}

export default withRouter(List);
