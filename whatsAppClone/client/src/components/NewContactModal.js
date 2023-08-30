import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useContacts } from "../contacts/ContactsProvider";

export default function NewContactModal({ closeModal }) {
  const phoneRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();
    createContact(phoneRef.current.value, nameRef.current.value);
    closeModal();
  }

  return (
    <div>
      <Modal.Header>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" ref={phoneRef} />
            <Form.Label>Name</Form.Label>
            <Form.Control type="Text" ref={nameRef} />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
