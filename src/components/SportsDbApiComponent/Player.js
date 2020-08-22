import React, { useState, useEffect } from "react";
import { Spinner, Modal } from "react-bootstrap";
import KEY from "./key";
import APIURL from "./api";
import { withRouter } from "react-router-dom";

import axios from "axios";
import "./Index.css";
import Logo from "../../logo.svg";
import { showLoader, hideLoader } from "../../contexts/LoaderContext";

function Player() {
  const [player, setPlayer] = useState("");
  const [spinnerClassName, setSpinnerClassName] = useState("hide");
  const [players, setPlayers] = useState([]);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");

  const handleClose = () => setShow((pv) => (pv = false));
  const handleShow = () => setShow((pv) => (pv = true));

  useEffect(hideLoader, []);

  const handleInputChange = (e) => {
    setSpinnerClassName((pv) => (pv = ""));
    const v = e.target.value;
    setPlayer((prevValue) => (prevValue = v));

    setTimeout(() => {
      setSpinnerClassName((pv) => (pv = "hide"));
    }, 1000);
  };

  const handleOnSubmitViaClick = () => {
    if (player === undefined || player === "") return false;
  };

  const showDesc = (text) => {
    setModalBody((pv) => (pv = text));
    handleShow();
  };

  useEffect(() => {
    const receivedData = () => {
      if (player === undefined || player === null || player === "") {
        return false;
      }

      showLoader();
      const url = `${APIURL}${KEY}/searchplayers.php?p=${player}`;

      axios
        .get(url)
        .then((res) => {
          const data = res.data;

          console.log(data);
          if (data && data.player) {
            let players_1 = [];
            data.player.map((p) => {
              let {
                idPlayer,
                dateBorn,
                strBirthLocation,
                strThumb,
                strFacebook,
                strTwitter,
                strPosition,
                strPlayer,
                strSport,
                strDescriptionEN,
              } = p;

              players_1.push({
                idPlayer,
                dateBorn,
                strBirthLocation,
                strThumb,
                strFacebook,
                strTwitter,
                strPosition,
                strPlayer,
                strSport,
                strDescriptionEN,
              });
            });

            setPlayers((pv) => (pv = players_1));
          }

          hideLoader();
        })
        .catch((err) => {
          console.log(err);
          hideLoader();
        });
    };

    receivedData();

    return () => {
      hideLoader();
      console.log("cleaned up");
    };
  }, [player]);

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <form className="">
          <input
            type="text"
            placeholder="Search for a player"
            className="form-control"
            value={player}
            onChange={handleInputChange}
          />
          <br />
          <button
            id="playerSubmitButton"
            type="button"
            className="btn btn-primary"
            onClick={handleOnSubmitViaClick}
          >
            Submit
          </button>
          <Spinner animation="border" className={spinnerClassName} />
        </form>
        <br />
        <div className="row">
          {players
            ? players.map((d) => {
                return (
                  <div
                    className="col-lg-4 col-sm-4 col-md-4 player"
                    key={d.idPlayer}
                    data-idplayer={d.idPlayer}
                  >
                    <img
                      src={d.strThumb || Logo}
                      className="img-player"
                      alt={d.strTeam}
                    />
                    <h5>{d.strPlayer}</h5>
                    <button
                      className="btn btn-info"
                      onClick={() => showDesc(d.strDescriptionEN || "NA")}
                    >
                      Description
                    </button>
                    &nbsp;
                    <div>
                      <p>Position: {d.strPosition}</p>
                      <p>Sport: {d.strSport}</p>
                      <p>Born: {d.dateBorn}</p>
                      <p>Birth location: {d.strBirthLocation || "NA"}</p>
                      <p>
                        <a
                          href={"https://" + d.strFacebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-facebook-square"
                            aria-hidden="true"
                          ></i>
                        </a>
                        &nbsp;
                        <a
                          href={"https://" + d.strTwitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </p>
                    </div>
                  </div>
                );
              })
            : "Nothing found"}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
            <Modal.Footer>
              <button className="btn btn-dark" onClick={() => handleClose()}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Player);
