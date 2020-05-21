import React, { useState, useGlobal } from "reactn";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";

//Click to show input for new fortune
function OnClickCreateFortune(setIsNewFortune) {
  setIsNewFortune(true);
}

//Patch current fortune on the backend into new one
function OnClickPatchFortune(global, setGlobal, newFortune, setModalShow) {
  // Call patch method on api
  axios
    .patch(
      `http://localhost:5000/Fortune/UpdateFortune?key=${global.fortuneId}&fortune=${newFortune}`
    )
    .then((response) => {
      if ((response.status = 200)) {
        setGlobal({
          oldFortune: global.currentFortune,
          currentFortune: response.data,
        }).then(() => {
          setModalShow(false);
        });
      }
    });
}

//Export this function to App.jsfortune
const MyModal = (props) => {
  //Local Setter and getter hooks
  const [isNewFortune, setIsNewFortune] = useState(false);
  const [newFortune, setNewFortune] = useState(false);
  //Global Setter and getters hooks
  const [global, setGlobal] = useGlobal();

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {setIsNewFortune ? "Your Fortune" : "Create Your Own Fortune"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 
            If current fortune show message, else show input component 
        */}
        <p>{global.currentFortune}</p>
        {isNewFortune ? (
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setNewFortune(e.target.value)}
              placeholder="..."
              aria-label="Fortune"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        {/*
            () => function: Call method on click
            Pass setter state to child component. Ex: setIsNewFortune
        */}
        <Button
          className="btn btn-success"
          onClick={() =>
            !isNewFortune
              ? OnClickCreateFortune(setIsNewFortune)
              : OnClickPatchFortune(global, setGlobal, newFortune, props.setModalShow)
          }
        >
          {isNewFortune ? "Update" : "Create"}
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
