import React, { useState, useEffect } from "react";
import { Spinner, Modal, Tab, Nav } from "react-bootstrap";
import KEY from "./key";
import APIURL from "./api";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Index.css";
import PastMatch from "./PastMatch";
import Player from "./Player";
import Table from "./Table";
import { useUtilContext } from "../../contexts/UtilContext";

import { P1, NavNew1 } from "../../Theme/styles";

function Index() {
  const utilContext = useUtilContext();

  const [allSports, setAllSports] = useState([]);
  const [sports, setSports] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [data, setData] = useState([]);
  const [pastMatches, setPastMatches] = useState({
    t: [],
  });
  const [show, setShow] = useState(false);
  const [showNextMatch, setShowNextMatch] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalBodyNextMatch, setModalBodyNextMatch] = useState("");

  const [leagueId, setLeagueId] = useState("");
  const [spinnerClassName, setSpinnerClassName] = useState("hide");
  const [tableData, setTableData] = useState([]);

  const handleCloseNextMatch = () => setShowNextMatch((pv) => (pv = false));
  const handleShowNextMatch = () => setShowNextMatch((pv) => (pv = true));

  const handleClose = () => setShow((pv) => (pv = false));
  const handleShow = () => setShow((pv) => (pv = true));

  useEffect(utilContext.hideLoader, []);

  const showLeagueTable = () => {
    if (leagueId.length <= 0) return false;
    setSpinnerClassName((pv) => (pv = ""));

    let year = new Date().getFullYear();
    const s = `${year - 1}-${year}`;

    const url = `${APIURL}${KEY}/lookuptable.php?l=${leagueId}&s=${s}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (data && data.table) {
          let table_1 = [];
          data.table.map((t) => {
            let {
              name,
              teamid,
              played,
              goalsfor,
              goalsagainst,
              goalsdifference,
              win,
              draw,
              loss,
              total,
            } = t;

            table_1.push({
              name,
              teamid,
              played,
              goalsfor,
              goalsagainst,
              goalsdifference,
              win,
              draw,
              loss,
              total,
            });
          });

          setTableData((pv) => (pv = table_1));
        }

        utilContext.hideLoader();
        setSpinnerClassName((pv) => (pv = "hide"));
      })
      .catch((err) => {
        console.log(err);
        utilContext.hideLoader();
      });
  };

  const leagueChange = (e) => {
    const lea = e.target.value;

    if (lea === "") return false;
    utilContext.showLoader();

    // Set leagueId to retrieve league table
    if (leagues) {
      const z = leagues.find((l) => l.strLeague === lea);
      if (z) {
        setLeagueId((pv) => (pv = z.idLeague));
      }
    }

    // Example, English League 1
    const url = `${APIURL}${KEY}/search_all_teams.php?l=${lea}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (data && data.teams) {
          let teams = [];
          data.teams.map((d) => {
            let {
              idTeam,
              strDescriptionEN,
              intFormedYear,
              strFacebook,
              strInstagram,
              strKeywords,
              strStadium,
              strStadiumLocation,
              strTeam,
              strTeamBadge,
              strTwitter,
              strWebsite,
              strYoutube,
            } = d;

            teams.push({
              idTeam,
              strDescriptionEN,
              intFormedYear,
              strFacebook,
              strInstagram,
              strKeywords,
              strStadium,
              strStadiumLocation,
              strTeam,
              strTeamBadge,
              strTwitter,
              strWebsite,
              strYoutube,
            });
          });

          setData((pv) => (pv = teams));
        } else {
          setData((pv) => (pv = []));
        }

        utilContext.hideLoader();
      })
      .catch((err) => {
        console.log(err);
        utilContext.hideLoader();
      });
  };

  const sportsChange = (e) => {
    const s = e.target.value;

    if (s === "") return false;
    setSports((pv) => (pv = s));
    setCountry((pv) => (pv = ""));
    setData((pv) => (pv = []));
    setCountries((pv) => (pv = []));
    setLeagues((pv) => (pv = []));
    setLeagueId((pv) => (pv = ""));
    setTableData((pv) => (pv = []));
  };

  const countryChange = (e) => {
    const c = e.target.value;

    if (c === "") return false;
    setCountry((pv) => (pv = c));
    setTableData((pv) => (pv = []));
  };

  useEffect(() => {
    const searchAllLeagues = () => {
      if (country === "" || sports === "") return false;

      utilContext.showLoader();
      setData((pv) => (pv = []));
      const url = `${APIURL}${KEY}/search_all_leagues.php?c=${country}&s=${sports}`;
      axios
        .get(url)
        .then((res) => {
          const data = res.data;

          if (data && data.countrys) {
            let leagues = [];
            data.countrys.map((d) => {
              let { idLeague, strLeague } = d;

              leagues.push({
                idLeague,
                strLeague,
              });
            });

            setLeagues((pv) => (pv = leagues));
          } else {
            setLeagues((pv) => (pv = []));
          }

          utilContext.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          utilContext.hideLoader();
        });
    };

    const loadCountries = () => {
      if (countries && countries.length > 0) return false;

      utilContext.showLoader();
      const url = `${APIURL}${KEY}/all_countries.php`;
      axios
        .get(url)
        .then((res) => {
          const data = res.data;

          if (data && data.countries) {
            let countries_1 = [];
            data.countries.map((d) => {
              let { name_en } = d;

              countries_1.push({
                name_en,
              });
            });

            setCountries((pv) => (pv = countries_1.sort()));
          }

          utilContext.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          utilContext.hideLoader();
        });
    };

    const loadAllSports = () => {
      if (allSports && allSports.length > 0) return false;

      utilContext.showLoader();
      const url = `${APIURL}${KEY}/all_sports.php`;

      axios
        .get(url)
        .then((res) => {
          const data = res.data;

          if (data && data.sports) {
            let allSports_1 = [];
            data.sports.map((d) => {
              let { idSport, strSport, strFormat } = d;

              if (strFormat === "TeamvsTeam") {
                allSports_1.push({
                  idSport,
                  strSport,
                  strFormat,
                });
              }
            });

            allSports_1 = allSports_1.sort((a, b) => a.strSport > b.strSport);
            setAllSports((pv) => (pv = allSports_1));
          }

          utilContext.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          utilContext.hideLoader();
        });
    };

    loadAllSports();
    loadCountries();
    searchAllLeagues();
  }, [country, sports]);

  const showDesc = (text) => {
    setModalBody(
      (pv) => (pv = { __html: `<p style='color: black;'>${text}</p>` })
    );
    handleShow();
  };

  const showNextMatchAction = (teamId) => {
    utilContext.showLoader();
    const url = `${APIURL}${KEY}/eventsnext.php?id=${teamId}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (data && data.events) {
          const event = data.events[0];
          let { strEvent, strLeague, dateEvent, strTimeLocal } = event;
          let content = `
            <p style='color: black;'>${strEvent}</p>
            <p style='color: black;'>Competition: ${strLeague}</p>
            <p style='color: black;'>${dateEvent} ${strTimeLocal}</p>
          `;

          // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
          setModalBodyNextMatch((pv) => (pv = { __html: content }));
        } else {
          setModalBodyNextMatch(
            (pv) =>
              (pv = {
                __html: "<p style='color: black;'>No up coming match</p>",
              })
          );
        }

        utilContext.hideLoader();
        handleShowNextMatch();
      })
      .catch((err) => {
        console.log(err);
        utilContext.hideLoader();
      });
  };

  const showLastMatches = (teamId) => {
    utilContext.showLoader();
    const url = `${APIURL}${KEY}/eventslast.php?id=${teamId}`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data;

        if (data && data.results) {
          let results = [];
          data.results.map((d) => {
            let {
              idEvent,
              intAwayScore,
              intHomeScore,
              strHomeTeam,
              strAwayTeam,
              strEvent,
              strVideo,
            } = d;

            results.push({
              idEvent,
              intAwayScore,
              intHomeScore,
              strHomeTeam,
              strAwayTeam,
              strEvent,
              strVideo,
            });
          });

          let old = pastMatches.t;
          let obj = { id: teamId, pastMatches: results };
          old = old.filter((s) => s.id !== teamId);
          old.push(obj);

          setPastMatches((prevState) => ({
            ...prevState,
            t: old,
          }));
        }

        utilContext.hideLoader();
      })
      .catch((err) => {
        console.log(err);
        utilContext.hideLoader();
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="home">
            <div className="col-lg-3">
              <NavNew1 variant="pills" className="flex-column">
                <NavNew1.Item>
                  <Nav.Link eventKey="home">Home</Nav.Link>
                </NavNew1.Item>
                <NavNew1.Item>
                  <Nav.Link eventKey="player">Player</Nav.Link>
                </NavNew1.Item>
              </NavNew1>
            </div>
            <div className="col-lg-12">
              <Tab.Content>
                <Tab.Pane eventKey="home">
                  <br />
                  <div className="row">
                    {allSports ? (
                      <div className="col-lg-6 col-sm-6 col-md-6 league">
                        <label>Sport</label>
                        <select
                          defaultValue={""}
                          onChange={(e) => sportsChange(e)}
                          className="form-control"
                        >
                          <option value="">Please select a sport</option>
                          {allSports.map((c) => {
                            return (
                              <option key={c.idSport} value={c.strSport}>
                                {c.strSport}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    ) : (
                      <div className="col-lg-12">
                        Server error or Api key not working
                      </div>
                    )}
                  </div>

                  <div className="row">
                    {countries && sports !== "" ? (
                      <div className="col-lg-6 col-sm-6 col-md-6 league">
                        <label>Country</label>
                        <select
                          defaultValue={""}
                          onChange={(e) => countryChange(e)}
                          className="form-control"
                        >
                          <option value="">Please select a country</option>
                          {countries.map((c) => {
                            return (
                              <option key={c.name_en} value={c.name_en}>
                                {c.name_en}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    ) : (
                      <div className="col-lg-12">Please select a sport</div>
                    )}
                  </div>

                  <div className="row">
                    {leagues && leagues.length > 0 ? (
                      <div className="col-lg-6 col-sm-6 col-md-6 league">
                        <label>Competition</label>
                        <select
                          defaultValue={""}
                          onChange={(e) => leagueChange(e)}
                          className="form-control"
                        >
                          <option value="">Please select a competition</option>
                          {leagues.map((l) => {
                            return (
                              <option
                                key={l.idLeague}
                                data-idleague={l.idLeague}
                                value={l.strLeague}
                              >
                                {l.strLeague}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    ) : sports === "" ? (
                      ""
                    ) : (
                      <div className="col-lg-12">No leagues found</div>
                    )}
                  </div>

                  {leagueId.length > 0 ? (
                    <div className="row">
                      <div className="col-lg-6 col-sm-6 col-md-6">
                        <button
                          className="btn btn-info"
                          onClick={() => showLeagueTable()}
                        >
                          Table
                        </button>
                        &nbsp;
                        <Spinner
                          animation="border"
                          className={spinnerClassName}
                        />
                      </div>
                      <Table data={tableData} />
                      <br />
                      <br />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="row">
                    {data
                      ? data.map((d) => {
                          return (
                            <div
                              className="col-lg-6 col-sm-6 col-md-6 team"
                              key={d.strTeam}
                              data-idteam={d.idTeam}
                            >
                              <img
                                src={d.strTeamBadge}
                                className="img-team"
                                alt={d.strTeam}
                              />
                              <h5>{d.strTeam}</h5>
                              <button
                                className="btn btn-info"
                                onClick={() => showDesc(d.strDescriptionEN)}
                              >
                                Description
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-dark"
                                onClick={() => showLastMatches(d.idTeam)}
                              >
                                Past Matches
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-success"
                                onClick={() => showNextMatchAction(d.idTeam)}
                              >
                                Next Match
                              </button>
                              <div>
                                <p>{d.strKeywords}</p>
                                <p>Since: {d.intFormedYear}</p>
                                <p>Stadium: {d.strStadiumLocation}</p>
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
                                    href={"https://" + d.strInstagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i
                                      className="fa fa-instagram"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                  &nbsp;
                                  <a
                                    href={"https://" + d.strTwitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i
                                      className="fa fa-twitter"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                  &nbsp;
                                  <a
                                    href={"https://" + d.strWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i
                                      className="fa fa-link"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                  &nbsp;
                                  <a
                                    href={"https://" + d.strYoutube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i
                                      className="fa fa-youtube"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                  &nbsp;
                                </p>
                              </div>
                              <PastMatch
                                data={
                                  pastMatches
                                    ? pastMatches.t.find(
                                        (s) => s.id === d.idTeam
                                      )
                                    : {}
                                }
                              />
                            </div>
                          );
                        })
                      : "Nothing found"}

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <P1>Description</P1>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body
                        dangerouslySetInnerHTML={modalBody}
                      ></Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-dark"
                          onClick={() => handleClose()}
                        >
                          Close
                        </button>
                      </Modal.Footer>
                    </Modal>

                    <Modal show={showNextMatch} onHide={handleCloseNextMatch}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <P1>Next Match</P1>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body
                        dangerouslySetInnerHTML={modalBodyNextMatch}
                      ></Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-dark"
                          onClick={() => handleCloseNextMatch()}
                        >
                          Close
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="player">
                  <br />
                  <Player />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Index);
