import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import URLS from "../../util/constants";
import { withRouter } from "react-router-dom";
import { showLoader, hideLoader } from "../../contexts/LoaderContext";

function Home(props) {
  // Declare a new state variable, which we'll call "count"
  let [count, setCount] = useState(0);
  let [text, setText] = useState(
    "In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt."
  );
  let [isLoadingImage, setIsLoadingImage] = useState(true);
  let [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (count % 2 === 0) {
      setText(
        (prevValue) =>
          (prevValue =
            count +
            " In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.")
      );
    } else {
      setText(
        (prevValue) =>
          (prevValue =
            count +
            " Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat. Keytar twee blog, culpa messenger bag marfa whatever delectus food truck. Sapiente synth id assumenda. Locavore sed helvetica cliche irony, thundercats you probably haven't heard of them consequat hoodie gluten-free lo-fi fap aliquip. Labore elit placeat before they sold out, terry richardson proident brunch nesciunt quis cosby sweater pariatur keffiyeh ut helvetica artisan. Cardigan craft beer seitan readymade velit. VHS chambray laboris tempor veniam. Anim mollit minim commodo ullamco thundercats.")
      );
    }

    setIsLoadingImage(true);
    setImageURL("");

    let isSubscribed = true;
    axios
      .get(URLS.DOG_PICTURE)
      .then((response) => {
        if (isSubscribed) {
          console.log(response.data);
          setImageURL(response.data.message);
          setIsLoadingImage(false);
          hideLoader();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      hideLoader();
      console.log("cleaned up");
      isSubscribed = false;
    };
  }, [count, props]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <p>You clicked {count} times</p>
          <button
            onClick={() => setCount((prevValue) => prevValue + 1)}
            className="btn btn-primary"
          >
            Click me
          </button>
        </div>
        <div className="col-lg-6">
          {isLoadingImage ? (
            "Loading..."
          ) : (
            <img src={imageURL} className="image" alt="..." />
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <div id="list-example" className="list-group">
            <a
              className="list-group-item list-group-item-action"
              href="#list-item-1"
            >
              Item 1
            </a>
            <a
              className="list-group-item list-group-item-action"
              href="#list-item-2"
            >
              Item 2
            </a>
            <a
              className="list-group-item list-group-item-action"
              href="#list-item-3"
            >
              Item 3
            </a>
            <a
              className="list-group-item list-group-item-action"
              href="#list-item-4"
            >
              Item 4
            </a>
            <a
              className="list-group-item list-group-item-action"
              href="#list-item-5"
            >
              Item 5
            </a>
          </div>
        </div>

        <div className="col-lg-9">
          <div
            data-spy="scroll"
            data-target="#list-example"
            data-offset="0"
            className="scrollspy-example"
          >
            <h4 id="list-item-1">Item 1</h4>
            <p>{text}</p>
            <h4 id="list-item-2">Item 2</h4>
            <p>{text}</p>
            <h4 id="list-item-3">Item 3</h4>
            <p>{text}</p>
            <h4 id="list-item-4">Item 4</h4>
            <p>{text}</p>
            <h4 id="list-item-5">Item 5</h4>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
