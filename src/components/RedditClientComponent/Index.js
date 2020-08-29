import React, { useEffect, useReducer, useState } from "react";
import { ResponseStories, ResponseSubreddits, Story, Subreddit } from "./types";
import Navigation from "./Navigation";
import StoryList from "./StoryList";
import { Spinner } from "react-bootstrap";
import "./Index.css";
import { useUtilContext } from "../../contexts/UtilContext";
import { DIV} from "../../Theme/styles";

type State = {
  // List of possible Subreddits for the user to choose in the right navigation.
  navigationItems: Array<Subreddit>,

  // The stories for the current selected Subreddit whose title and other info are shown once the
  // user navigates to one.
  storyItems: Array<Story>,

  // Current Subreddit being viewed. Its title is shown at the top of the page
  selectedSubreddit: ?Subreddit,
};

const initialState = {
  navigationItems: [],
  selectedSubreddit: null,
  storyItems: [],
};

const actionTypes = {
  SET_NAV_ITEMS: "set-nagivation-items",
  SET_SELECTED_SUBREDDIT: "set-selected-subreddit",
  SET_STORY_ITEMS: "set-story-items",
};

const reducer = (state: State, action): State => {
  switch (action.type) {
    case actionTypes.SET_NAV_ITEMS:
      return {
        ...state,
        navigationItems: action.payload,
      };
    case actionTypes.SET_SELECTED_SUBREDDIT:
      return {
        ...state,
        selectedSubreddit: action.payload,
        storyItems: [],
      };
    case actionTypes.SET_STORY_ITEMS:
      return {
        ...state,
        storyItems: action.payload,
      };
    default:
      throw new Error();
  }
};

let storiesCallbackName = null;

function Index() {
  const utilContext = useUtilContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loaderClass, setLoaderClass] = useState("");

  useEffect(() => {
    setLoaderClass((prevValue) => (prevValue = ""));
    const documentHead = document.head;
    if (documentHead == null) {
      setLoaderClass((prevValue) => (prevValue = "hide"));
      throw new Error("No <head> to use for script injection.");
    }

    const cbname = `fn${Date.now()}`;
    const script = document.createElement("script");
    script.src = `https://www.reddit.com/reddits.json?jsonp=${cbname}`;
    window[cbname] = (jsonData: ResponseSubreddits) => {
      dispatch({
        payload: jsonData.data.children,
        type: actionTypes.SET_NAV_ITEMS,
      });
      delete window[cbname];
      documentHead.removeChild(script);
    };

    // Start the JSONP request by injecting the `script` into the document.
    documentHead.appendChild(script);
    setLoaderClass((prevValue) => (prevValue = "hide"));

    utilContext.hideLoader();
  }, []);

  const setSelectedItem = (item: Subreddit) => {
    setLoaderClass((prevValue) => (prevValue = ""));
    const documentHead = document.head;
    if (documentHead == null) {
      setLoaderClass((prevValue) => (prevValue = "hide"));
      throw new Error("No <head> to use for script injection.");
    }
    const cbname = (storiesCallbackName = `fn${Date.now()}`);
    const script = document.createElement("script");
    script.src = `https://www.reddit.com${item.data.url}.json?sort=top&t=month&jsonp=${cbname}`;

    window[cbname] = (jsonData: ResponseStories) => {
      // Use the response only if this is still the latest script to run. If the user clicked
      // another Subreddit in the meantime, the `cbname` will be different and this response should
      // be ignored.
      //
      // The `<script>` must stay in the document even if the response is not needed because
      // otherwise the JSONP request will try to call a nonexistent script. Leave it in the `<head>`
      // so it can clean up after itself but make it do nothing other than clean up.
      if (cbname === storiesCallbackName) {
        dispatch({
          payload: jsonData.data.children,
          type: actionTypes.SET_STORY_ITEMS,
        });
      }

      delete window[cbname];
      documentHead.removeChild(script);
      setLoaderClass((prevValue) => (prevValue = "hide"));
    };

    // Start the JSONP request by setting the `src` of the injected script.
    documentHead.appendChild(script);

    dispatch({
      payload: item,
      type: actionTypes.SET_SELECTED_SUBREDDIT,
    });
  };

  return (
    <div className="container">
      <div className="reddit-client row">
        <DIV className="col-lg-12">
          <h1>
            {state.selectedSubreddit == null
              ? "Please select a sub"
              : state.selectedSubreddit.data.display_name}
            <span>
              &nbsp;
              <Spinner animation="grow" className={loaderClass} />
            </span>
          </h1>

          <Navigation
            activeUrl={
              state.selectedSubreddit == null
                ? null
                : state.selectedSubreddit.data.url
            }
            items={state.navigationItems}
            itemSelected={setSelectedItem}
          />
          <StoryList items={state.storyItems} />
        </DIV>
      </div>
    </div>
  );
}

export default Index;
