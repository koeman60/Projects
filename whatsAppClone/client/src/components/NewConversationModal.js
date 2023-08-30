import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contacts/ContactsProvider";
import { useConversations } from "../contacts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const [selectedContactsId, setSelectedContactId] = useState([]);
  const { contacts } = useContacts();
  const { createConversations } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    createConversations(selectedContactsId);
    closeModal();
  }

  function handleCheckBoxChange(number) {
    setSelectedContactId((PrevSelContact) => {
      if (PrevSelContact.includes(number)) {
        return PrevSelContact.filter((prev) => {
          return number !== prev;
        });
      } else {
        return [...PrevSelContact, number];
      }
    });

    console.log(number);
  }

  return (
    <div>
      <Modal.Header>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.number} key={contact.number}>
              <Form.Check
                type="checkbox"
                label={contact.name}
                onChange={() => handleCheckBoxChange(contact.name)}
                value={selectedContactsId.includes(contact.number)}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
