import React, { useState, useGlobal } from "reactn";
import MyModal from "./Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./App.css";

//Reveal random fortune
function OnClickRevealFortune(setGlobal, setModalShow) {
  axios.get("http://localhost:5000/Fortune/GetFortune").then((response) => {
    if ((response.status = 200)) {
      setModalShow(true);
      setGlobal({
        fortuneId: response.data.key,
        currentFortune: response.data.value,
      });
    }
  });
}

//Export this function to index.js
function Dashboard() {
  //Local Setter and getters hooks
  const [modalShow, setModalShow] = useState(false);
  //Global Setter and getters hooks
  const [global, setGlobal] = useGlobal();

  return (
    <Container fluid>
      <Row className="d-flex align-items-center justify-content-center divFirst">
        {/* Pass setter hooks as parameter*/}
        <Button onClick={() => OnClickRevealFortune(setGlobal, setModalShow)}>
          Reveal My Fortune
        </Button>
      </Row>
      <Row className="d-flex align-items-center justify-content-center divSecond">
        <Col className="d-flex flex-direction-row justify-content-center divFortune">
          <div className="fortune">
            <h5>My Fortune:</h5>
            <p>{global.currentFortune}</p>
          </div>
        </Col>
        <Col className="d-flex justify-content-center divFortune">
          <div className="fortune">
            <h5>Previous Fortune:</h5>
            <p>{global.oldFortune}</p>
          </div>
        </Col>
      </Row>
      {/* Call Modal*/}
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      />
    </Container>
  );
}

export default Dashboard;
