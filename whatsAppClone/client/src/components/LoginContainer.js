import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function LoginContainer({ onIdSubmit, setchange }) {
  const idRef = useRef();

  function handleLogin(e) {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }
  function handleCreateId(e) {
    e.preventDefault();
    setchange(false);
  }

  return (
    <div>
      <Container
        className="align-items-center d-flex"
        style={{ height: "100vh" }}
      >
        <Form onSubmit={handleLogin} className="w-100">
          <Form.Group>
            <Form.Label>Login With Your Phone Number</Form.Label>
            <Form.Control type="number" ref={idRef} required />
          </Form.Group>
          <Button type="submit" className="mr-2">
            Login
          </Button>
          <Button onClick={handleCreateId} variant="secondary">
            Create New Id
          </Button>
        </Form>
      </Container>
    </div>
  );
}
