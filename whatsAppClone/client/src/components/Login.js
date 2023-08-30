import React, { useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
import LoginContainer from "./LoginContainer";
import CreateNewIdContainer from "./CreateNewIdContainer";

export default function Login({ onIdSubmit }) {
  const [changeState, setChangeState] = useState(true);

  return (
    <>
      {changeState ? (
        <LoginContainer setchange={setChangeState} onIdSubmit={onIdSubmit} />
      ) : (
        <CreateNewIdContainer
          setchange={setChangeState}
          onIdSubmit={onIdSubmit}
        />
      )}
    </>
  );
}
