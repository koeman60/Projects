import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contacts/ConversationsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  function shownumber(e) {
    const target = e.target;
    console.log(target);
    // const numbers = document.getElementsByClassName('shownumber')
  }

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
          style={{ cursor: "pointer" }}
        >
          {conversation.recp.map((rec) => rec.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
