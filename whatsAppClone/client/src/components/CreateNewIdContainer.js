import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function CreateNewIdContainer({ onIdSubmit, setchange }) {
  const NewidRef = useRef();
  function handleCreatedId(e) {
    e.preventDefault();
    setchange(true);
    onIdSubmit(NewidRef.current.value);
  }

  return (
    <div>
      <Container
        className="align-items-center d-flex"
        style={{ height: "100vh" }}
      >
        <Form className="w-100">
          <Form.Group>
            <Form.Label>Enter Your Phone Number</Form.Label>
            <Form.Control type="number" ref={NewidRef} required />
          </Form.Group>
          <Button onClick={handleCreatedId} type="submit" className="mr-2">
            Create
          </Button>
        </Form>
      </Container>
    </div>
  );
}
