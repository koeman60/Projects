import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

const ConversationsKey = "conversation";
const ContactsKey = "contacts";

export default function SideBar({ id }) {
  const [activeKey, setActive] = useState(ConversationsKey);
  const conversationsOpen = activeKey === ConversationsKey;
  const [modalOpen, setModalOpen] = useState(false);

  function modalClose() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActive}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={ConversationsKey}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={ContactsKey}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          style={{ borderRight: "1px solid gray" }}
          className="border-right overflow-auto flex-grow-1"
        >
          <Tab.Pane eventKey={ConversationsKey}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={ContactsKey}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New {conversationsOpen ? "Conversation" : "Contacts"}
        </Button>
        <div className="p-2 border-top border-rignt small">
          Your Id: <span className="text-muted">{id}</span>{" "}
        </div>
      </Tab.Container>
      <Modal show={modalOpen} onHide={modalClose}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={modalClose} />
        ) : (
          <NewContactModal closeModal={modalClose} />
        )}
      </Modal>
    </div>
  );
}
