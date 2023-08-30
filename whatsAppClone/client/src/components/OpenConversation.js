import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contacts/ConversationsProvider";

export default function OpenConversation() {
  const { sendMessage, selectedConversation } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recp.map((rec) => rec.number),
      text
    );
    setText("");
  }

  return (
    <div className="flex-box column flex-grow-1">
      <div className="flex-grow-1 overflow-auto" style={{ height: "80%" }}>
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end" : ""
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                  style={{ textAlign: "right" }}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-3">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                height: "75px",
                resize: "none",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            />
            <Button type="submit">SEND</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
