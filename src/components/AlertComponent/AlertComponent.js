import React, { useState, useEffect } from "react";
import "./AlertComponent.css";
import { withRouter } from "react-router-dom";
import { useAlertContext } from "../../contexts/AlertContext";

function AlertComponent(props) {
  const alertContext = useAlertContext();
  const [modalDisplay, toggleDisplay] = useState("none");
  const openModal = () => {
    toggleDisplay("block");
  };
  const closeModal = () => {
    toggleDisplay("none");
    alertContext.setAlert(null);
  };

  useEffect(() => {
    if (
      alertContext.getAlert() !== undefined &&
      alertContext.getAlert() !== null &&
      alertContext.getAlert() !== ""
    ) {
      openModal();
    } else {
      closeModal();
    }
  }, [alertContext.getAlert()]);

  return (
    <div
      className={"alert alert-danger alert-dismissable mt-4"}
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <div className="d-flex alertMessage">
        <span>{alertContext.getAlert()}</span>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => closeModal()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default withRouter(AlertComponent);
