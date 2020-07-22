import React, { useState, useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  toggleWidget,
  toggleMsgLoader,
  dropMessages,
} from "react-chat-widget";
import { withRouter } from "react-router-dom";

import "react-chat-widget/lib/styles.css";
import "./Chat.css";
import logo from "../../logo.svg";

function Chat(props) {
  const [messageToServer, updateMessageToServer] = useState("");

  useEffect(() => {
    addResponseMessage("Welcome to this awesome chat!");
    addLinkSnippet({
      title: "My awesome link",
      link: "https://github.com/Wolox/react-chat-widget",
      target: "_blank",
    });

    toggleWidget();

    props.hideLoader();

    return () => {
      props.hideLoader();
      toggleWidget();
      dropMessages();
      console.log("cleaned up");
    };
  });

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    //addResponseMessage(response);
  };

  const handleMessageToServerChange = (e) => {
    toggleMsgLoader();
    const { id, value } = e.target;
    console.log(value);
    updateMessageToServer((prevValue) => (prevValue = value));
    setTimeout(() => {
      toggleMsgLoader();
    }, 1000);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (messageToServer == null || messageToServer === "") return false;
    addResponseMessage(messageToServer);
    updateMessageToServer((prevValue) => (prevValue = ""));
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    dropMessages();
  };

  return (
    <div>
      <div className="col-12">
        <label>Send message from server:</label>
        <input
          className="form-control"
          value={messageToServer}
          onChange={handleMessageToServerChange}
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </div>

      <br />
      <div className="col-12">
        <label>Clear all messages:</label>
        <br />
        <button
          type="submit"
          className="btn btn-danger"
          onClick={handleClearAll}
        >
          Submit
        </button>
      </div>
      <div className="">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={logo}
          title="Demo Chat"
          subtitle="This is just a demo"
        />
      </div>
    </div>
  );
}

export default withRouter(Chat);
