import React, { useState, useContext, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const conversationsContext = React.createContext();

export function useConversations() {
  return useContext(conversationsContext);
}

function arrayEq(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const socket = useSocket();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts();

  const addMessageToConversation = useCallback(
    ({ recepient, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender, text };
        console.log(prev);
        const newConversations = prev.map((conv) => {
          if (arrayEq(conv.recipient, recepient)) {
            madeChange = true;
            return { ...conv, messages: [...conv.messages, newMessage] };
          }

          return conv;
        });
        console.log(recepient, newMessage);
        if (!madeChange) {
          return [...prev, { recepient, messages: [newMessage] }];
        } else {
          return newConversations;
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.on("receive-message", addMessageToConversation);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(recepient, text) {
    console.log(recepient);
    socket.emit("send-message", { recepient, text });

    console.log(recepient, text, id);

    addMessageToConversation({ recepient, text, sender: id });
  }

  function createConversations(recipient) {
    console.log(recipient);
    setConversations((prevConversations) => {
      return [...prevConversations, { recipient, messages: [] }];
    });
  }

  const formattedConversations = conversations.map((conv, index) => {
    const recp = conv.recipient.map((rec) => {
      const contact = contacts.find((contact) => {
        return contact.id === rec;
      });
      const name = (contact && contact.name) || rec;

      return { number: rec, name };
    });
    const messages = conv.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;

      const fromMe = id === message.sender;
      return { ...message, sendername: name, fromMe };
    });
    const selected = index === selectedConversationIndex;

    return { ...conv, messages, recp, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversations,
  };
  return (
    <conversationsContext.Provider value={value}>
      {children}
    </conversationsContext.Provider>
  );
}
